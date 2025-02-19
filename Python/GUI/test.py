# python GUI 練習 #
# import 
import tkinter as tk
# from tkinter import*

# 1. 建立視窗
win = tk.Tk()
# 視窗標題
win.title("Testing GUI Windows")

# btn
win = tk.Button(text="this is btn")
win.pack()


# 2. 常駐視窗
win.mainloop()
