
## 爬蟲
#   import selenium 瀏覽器自動化項目
from selenium import webdriver
#   import Service，用於指定 Chrome WebDriver 的路徑
from selenium.webdriver.chrome.service import Service
# (在 Selenium 4 之後的版本裡，不再建議直接將 ChromeDriver 的路徑作為參數傳入 webdriver.Chrome，而是採用 Service 類別來指定 ChromeDriver 的路徑)

#   import selenium By
from selenium.webdriver.common.by import By
import time
import requests

##   指定 ChromeDriver 的路径
PATH = "C:/tool/chromedriver-win64/chromedriver.exe"
service = Service(PATH)

## 建立 Chrome 瀏覽器驅動程式
driver = webdriver.Chrome(service=service)

##   訪問網頁
driver.get('https://www.wnacg.com/photos-slide-aid-288631.html')

## 利用 xpath 提取圖片元素
img_list = driver.find_elements(By.XPATH, '//*[@id="img_list"]//img')
## 自動加載全部頁面
targets = driver.find_elements(By.XPATH, '//*[@id="img_list"]//span')
for target in targets:
    driver.execute_script('arguments[0].scrollIntoView();', target)
    time.sleep(0.5)

count = 1
for img in img_list:
    print(f'-----正在爬取第{count}頁-----')
    # 提取 src 屬性
    img_url = img.get_attribute('src')


    # 檢查提取圖片是否正常
    # print(img_url)
    ## 向圖片發送請求(獲取圖片數據)
    img_data = requests.get(img_url).content
    ## 保存圖片數據
    with open(f'comic/{count}.jpg', mode='wb') as f:
        f.write(img_data)
    count += 1



## 取消 Python 程式碼執行完畢自動關閉瀏覽器
# (方法 1) 讓程式等待 60 秒，你可以根據需要調整時間
# time.sleep(60)

# (方法 2) 等待使用者在終端機輸入任意內容後再繼續執行後面程式碼
# input("按回車鍵關閉瀏覽器...")

## 操作完成後關閉瀏覽器
# driver.quit()

## 指令
# 安裝指令 : pip install selenium
#         : pip install requests
# 查看指令 : pip show selenium
# 刪除指令 : pip uninstall selenium