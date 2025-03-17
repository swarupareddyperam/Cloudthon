# Use an official Python runtime as a parent image
FROM python:3.9-slim
COPY . /app
# Set the working directory in the container
WORKDIR /app
# Copy the requirements file into the container
COPY requirements.txt .
COPY keys/serviceaccount.json /app/keys/serviceaccount.json
# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
# Copy the current directory contents into the container
COPY . .
ENV GOOGLE_APPLICATION_CREDENTIALS="/app/keys/serviceaccount.json"
# Expose port 5400 for the Flask app
EXPOSE 5400
# Run the Flask app
CMD ["flask", "run", "--host=0.0.0.0 --port 5400"]
