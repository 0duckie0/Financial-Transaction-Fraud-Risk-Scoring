document.getElementById('fraudForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    // 1. Grab raw values from the form
    const amount = parseFloat(document.getElementById('amount').value);
    const time = parseFloat(document.getElementById('time').value);
    const merchant = document.getElementById('merchant').value;
    const foreign = parseFloat(document.getElementById('foreign').value);
    const location = parseFloat(document.getElementById('location').value);
    const device = parseFloat(document.getElementById('device').value);
    const velocity = parseFloat(document.getElementById('velocity').value);
    const age = parseFloat(document.getElementById('age').value);

    // 2. One-hot encode the merchant category (Alphabetical mapping from pandas get_dummies)
    const is_clothing = merchant === 'clothing' ? 1 : 0;
    const is_electronics = merchant === 'electronics' ? 1 : 0;
    const is_food = merchant === 'food' ? 1 : 0;
    const is_grocery = merchant === 'grocery' ? 1 : 0;
    const is_travel = merchant === 'travel' ? 1 : 0;

    // 3. Generate a dummy Transaction ID (Required by the model structure, but logically irrelevant)
    const txId = Math.floor(Math.random() * 10000);

    // 4. Construct the exact 13-feature array the backend scaler expects
    const featureArray = [
        txId, amount, time, 
        is_clothing, is_electronics, is_food, is_grocery, is_travel, 
        foreign, location, device, velocity, age
    ];
    
    // 5. Send data to Flask backend
    fetch('/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ features: featureArray })
    })
    .then(response => response.json())
    .then(data => {
        const resultBox = document.getElementById('resultBox');
        const riskTier = document.getElementById('riskTier');
        const riskScore = document.getElementById('riskScore');
        
        resultBox.className = 'card'; 
        
        if (data.tier.includes('Low')) {
            resultBox.classList.add('low-risk');
        } else if (data.tier.includes('Medium') || data.tier.includes('OTP')) {
            resultBox.classList.add('medium-risk');
        } else {
            resultBox.classList.add('high-risk');
        }
        
        riskTier.innerText = data.tier;
        riskScore.innerText = `Fraud Probability: ${data.probability}%`;
    })
    .catch(error => {
        console.error("Error:", error);
        alert('Error processing transaction. Ensure the backend is running.');
    });
});