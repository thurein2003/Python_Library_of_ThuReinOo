# generate_report.py

import os
from datetime import date

def generate_latex():
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
    \\section{Tables}
    \\begin{table}[ht]
        \\centering
        \\begin{tabular}{|c|c|c|}
            \\hline
            Column 1 & Column 2 & Column 3 \\\\
            \\hline
            Row 1 & Data A & Data X \\\\
            Row 2 & Data B & Data Y \\\\
            Row 3 & Data C & Data Z \\\\
            \\hline
        \\end{tabular}
        \\caption{Table 1: Example Table}
        \\label{tab:table1}
    \\end{table}
    """

    images_section = """
    \\section{Images}
    \\begin{figure}[ht]
        \\centering
        \\includegraphics[width=0.3\\textwidth]{image1.jpg}
        \\caption{Image 1: Description of the first image.}
        \\label{fig:image1}
    \\end{figure}

    \\begin{figure}[ht]
        \\centering
        \\includegraphics[width=0.3\\textwidth]{image2.jpg}
        \\caption{Image 2: Description of the second image.}
        \\label{fig:image2}
    \\end{figure}

    \\begin{figure}[ht]
        \\centering
        \\includegraphics[width=0.3\\textwidth]{image3.jpg}
        \\caption{Image 3: Description of the third image.}
        \\label{fig:image3}
    \\end{figure}
    """

    references_section = """
    \\section{References}
    \\begin{enumerate}
        \\item Author, A. (Year). Title of the first reference.
        \\item Author, B. (Year). Title of the second reference.
        \\item Author, C. (Year). Title of the third reference.
    \\end{enumerate}
    """

    content = """
    \\section{Content}
    This section contains meaningful and relevant information for the report. You can include more subsections, text, and formatting as needed.
    """

    formatting = """
    \\subsection{Formatting}
    Experiment with section headings, bullet points, and other formatting options.
    """

    document = f"""
    \\documentclass[letterpaper, 12pt]{{article}}
    \\usepackage{{graphicx}}
    \\usepackage{{enumitem}}
    \\title{{{title}}}
    \\author{{{author}}}
    \\date{{{current_date}}}
    \\begin{{document}}
    \\maketitle

    \\begin{{abstract}}
        {abstract}
    \\end{{abstract}}

    \\section{{Introduction}}
        {introduction}

        {tables_section}

        {images_section}

        {references_section}

        {content}

        {formatting}

    \\end{{document}}
    """

    return document

def save_to_file(file_path, content):
    with open(file_path, 'w') as file:
        file.write(content)

def compile_latex(file_path):
    os.system(f"pdflatex {file_path}")

if __name__ == "__main__":
    latex_content = generate_latex()
    latex_file_path = "report.tex"
    
    save_to_file(latex_file_path, latex_content)
    compile_latex(latex_file_path)
    compile_latex(latex_file_path)  # Run twice to update references
