
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
from PIL import Image
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen.canvas import Canvas
import os  # 导入 os 模块

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

# 临时保存图片的文件夹
temp_img_folder = 'C:/Users/User/Desktop/temp_comic/'
if not os.path.exists(temp_img_folder):  # 使用 os 模块的 exists 方法
    os.makedirs(temp_img_folder)  # 使用 os 模块的 makedirs 方法

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
    img_path = os.path.join(temp_img_folder, f'{count}.jpg')  # 使用 os 模块的 join 方法
    with open(img_path, mode='wb') as f:
        f.write(img_data)
    count += 1

# 关闭浏览器
driver.quit()

# 创建 PDF 文件
pdf_path = 'C:/Users/User/Desktop/comic/comic_combined.pdf'
c = Canvas(pdf_path, pagesize=letter)

# 添加标题
title = "爬取的漫画图片集"
c.setFont('Helvetica-Bold', 24)
c.drawCentredString(300, 750, title)

# 逐张添加图片到 PDF
for i in range(1, count):
    img_path = os.path.join(temp_img_folder, f'{i}.jpg')  # 使用 os 模块的 join 方法
    try:
        img = Image.open(img_path)
        width, height = img.size
        aspect_ratio = width / height
        # 调整图片大小以适应页面
        max_width = 500
        max_height = 700
        if width > max_width:
            height = int(max_width / aspect_ratio)
            width = max_width
        if height > max_height:
            width = int(max_height * aspect_ratio)
            height = max_height

        c.drawImage(img_path, 100, 100, width=width, height=height)
        c.showPage()
    except Exception as e:
        print(f"处理图片 {img_path} 时出错: {e}")

# 保存 PDF 文件
c.save()

# 删除临时图片文件夹
import shutil
shutil.rmtree(temp_img_folder)

print("图片已整合为 PDF 文件。")


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
#         : pip install pillow
#         : pip install reportlab
# 查看指令 : pip show selenium
# 刪除指令 : pip uninstall selenium