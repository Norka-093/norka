#   爬蟲
# import selenium 瀏覽器自動化項目
from selenium import webdriver

#   通過 selenium 創建/初始化瀏覽器
path = "C:/tool/chromedriver-win64/chromedriver.exe"
driver = webdriver.Chrome(path)

#   訪問網頁
driver.get('https://www.wnacg.com/photos-index-aid-288631.html')