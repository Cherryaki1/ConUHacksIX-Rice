import torch
from flask import Flask, request, jsonify
from flask_cors import CORS

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time
import numpy as np
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification



model = DistilBertForSequenceClassification.from_pretrained("distilbert-base-uncased", num_labels=3)
model.load_state_dict(torch.load("model.pth"))  # our model file name neets to be inserted here
model.eval()  # Set model to evaluation mode

"""DistilBertForSequenceClassification.from_pretrained('distilbert-base-uncased', num_labels=3):
This line loads the DistilBERT model with the uncased configuration. It prepares the model for text classification with 3 possible output classes (e.g., emotions: Sad, Neutral, Happy).

model.load_state_dict(torch.load("model.pth")):
This loads the trained model weights from the file model.pth. Since you've already trained the model in Google Colab, you need to load the saved .pth file to use those trained parameters in your Flask app."""

# Initialize DistilBERT tokenizer
tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased')

# Initialize Flask app
app = Flask(__name__)

CORS(app)  # Allow frontend to make requests

# Function to scrape tweets
def scrape_tweets(query, max_tweets=100):
    options = Options()
    options.debugger_address = "localhost:9222"
    options.add_argument("--headless=new")  # Run in headless mode (remove this if you want to see the browser)
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1920,1080")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")

    # Start Chrome
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

    # Open Twitter search
    search_url = f"https://x.com/search?q={query}&src=typed_query"
    driver.get(search_url)
    time.sleep(1)  # Allow time for page to load

    tweets_data = []
    last_height = driver.execute_script("return document.body.scrollHeight")

    while len(tweets_data) < max_tweets:
        tweets = driver.find_elements(By.XPATH, '//article[@data-testid="tweet"]')
        for tweet in tweets:
            try:
                tweet_text = tweet.find_element(By.XPATH, './/div[@lang]').text
                #print(tweet_text)
                # Extract the username
                username_tag = tweet.find_element(By.XPATH, './/div[@data-testid="User-Name"]//span')
                username = username_tag.text if username_tag else "Unknown User"
                print(username)
                # Extract the timestamp (date) of the tweet
                timestamp_tag = tweet.find_element(By.XPATH, './/time')
                timestamp = timestamp_tag.get_attribute('datetime') if timestamp_tag else "Unknown Date"
                print(timestamp)
                if tweet_text and tweet_text not in [data['tweet'] for data in tweets_data]:
                    tweets_data.append({"tweet": tweet_text, "username": username, "timestamp": timestamp})

                    if len(tweets_data) >= max_tweets:
                        break
            except Exception as e:
                continue

        # Scroll down to load more tweets
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(5)

        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:  # Stop if no new tweets load
            break
        last_height = new_height

    print(f"Scraped {len(tweets_data)} tweets")
    print(tweets_data)
    driver.quit()
    return tweets_data

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query')
    if not query:
        return jsonify({"error": "No query provided"}), 400
    
    tweets = scrape_tweets(query)
    return jsonify({"query": query, "tweets": tweets})

if __name__ == '__main__':
    app.run(debug=True)

@app.route('/sentiment-stats', methods=['POST'])
def sentiment_stats():
    data = request.json  # Expecting a list of tweet sentiments
    sentiments = np.array(data["sentiments"])  # ["positive", "negative", "neutral", ...]

    total = len(sentiments)
    stats = {
        "positive": np.sum(sentiments == "positive") / total * 100,
        "negative": np.sum(sentiments == "negative") / total * 100,
        "neutral": np.sum(sentiments == "neutral") / total * 100
    }

    return jsonify(stats)

# Function to map model output to emotion
def map_output_to_emotion(output):
    if output == 0:
        return "Sad"
    elif output == 2:
        return "Neutral"
    elif output == 4:
        return "Happy"
    else:
        return "Unknown"

@app.route("/predict", methods=["POST"])
def predict():
    # Get the input text directly from the POST request (as a string)
    text = request.form['text']  # Assuming text is sent as form data

    # Tokenize 
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=512)

    # Run the model to get the logits (predictions)
    with torch.no_grad():
        logits = model(**inputs).logits  # Get the raw prediction logits

    # Get the predicted class (the class with the highest logit)
    predicted_class = torch.argmax(logits, dim=1).item()

    # Map the predicted class to the corresponding emotion
    emotion = map_output_to_emotion(predicted_class)

    # Return the result as a JSON response
    return jsonify({"emotion": emotion})

if __name__ == "__main__":
    app.run(debug=True)
