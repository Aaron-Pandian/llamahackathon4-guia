<div align="center">

<video src="https://github.com/user-attachments/assets/196ba01f-64b4-4f86-b27a-0237f5bb581f" alt="GUIA Logo" width="300">

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
2. Pip install dependancies for the Python scripts
3. Navigate to the Node.JS directory
4. Install dependencies for the Node.JS scripts
5. Update the API Keys for the environment variable - .env file in the root of the Next js folder
6. Start the development server
7. Open your browser and visit: [http://localhost:3000](http://localhost:3000)
8. Download the [AR-11 Form](https://github.com/Aaron-Pandian/llamahackathon4-guia/blob/main/metadata/ar-11.pdf) here
9. Visit the local application on your localhost server and upload the form
10. Go through the conversation process, answering information that Llama asks: _if you have questions about how to answer bring it up in conversation_
11. Once the model verifies you have finished, hit complete to download your filled form
12. The completed form presented is an example of what a completed form would look like: _if you want to explore the Python PDF Filler go to the script, and edit the answer information as per the fields listed, run the script to download an updated complete PDF_ 

### Example .env 

LLAMA_API_KEY=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

TAVUS_API_KEY=

---

## 🔜 Future Work 

Given our foundation, we plan to create an automated pipline for instruction documentation present on the [USCIS](https://uscis.gov/) website. Using this Llama will be able to provdide official, more detailed instruction on filling out immigration documentation. For this, we collect the Instruction PDFs alongside metadata for all forms on the website and house the structured data (as a list of metadata and links to each page of a PDF as images) in Firebase. We are developing API calls that can search our database, retrieve relavent information, and converse with the user using PDF pages converted to images. 

To further extend application function, we will integrate prompted web search allowing the LLM to gain added context to questions that come up in conversation. This will also allow Llama to answer general questions about the immigration process, if forms are not the point of confusion for an individual. 

Moving forward users will have their own profile where they can view conversation history and the associated completed documents so they can refer back to. Our application is also coming soon with a status update page that can help users easily view their application status, given their Immigration Application ID through our secured network. 

<div align="center">
<image src="https://github.com/Aaron-Pandian/llamahackathon4-guia/blob/main/metadata/GUIA_Logo.png" alt="GUIA Logo" width="300">
</div>

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
  <em>GUIA: Empowering Immigrants, One At A Time.</em>
</p>

---
