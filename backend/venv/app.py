from flask import Flask, request, jsonify
import tweepy

app = Flask(__name__)

# Twitter API credentials
API_KEY = "your_api_key"
API_SECRET = "your_api_secret"
ACCESS_TOKEN = "your_access_token"
ACCESS_SECRET = "your_access_secret"
BEARER_TOKEN = "your_bearer_token"

# Authenticate with Twitter API
client = tweepy.Client(bearer_token=BEARER_TOKEN)

@app.route('/search', methods=['GET'])
def search_tweets():
    query = request.args.get('q')  # Get search query from request
    if not query:
        return jsonify({"error": "Please provide a query parameter"}), 400
    
    # Search recent tweets (adjust max_results as needed)
    response = client.search_recent_tweets(query=query, max_results=5)
    
    tweets = [{"text": tweet.text, "id": tweet.id} for tweet in response.data] if response.data else []
    
    return jsonify(tweets)

if __name__ == '__main__':
    app.run(debug=True)