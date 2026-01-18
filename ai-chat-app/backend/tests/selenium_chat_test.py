"""
Selenium test for the AI-chat app.

This script will open the frontend at http://localhost:3000, type a message into the chat input,
submit it, and verify that messages appear in the UI. It requires Chrome to be installed.

Usage:
    pip install selenium webdriver-manager
    python selenium_chat_test.py

Notes:
- Ensure your backend (127.0.0.1:8000) and frontend (localhost:3000) are running before running this script.
- If Chrome is not available, configure another webdriver and update the script accordingly.
"""
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time

FRONTEND_URL = "http://localhost:3000"


def run_selenium_test():
    options = Options()
    
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

    try:
        print("Opening frontend at", FRONTEND_URL)
        driver.get(FRONTEND_URL)
        time.sleep(2)
        textarea = driver.find_element(By.CSS_SELECTOR, 'textarea[placeholder*="Type your message"]')
        test_message = "Selenium test message"
        textarea.click()
        textarea.clear()
        textarea.send_keys(test_message)

        form = textarea.find_element(By.XPATH, "ancestor::form")
        form.submit()

        print("Message submitted, waiting for UI update...")
        timeout = 15
        poll = 0.5
        end = time.time() + timeout
        user_visible = False
        while time.time() < end:
            elems = driver.find_elements(By.XPATH, f"//*[contains(text(), '{test_message}')]")
            if elems:
                user_visible = True
                break
            time.sleep(poll)

        assert user_visible, "User message did not appear in the UI"
        assistant_visible = False
        end = time.time() + 30
        while time.time() < end:
            # look for elements that contain common parts of assistant text or not empty  bubble
            # this is intentionally permissive — adapt XPath to your UI if needed
            assistant_elems = driver.find_elements(By.XPATH, "//*[contains(@class, 'message') or contains(@class, 'bubble') or contains(text(), 'assistant')]")
            if assistant_elems:
                assistant_visible = True
                break
            time.sleep(poll)

        assert assistant_visible, "Assistant response not found in UI"

        print("Selenium UI test passed")

    finally:
        driver.quit()


if __name__ == '__main__':
    run_selenium_test()
    print("Done")
