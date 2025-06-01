import requests
import json
import os
from pypdf import PdfReader

PDFCO_API_KEY = 'aaronnikhilp@gmail.com_b3nh06G1NpDWk8Xx1AzoSd20u0l8r3I9AOSPbZPk9kTtgpdnxFzihZa2AsiBEgse'

def extract_ordered_field_names(pdf_url):
    temp_path = "temp.pdf"
    try:
        print("Downloading PDF to extract fields...")
        resp = requests.get(pdf_url)
        resp.raise_for_status()
        with open(temp_path, "wb") as f:
            f.write(resp.content)

        reader = PdfReader(temp_path)
        fields = reader.get_fields()
        if not fields:
            print("⚠️ No AcroForm fields found in the PDF.")
            return []
        field_names = list(fields.keys())
        print(f"✅ Found {len(field_names)} field(s).")
        return field_names
    except Exception as e:
        print(f"❌ Failed to extract fields: {e}")
        return []
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)

def build_field_dict(field_names, answers):
    if len(field_names) != len(answers):
        raise ValueError(f"Field count mismatch: {len(field_names)} fields, {len(answers)} answers.")
    return dict(zip(field_names, answers))

def fill_pdf_pdfco(pdf_url, output_pdf, answers):
    field_names = extract_ordered_field_names(pdf_url)
    if not field_names:
        print("⛔ Cannot proceed without field names.")
        return

    try:
        field_dict = build_field_dict(field_names, answers)
    except ValueError as ve:
        print(f"❌ {ve}")
        return

    fields_arr = [
        {"fieldName": name, "pages": "0-", "text": value}
        for name, value in field_dict.items()
    ]

    payload = {
        "name": output_pdf,
        "fields": fields_arr,
        "url": pdf_url
    }

    headers = {
        "x-api-key": PDFCO_API_KEY
    }

    print("📤 Sending data to PDF.co...")
    response = requests.post("https://api.pdf.co/v1/pdf/edit/add", headers=headers, json=payload)
    try:
        result = response.json()
    except:
        print("❌ Failed to parse PDF.co response.")
        print(response.text)
        return

    if not result.get("error"):
        filled_pdf_url = result["url"]
        print("✅ PDF generated successfully. Downloading...")
        pdf_response = requests.get(filled_pdf_url)
        with open(output_pdf, "wb") as f:
            f.write(pdf_response.content)
        print(f"📄 PDF saved as '{output_pdf}'")
    else:
        print("❌ Error from PDF.co:", result.get("message"))

# Example usage
if __name__ == "__main__":
    pdf_url = "https://www.uscis.gov/sites/default/files/document/forms/ar-11.pdf"

    answers = [
        "Dummy0", "Dummy1", "N/A", "Celsius", "Redbull", "01/23/1990",
        "CA", "90001", "Unit 10", "Apt 4B", "Unit 11", "Unit 12",
        "123 Main", "Los Angeles", "NY", "10001", "Unit 20", "Apt 5C",
        "Unit 21", "Unit 22", "456 Oak", "Albany", "A012345678", "John Smith",
        "02/10/2024", "TX", "73301", "Unit 30", "Apt 6D", "Unit 31", "Unit 32",
        "789 Pine", "Austin"
    ]

    fill_pdf_pdfco(pdf_url, "complete.pdf", answers)
