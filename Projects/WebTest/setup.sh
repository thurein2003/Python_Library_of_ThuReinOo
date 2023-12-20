mkdir -p ~/.streamlit/
echo "\
[general]\n\
email = \"student@example.com\"\n\
" > ~/.streamlit/credentials.toml
echo "\
[server]\n\
headless = true\n\
port = $PORT\n\
enableCORS = false\n\
" > ~/.streamlit/config.toml
