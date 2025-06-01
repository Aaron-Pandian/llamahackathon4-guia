<div align="center">

<img src="https://github.com/Aaron-Pandian/llamahackathon4-guia/raw/main/metadata/GUIA_Logo.png" alt="GUIA Logo" width="300">

# GUIA – Immigration Support AI Assistant

**GUIA** is an AI-powered immigration assistant designed to help individuals navigate complex U.S. immigration and legal processes.  
Leveraging cutting-edge open-source AI, GUIA delivers accessible, step-by-step, and context-aware support for filing forms, answering questions, and demystifying bureaucracy.

</div>

---

## 🚀 Key Features (MVP)

- **Conversational Guidance:** Interactive chat interface powered by Llama (Meta) models.
- **Step-by-Step Form Help:** Upload U.S. immigration forms (e.g., AR-11), answer AI-generated questions, and get tailored, validated responses.
- **Automatic PDF Filling:** GUIA fills your forms (including complex XFA forms) and provides downloadable, ready-to-submit PDFs.
- **Multilingual Support:** Designed for diverse users—English, Spanish, and more (coming soon).
- **Open Source Information:** Uses trusted, up-to-date resources to explain form requirements and next steps.

---

## 🖥️ User Flow

<table border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="50%" align="center" valign="top">
      <img src="https://github.com/Aaron-Pandian/llamahackathon4-guia/raw/main/metadata/userflow.png" alt="Userflow Diagram" width="60%">
    </td>
    <td width="40%" valign="top">
      <ol>
        <li><b>User uploads an official immigration PDF (e.g., AR-11)</b></li>
        <li><b>GUIA analyzes the form fields</b></li>
        <li><b>GUIA interviews the user, step-by-step, with questions tailored to the form</b></li>
        <li><b>User provides answers in conversation</b></li>
        <li><b>GUIA auto-fills the PDF with the user’s answers</b></li>
        <li><b>User downloads completed, ready-to-submit form</b></li>
      </ol>
    </td>
  </tr>
</table>

---

## 🧩 Tech Stack

- [Llama (Meta)](https://ai.meta.com/llama/) for conversational AI
- [PDF.co](https://pdf.co/) for robust PDF/XFA form editing
- [pypdf](https://pypdf.readthedocs.io/) for field extraction
- [Python, Flask, React] (future roadmap)
- [Docker] (for easy deployment, coming soon)

---

## 🙏 Acknowledgements

- [Meta Llama](https://ai.meta.com/llama/)
- [USCIS.gov](https://uscis.gov/) (Official Forms and Resources)

---

<p align="center">
  <em>GUIA: Empowering Immigrants, One at a Time.</em>
</p>
