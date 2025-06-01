import requests
import json
import os
from pypdf import PdfReader, PdfWriter

PDFCO_API_KEY = 'aaronnikhilp@gmail.com_b3nh06G1NpDWk8Xx1AzoSd20u0l8r3I9AOSPbZPk9kTtgpdnxFzihZa2AsiBEgse'

def extract_ordered_field_names(pdf_url):
    # Download the PDF temporarily for field extraction
    temp_path = "temp.pdf"
    resp = requests.get(pdf_url)
    resp.raise_for_status()
    with open(temp_path, "wb") as f:
        f.write(resp.content)
    reader = PdfReader(temp_path)
    fields = reader.get_fields()
    if not fields:
        print("No AcroForm fields found.")
        os.remove(temp_path)
        return []
    field_names = list(fields.keys())
    os.remove(temp_path)
    return field_names

def build_field_dict(field_names, answers):
    if len(field_names) != len(answers):
        raise ValueError("Number of answers does not match number of fields.")
    return dict(zip(field_names, answers))

def fill_pdf_pdfco(pdf_url, output_pdf, answers):
    # Step 1: Extract field names and build mapping
    field_names = extract_ordered_field_names(pdf_url)
    field_dict = build_field_dict(field_names, answers)

    # Step 2: Prepare PDF.co request (use only the URL, not a local file)
    url = 'https://api.pdf.co/v1/pdf/edit/add'

    fields_arr = []
    for name, value in field_dict.items():
        fields_arr.append({
            "fieldName": name,
            "pages": "0-",
            "text": value,
        })

    payload = {
        "name": output_pdf,
        "fields": fields_arr,
        "url": pdf_url
    }

    headers = {
        'x-api-key': PDFCO_API_KEY
    }

    response = requests.post(url, headers=headers, json=payload)
    result = response.json()
    if not result.get("error"):
        filled_pdf_url = result["url"]
        print("Filled PDF available at:", filled_pdf_url)
        pdf_response = requests.get(filled_pdf_url)
        with open(output_pdf, "wb") as f:
            f.write(pdf_response.content)
        print(f"PDF saved as {output_pdf}")
    else:
        print("Error from PDF.co:", result.get("message", "Unknown error"))

    return fields_arr

# This is where the URL to the form gets inputed 
pdf_url = "https://www.uscis.gov/sites/default/files/document/forms/ar-11.pdf"

# To get accurate number of answers prompt LLM to fill all fields you need 
print(extract_ordered_field_names(pdf_url)) # This information needs to get fed into the LLM, the information cannote be inputed incorrectly

# Example answers: prompt chat to distinguish the dummy fields, needs to still be reported otherwise mapping to PDF is incorrect. 
answers = [
    "Dummy0",    # form1[0] (often the root form, can leave blank or put N/A)
    "Dummy1",    # form1[0].#subform[0] (often the subform, can leave blank or put N/A)
    "N/A",    # S1_MiddleName[0]
    "Celsius",      # S1_GivenName[0]
    "Redbull",     # S1_FamilyName[0]
    "01/23/1990",# S1_DateOfBirth[0]
    "CA",        # S2B_State[0]
    "90001",     # S2B_ZipCode[0]
    "Unit 10",   # S2B__Unit[0]
    "Apt 4B",    # S2B_AptSteFlrNumber[0]
    "Unit 11",   # S2B__Unit[1]
    "Unit 12",   # S2B__Unit[2]
    "123 Main",  # S2B_StreetNumberName[0]
    "Los Angeles", # S2B_CityOrTown[0]
    "NY",        # S2C_State[0]
    "10001",     # S2C_ZipCode[0]
    "Unit 20",   # S2C_Unit[0]
    "Apt 5C",    # S2C_AptSteFlrNumber[0]
    "Unit 21",   # S2C_Unit[1]
    "Unit 22",   # S2C_Unit[2]
    "456 Oak",   # S2C_StreetNumberName[0]
    "Albany",    # S2C_CityOrTown[0]
    "A012345678",# AlienNumber[0]
    "John Smith",# S3_SignatureApplicant[0]
    "02/10/2024",# S3_DateofSignature[0]
    "TX",        # S2A_State[0]
    "73301",     # S2A_ZipCode[0]
    "Unit 30",   # S2A_Unit[0]
    "Apt 6D",    # S2A_AptSteFlrNumber[0]
    "Unit 31",   # S2A_Unit[1]
    "Unit 32",   # S2A_Unit[2]
    "789 Pine",  # S2A_StreetNumberName[0]
    "Austin",    # S2A_CityOrTown[0]
]

# Use of the function with 
fill_pdf_pdfco(pdf_url, "complete.pdf", answers)
