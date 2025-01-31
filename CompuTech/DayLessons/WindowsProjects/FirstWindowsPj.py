from tkinter import *
from tkinter import messagebox
from time import strftime, localtime

def update_time():
    cur_time = localtime()
    cus_time = strftime("%H:%M:%S %p", cur_time)
    time_label.config(text=cus_time)
    win.after(1000, update_time)

def show_answer(answer):
    if answer == 'Yes':
        messagebox.showinfo('Answer', 'Correct!')
    else:
        messagebox.showinfo('Answer', 'Incorrect!')

# Button functions
def yes_button_pressed():
    show_answer('Yes')

def no_button_pressed():
    show_answer('No')

win = Tk()
win.geometry('500x300')
win.title('Python Class')
win.configure(background='lightgrey', bd=5, relief='solid')
win.resizable(False, False)


font1 = ('Times New Roman', 20, 'bold')
l1 = Label(win, text='Hello World!', font=font1, width=15, fg='white', bg='black')
l1.grid(row=0, column=0, pady=5, padx=90, sticky='n')

# Time label
time_label = Label(win, text='', font=font1, fg='black', bg='lightgrey')
time_label.grid(row=1, column=0, pady=10, padx=10, sticky='n')
update_time()

# Question label
ques_label = Label(win, text='1 + 1 = ?', font=font1, fg='black', bg='lightgrey')
ques_label.grid(row=2, column=0, pady=10, padx=10, sticky='w')

# Yes Button
b1 = Button(win, text='Yes', width=8, font=font1, command=yes_button_pressed)
b1.grid(row=3, column=0, pady=10, padx=10, sticky='w')

# No Button
b2 = Button(win, text='No', width=8, font=font1, command=no_button_pressed)
b2.grid(row=3, column=1, pady=10, padx=10, sticky='w')

win.mainloop()



'''from tkinter import *
from time import strftime, localtime

win = Tk()
win.geometry('500x300')
win.title('Python Class')
win.configure(background='lightgrey', bd=1, relief='solid')
win.resizable(False, False)


font1 = ('Times New Roman', 20, 'bold')
l1 = Label(win, text='Hello World!', font=font1, width=15, fg='white', bg='black')
l1.grid(row=0, column=0, pady=5, padx=0, sticky='n')


ques = Label(win,text='1 + 1 = 2', font=font1)
ques.grid(row=1,column=1, pady=5, padx=0,)

b1 = Button(win, text='Yes',width=8,)
b1.grid(row=2, column=1)

b2 = Button(win, text='No',width=8,)
b2.grid(row=2, column=2)





win.mainloop()
'''