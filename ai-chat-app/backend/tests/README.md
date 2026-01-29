# Backend Tests

This folder contains simple tests to validate the backend and frontend integration.

Files:
- `api_chat_test.py` - simple HTTP test that posts to `/chat/` and checks for a `response` field
- `selenium_chat_test.py` - Selenium UI test that opens the frontend, submits a chat message, and verifies UI updates

Prerequisites:
- Backend running at `http://127.0.0.1:8000` (uvicorn or similar)
- Frontend running at `http://localhost:3000` for Selenium test
- Python 3.8+

Install basic deps for API test:

```powershell
pip install requests
python tests/api_chat_test.py
```

Install deps for Selenium test (uses Chrome):

```powershell
pip install selenium webdriver-manager
python tests/selenium_chat_test.py
```

Notes:
- Selenium test uses `--headless=new` mode; remove that option in `selenium_chat_test.py` if you want to watch the browser.
- Adjust selectors in Selenium script if your frontend DOM differs.
- These tests are intentionally minimal and meant for local smoke testing only. Use a proper test framework (pytest) and CI integration for production-grade tests.
