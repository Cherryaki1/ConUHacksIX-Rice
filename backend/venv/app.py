import torch
from flask import Flask, request, jsonify
from flask_cors import CORS
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
CORS(app)

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