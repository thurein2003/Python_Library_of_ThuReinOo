from time import strftime, localtime
from tkinter import *

win =Tk()
win.geometry('480x200')
win.configure(background='white')
num1 = Label(win, text='00:00:00 AM', width= 15, font=('Times New Roman', 30, 'bold'))



num1.grid(row=0, pady=20,padx=20)
def show():
    cur_time= localtime()
    cus_time = strftime("%H:%M:%S %p", cur_time)
    num1.configure(text=cus_time)
    win.after(1000, show)

show()

win.mainloop()