# generate_report.py
from datetime import date
import os

def generate_markdown():
    title = "Your Report Title"
    author = "Your Name"
    current_date = date.today().strftime("%B %d, %Y")

    abstract = """
    This is a brief abstract summarizing the content of the report.
    """

    introduction = """
    This section provides an introduction to the report, stating its purpose or goal.
    """

    tables_section = """
    ## Tables

    | Column 1 | Column 2 | Column 3 |
    |----------|----------|----------|
    | Row 1    | Data A   | Data X   |
    | Row 2    | Data B   | Data Y   |
    | Row 3    | Data C   | Data Z   |
    """

    images_section = """
    ## Images

    ![Image 1: Description of the first image.](image1.jpg)

    ![Image 2: Description of the second image.](image2.jpg)

    ![Image 3: Description of the third image.](image3.jpg)
    """

    references_section = """
    ## References

    1. Author, A. (Year). Title of the first reference.
    2. Author, B. (Year). Title of the second reference.
    3. Author, C. (Year). Title of the third reference.
    """

    content = """
    ## Content

    This section contains meaningful and relevant information for the report.
    """

    formatting = """
    ### Formatting

    Experiment with section headings, bullet points, and other formatting options.
    """

    markdown_content = f"""
    # {title}
    *Author: {author}*
    *Date: {current_date}*

    {abstract}

    {introduction}

    {tables_section}

    {images_section}

    {references_section}

    {content}

    {formatting}
    """

    return markdown_content

def save_to_file(file_path, content):
    with open(file_path, 'w') as file:
        file.write(content)

def convert_to_pdf(markdown_file_path):
    os.system(f"pandoc {markdown_file_path} -o report.pdf")

if __name__ == "__main__":
    markdown_content = generate_markdown()
    markdown_file_path = "report.md"
    
    save_to_file(markdown_file_path, markdown_content)
    convert_to_pdf(markdown_file_path)
