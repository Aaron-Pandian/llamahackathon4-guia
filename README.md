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
    <td width="70%" valign="middle">
      <ol>
        <li>User <b>uploads an official immigration PDF</b> (e.g., AR-11)</li>
        <li>GUIA <b>analyzes</b> the form fields</li>
        <li>GUIA interviews the user, step-by-step, with questions <b>tailored to the form</b></li>
        <li>User provides answers <b>in conversation</b></li>
        <li>GUIA <b>auto-fills the PDF</b> with the user’s answers</li>
        <li>User <b>downloads completed, ready-to-submit form</b></li>
      </ol>
    </td>
  </tr>
</table>

---

## 🔧 How To Use
_Current codebase showcases a minimum viable product. The demonstration shows how a user can upload an official immigration form to our application, receive specific instruction to fill it out, then provide a completed form ready for signiture and print._

1. Clone Repository
2. Deploy React.JS

### Future Work 

Given our foundation, we plan to create an automated pipline for instruction documentation present on the [USCIS](https://uscis.gov/) website. Using this Llama will be able to provdide official, more detailed instruction on filling out immigration documentation. For this, we collect the Instruction PDFs alongside metadata for all forms on the website and house the structured data (as links to images  in Firebase. We are developing API calls that can search our database, retrieve relavent information, and converse with the user using PDF pages converted to images. 

To further extend application function, we will integrate prompted web search allowing the LLM to gain added context to questions that come up in conversation. This will also allow Llama to answer general questions about the immigration process, if forms are not the point of confusion for an individual. 

---

## 🧩 Tech Stack

- [Llama (Meta)](https://ai.meta.com/llama/) for conversational AI
- [PDF.co](https://pdf.co/) for robust PDF/XFA form editing
- [Node.JS](https://pypdf.readthedocs.io/) for server side scripting
- [React Native][https://reactnative.dev/] for native frontend rendering
- [Python] (Flask for dynamic integration to front end, coming soon)
- [Docker and Kubernetes] (for easy deployment, coming soon)
- [Firebase] (secure database for internal data reference, coming soon)

---

## 🙏 Acknowledgements

- [Meta Llama](https://ai.meta.com/llama/)
- [USCIS.gov](https://uscis.gov/) (Official Forms and Resources)

---

<p align="center">
  <em>GUIA: Empowering Immigrants, One at a Time.</em>
</p>
