from tkinter import *

#-------------------------------------------------------------------------------------
#Function Area
def print_numbers():
    n = entry_var.get()
    for i in range(1, n+1):
        print('Number : ',i)

entry_var= IntVar()
entry = Entry(win, textvariable=entry_var, width=5)
entry.grid(row=1, column=1, pady=5, padx=5)
#--------------------------------------------------------------------------------------
win = Tk()
win.geometry('500x300')
win.title('Python Class')   #title name
win.configure(background='#00ffaa',bd=1,relief='solid')     #box color and border size 
win.resizable(False,False)      #If the value is False, that can not resize
win.iconbitmap('D:\\ico\\wh.ico') #icon path

win.configure(bg='white')   #change the box color again!


font1 = ('Times New Roman',20,'bold')      #Font customize

#Text l1 customization
l1 = Label(win, text='Thu Rein Oo', bg='black', fg='white', font=font1,width=15,anchor='e')
l1.grid(row=0, column=0,pady=5,padx=5,sticky='e')

#text l2 customization
l2 = Label(win,text='Do you want to print number? :',bg='black', fg='white',font=font1)
l2.grid(row=1, column=0,pady=5,padx=5,sticky='w')

#anchor use for text position and sticky used for the whole vul position




#Button Creation
b = Button(win, text='Yes',width=8,command=print_numbers)
b.grid(row=0, column=1)


win.mainloop() #Need this to show the box


