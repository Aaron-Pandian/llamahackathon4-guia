import sys
import json
import requests
from extract_fields import extract_ordered_field_names, build_field_dict  # assumed to exist

PDFCO_API_KEY = 'aaronnikhilp@gmail.com_b3nh06G1NpDWk8Xx1AzoSd20u0l8r3I9AOSPbZPk9kTtgpdnxFzihZa2AsiBEgse'

def fill_pdf_pdfco(pdf_url, output_pdf, answers):
    field_names = extract_ordered_field_names(pdf_url)
    field_dict = build_field_dict(field_names, answers)

    url = 'https://api.pdf.co/v1/pdf/edit/add'
    fields_arr = [{
        "fieldName": name,
        "pages": "0-",
        "text": value,
    } for name, value in field_dict.items()]

    payload = {
        "name": output_pdf,
        "fields": fields_arr,
        "url": pdf_url
    }

    headers = { 'x-api-key': PDFCO_API_KEY }
    response = requests.post(url, headers=headers, json=payload)
    result = response.json()

    if not result.get("error"):
        filled_pdf_url = result["url"]
        return {
            "fields": field_names,
            "filled_url": filled_pdf_url
        }
    else:
        return {
            "error": result.get("message", "Unknown error"),
            "fields": field_names
        }

if __name__ == "__main__":
    input_data = sys.stdin.read()
    parsed = json.loads(input_data)
    pdf_url = parsed.get("pdf_url")
    answers = parsed.get("answers", {})
    result = fill_pdf_pdfco(pdf_url, "output.pdf", answers)
    print(json.dumps(result))
