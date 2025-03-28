import os
import pandas as pd
from sklearn.ensemble import IsolationForest
from google.cloud import storage
from google.oauth2 import service_account
import pickle
import fetch_roles, fetch_access_logs, fetch_compliance_data, fetch_iam_activity_logs


# Path to your GCP service account key file
SERVICE_ACCOUNT_FILE = "keys/serviceaccount.json"

# Ensure the service account file exists
if not os.path.exists(SERVICE_ACCOUNT_FILE):
    raise FileNotFoundError(f"Service account file not found: {SERVICE_ACCOUNT_FILE}")

# Initialize credentials
credentials = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE)
storage_client = storage.Client(credentials=credentials)


# Load data from GCP
def load_data_from_gcp():
    # Fetch data (replace with your data collection logic)
    roles = fetch_roles()
   
    # logs = fetch_access_logs()
    logs = fetch_iam_activity_logs()
    compliance_data = fetch_compliance_data()

    # Convert data to a DataFrame
    data = pd.DataFrame(logs)
    print(data)
    data["permission_count"] = data.groupby("user")["permission"].transform("count")
    return data

# Train the model
def train_model(data):
    model = IsolationForest(contamination=0.1)
    model.fit(data[["permission_count"]])
    return model

# Save the model to GCP
def save_model_to_gcp(model):
    bucket = storage_client.get_bucket("iam-governance-ai-model")
    blob = bucket.blob("models/anomaly_detection_model.pkl")
    blob.upload_from_string(pickle.dumps(model))

if __name__ == "__main__":
    data = load_data_from_gcp()
    model = train_model(data)
    save_model_to_gcp(model)