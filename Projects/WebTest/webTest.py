import streamlit as st 
import requests
from streamlit_lottie import st_lottie
import sys
import os

st.set_page_config(page_title="Thu Rein Oo", page_icon = ":tada:",layout="wide")



#Some function
def code_loading(url):
    r = requests.get(url)
    if r.status_code != 200:
        return none
    return r.json()

# Find the path to the CSS file
css_path = os.path.join(os.path.dirname(__file__), "/Projects/WebTest/style.css")

# Check if the file exists
if os.path.isfile(css_path):
    # If the file exists, read its contents and pass them to the 'css' function
    with open(css_path, "r") as f:
        css(f.read())
else:
    print(f"The CSS file was not found at: {css_path}")
#Some link 
code_link = code_loading("https://lottie.host/5e5b967e-69ad-42e8-a8e7-e7079419c74c/iGZtecXGbQ.json")


#Header section
with st.container():
    left_column, right_column = st.columns(2)
    with left_column:
        st.subheader("Hello, Thanks for checking :wave:")
        st.title ("Thu Rein Oo")
        st.write("Min Ga Lar per")
        st.write("[Click here for portfolio >](https://thurein2003.github.io/Portfolio/)")
    with right_column:
        st_lottie(code_link, height = 300, key = "coding")
        
with st.container():
    st.subheader("Mail me somthings!")
    mail_box = ''' <form action="https://formsubmit.co/thureinstudent18@gmail.com" method="POST">
     <input type="text" name="Yourname" placeholder="Yourname" required>
     <input type="message" name="leave a message" placeholder="message">
     <input type="email" name="Youremail" placeholder ="YourEmail" required>
     <button type="submit">Send</button>
</form>
'''
left_container, right_container = st.columns(2)
with left_container:
    st.markdown(mail_box, unsafe_allow_html = True)
with right_container:
    st.empty()
    
