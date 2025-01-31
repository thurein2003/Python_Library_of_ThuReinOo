from tkinter import *

win = Tk()
win.geometry('500x300')
win.title('Python Class')   #title name
win.configure(background='#00ffaa',bd=1,relief='solid') 

b = Button(win, text='OK', width=8)
#b.pack() #default is in the middle of the top
#b.pack(side=TOP) #the botton will be on the top
#b.pack(side=BOTTOM)
#b.pack(side=LEFT)
#b.pack(side=RIGHT)

#FILL usage
#b.pack(side=BOTTOM,fill=X)
b.pack(side=RIGHT,fill=Y)
win.mainloop()