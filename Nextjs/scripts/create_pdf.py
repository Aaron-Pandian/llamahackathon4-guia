import sys
import json
import os
from reportlab.pdfgen import canvas

def generate_pdf(data, filename):
    c = canvas.Canvas(filename)
    y = 800
    for key, value in data.items():
        c.drawString(100, y, f"{key}: {value}")
        y -= 20
    c.save()

if __name__ == "__main__":
    input_data = sys.stdin.read()
    parsed = json.loads(input_data)

    # 🔥 Make sure to write to the actual scripts folder
    script_dir = os.path.dirname(os.path.abspath(__file__))
    pdf_path = os.path.join(script_dir, "output.pdf")

    generate_pdf(parsed, pdf_path)
    print("PDF_CREATED")
