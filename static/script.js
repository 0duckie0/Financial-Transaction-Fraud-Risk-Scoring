document.getElementById('fraudForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Stop page reload
    
    // Get the pasted data and convert it into an array of numbers
    const rawData = document.getElementById('transactionData').value;
    const featureArray = rawData.split(',').map(Number);
    
    // Send data to the Flask backend
    fetch('/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ features: featureArray })
    })
    .then(response => response.json())
    .then(data => {
        // Grab the UI elements
        const resultBox = document.getElementById('resultBox');
        const riskTier = document.getElementById('riskTier');
        const riskScore = document.getElementById('riskScore');
        
        // Reset classes
        resultBox.className = ''; 
        
        // Apply the correct color banner based on the backend response
        if (data.tier.includes('Low')) {
            resultBox.classList.add('low-risk');
        } else if (data.tier.includes('Medium') || data.tier.includes('OTP')) {
            resultBox.classList.add('medium-risk');
        } else {
            resultBox.classList.add('high-risk');
        }
        
        // Display the results
        riskTier.innerText = data.tier;
        riskScore.innerText = `Fraud Probability: ${data.probability}%`;
    })
    .catch(error => alert('Error processing transaction. Ensure you inputted all 30 numbers correctly.'));
});