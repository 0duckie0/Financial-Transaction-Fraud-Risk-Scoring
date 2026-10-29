# Financial Transaction Fraud Risk Scoring

**Academic Context**: B.Tech Computer Science and Engineering (AI/ML), Semester 7  
**Course**: Predictive Analytics (T3366)  
**Institution**: Symbiosis Institute of Technology, Nagpur  
**Author**: Parth Chaudhari 

---

## 📌 Project Overview
Financial fraud represents less than 1% of total transaction volume, creating a severe class imbalance. Traditional static rule-based systems generate high false-positive rates, causing customer friction, or miss sophisticated fraud, causing financial loss. 

This project transitions from rigid static rules to **continuous, probability-based risk scoring**. By utilizing a complete Knowledge Discovery in Databases (KDD) pipeline and multi-source data fusion, the system scores transactions in real-time and categorizes them into actionable risk tiers (Approve, OTP Step-up, or Block).

## 🚀 Features
* **Multi-Source Data Fusion**: Integrates financial transaction ledgers with device identity metadata using a Left Join on `TransactionID` (Based on the IEEE-CIS Fraud Detection dataset).
* **Robust KDD Preprocessing**: Handles missing values via median/constant imputation, encodes categorical variables, and scales features using `StandardScaler`.
* **Zero Data Leakage**: Applies SMOTE (Synthetic Minority Over-sampling Technique) *strictly* to the training partition to balance the <1% fraud class without contaminating the test set.
* **Random Forest Classifier**: Utilizes ensemble bagging to handle non-linear feature interactions and noisy synthetic data, achieving a high ROC-AUC score and strong fraud recall.
* **Glassmorphic Web Dashboard**: A modern, dark-mode UI built with HTML/CSS/JS that communicates with a Flask REST API to display real-time risk assessments.

## 🛠️ Tech Stack
* **Machine Learning**: Python, Pandas, NumPy, Scikit-Learn, Imbalanced-Learn (SMOTE)
* **Backend**: Flask, Joblib (Model Serialization)
* **Frontend**: HTML5, CSS3 (Glassmorphism), Vanilla JavaScript
* **Deployment**: Vercel (Frontend / App logic)

## 📊 Model Performance (Random Forest)
* **ROC-AUC Score**: ~0.77
* **Fraud Recall (Sensitivity)**: 64% 
* **Accuracy**: 78%
* *Note: Precision is intentionally low (~7%) due to the extreme class imbalance (2.7% overall fraud rate), reflecting realistic industry conditions where catching fraud (Recall) is prioritized over false alarms.*

## ⚙️ How to Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/financial-transaction-fraud-risk-scoring.git
   cd financial-transaction-fraud-risk-scoring
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Model Pipeline (Optional)**:
   You can explore the data fusion, SMOTE application, and model training steps by running the Jupyter Notebook:
   ```bash
   jupyter notebook notebooks/fraud_model_pipeline.ipynb
   ```

4. **Start the Flask Server**:
   ```bash
   python app.py
   ```

5. **Access the Dashboard**:
   Open your browser and navigate to `http://127.0.0.1:5000` to interact with the real-time scoring dashboard.

## 📁 Repository Structure
```text
├── app.py                      # Flask REST API and server logic
├── model.pkl                   # Serialized Random Forest model
├── requirements.txt            # Python dependencies (Vercel compatible)
├── static/
│   ├── style.css               # Glassmorphic UI styling
│   └── script.js               # Frontend API call logic
├── templates/
│   └── index.html              # Dashboard layout
├── notebooks/
│   └── fraud_model_pipeline.ipynb  # Complete KDD pipeline and model training
└── README.md                   # Project documentation
```