"""
Simple API test for the chat endpoint.

Usage:
    pip install requests
    python api_chat_test.py

Ensure backend is running at http://127.0.0.1:8000
"""
import requests

BACKEND_URL = "http://127.0.0.1:8000/chat/"


def run_api_test():
    payload = {"user_input": "Hello 
        print("Response text:", r.text)
    r.raise_for_status()
    data = r.json()
    assert "response" in data, "No response field in chat response"
    print("API test passed. Response:", data["response"])


if __name__ == '__main__':
    run_api_test()
