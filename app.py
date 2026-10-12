from flask import Flask, request, jsonify, render_template
import joblib
import numpy as np

app = Flask(__name__)

# Load the model and scaler trained in Colab
model = joblib.load('rf_model.pkl')
scaler = joblib.load('scaler.pkl')

@app.route('/')
def home():
    # Serves the HTML file
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    # Get JSON data from the frontend
    data = request.json
    
    # Convert list of inputs into a 2D numpy array for the model
    features = np.array(data['features']).reshape(1, -1)
    
    # Scale the features just like we did in training
    scaled_features = scaler.transform(features)
    
    # Get the probability of fraud (class 1)
    probability = model.predict_proba(scaled_features)[0][1] * 100
    
    # Assign actionable tiers
    if probability <= 30:
        tier = "Low Risk"
    elif probability <= 75:
        tier = "Action Required: OTP Verification"
    else:
        tier = "High Risk: Transaction Blocked"
        
    return jsonify({'probability': round(probability, 2), 'tier': tier})

if __name__ == '__main__':
    app.run(debug=True)