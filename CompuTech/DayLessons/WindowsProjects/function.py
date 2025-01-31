from tkinter import *

win = Tk()
win.geometry('500x300')
win.title('Python Class')   #title name
win.configure(background='#00ffaa',bd=1,relief='solid')     #box color and border size 
win.resizable(False,False)      #If the value is False, that can not resize
win.iconbitmap('D:\\ico\\wh.ico') #icon path

def fun(e):
    if e.keysym=='a':
        win.destory()
    Label.config(text = e.keysym)

def addNu():
    n = int(l2.cget('text'))
    n += 1
    l2.configure(text=n)

def GetBG():
    st = l2.cget('bg')
    print(st)

def GetBG():
    st = l2.cget('font')
    print(st)