from app import scrape_tweets

scrape_tweets("war")
# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service
# from selenium.webdriver.chrome.options import Options
# from selenium.webdriver.common.by import By
# from selenium.webdriver.common.keys import Keys
# from webdriver_manager.chrome import ChromeDriverManager
# from bs4 import BeautifulSoup
# import time

# # Set up options to connect to existing Chrome
# options = Options()
# options.debugger_address = "localhost:9222"

# # Use WebDriver Manager to get ChromeDriver
# driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# # Navigate to Twitter (X)
# driver.get("https://x.com/home")
# time.sleep(5)  # Wait for page to load

# # Scroll the page to load more tweets
# # body = driver.find_element(By.TAG_NAME, 'body')
# # for _ in range(10):  # Scroll 10 times
# #     body.send_keys(Keys.PAGE_DOWN)
# #     time.sleep(2)  # Allow new tweets to load

# # Get page source **after scrolling**
# page_source = driver.page_source

# # Use BeautifulSoup to parse the HTML
# soup = BeautifulSoup(page_source, 'html.parser')

# # Extract tweets
# tweets = soup.find_all('div', {'data-testid': 'tweet'})

# for tweet in tweets:
#     print(tweet.get_text())

# # Extract tweets using Selenium (more reliable for dynamic content)
# tweet_elements = driver.find_elements(By.XPATH, '//article[@data-testid="tweet"]')

# for tweet in tweet_elements:
#     try:
#         tweet_text = tweet.find_element(By.XPATH, './/div[@lang]').text
#         username = tweet.find_element(By.XPATH, './/span[contains(@class, "css-901oao")]').text
#         timestamp = tweet.find_element(By.XPATH, './/time').get_attribute('datetime')
#         print(f"Tweet: {tweet_text}\nUsername: {username}\nTimestamp: {timestamp}\n")
#     except Exception as e:
#         print("Error extracting tweet:", e)

# # Keep the browser open until the user presses Enter
# input("Press Enter to exit...")
# driver.quit()
