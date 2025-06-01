<p align="center">
  <img src="https://github.com/Aaron-Pandian/llamahackathon4-guia/raw/main/metadata/GUIA_Logo.png" alt="GUIA Logo" width="300">
</p>

# GUIA – Immigration Support AI Assistant

**GUIA** is an AI-powered immigration assistant designed to help individuals navigate complex U.S. immigration and legal processes.  
Leveraging cutting-edge open-source AI, GUIA delivers accessible, step-by-step, and context-aware support for filing forms, answering questions, and demystifying bureaucracy.

---

## 🚀 Key Features (MVP)

- **Conversational Guidance:** Interactive chat interface powered by Llama (Meta) models.
- **Step-by-Step Form Help:** Upload U.S. immigration forms (e.g., AR-11), answer AI-generated questions, and get tailored, validated responses.
- **Automatic PDF Filling:** GUIA fills your forms (including complex XFA forms) and provides downloadable, ready-to-submit PDFs.
- **Multilingual Support:** Designed for diverse users—English, Spanish, and more (coming soon).
- **Open Source Information:** Uses trusted, up-to-date resources to explain form requirements and next steps.

---

## 🖥️ User Flow

<p align="center">
  <img src="https://github.com/Aaron-Pandian/llamahackathon4-guia/raw/main/metadata/userflow.png" alt="Userflow Diagram" width="300">
</p>

1. **User uploads an official immigration PDF (e.g., AR-11)**
2. **GUIA analyzes the form fields**
3. **GUIA interviews the user, step-by-step, with questions tailored to the form**
4. **User provides answers in conversation**
5. **GUIA auto-fills the PDF with the user’s answers**
6. **User downloads completed, ready-to-submit form**

## 🧩 Tech Stack

- [Llama (Meta)](https://ai.meta.com/llama/) for conversational AI
- [PDF.co](https://pdf.co/) for robust PDF/XFA form editing
- [pypdf](https://pypdf.readthedocs.io/) for field extraction
- [Python, Flask, React] (future roadmap)
- [Docker] (for easy deployment, coming soon)

---

## 🙏 Acknowledgements

- [Meta Llama](https://ai.meta.com/llama/)
- [USCIS.gov](https://uscis.gov/) (official forms and resources)
- The open source community and all contributors!

---

<p align="center">
  <em>GUIA: Empowering Immigrants, One Form at a Time.</em>
</p>
