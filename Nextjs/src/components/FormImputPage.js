import React, { useState } from "react";
import languages from "../data/languages.json"; // Import the JSON file
import FileUpload from "./FileUpload";
import UserFormChat from "./UserFormChat";
import translations from "../data/translations.json";
import DownloadButton from "./DownloadButton";

// Map language names to language codes
const languageCodeMap = {
  English: "en",
  Spanish: "es",
  French: "fr",
  German: "de",
  Chinese: "zh",
  Japanese: "ja",
  Korean: "ko",
  Hindi: "hi",
  Arabic: "ar",
  Portuguese: "pt",
  Russian: "ru",
  Italian: "it",
  Dutch: "nl",
  Swedish: "sv",
  Turkish: "tr",
  Greek: "el",
  Hebrew: "iw",
  Thai: "th",
  Vietnamese: "vi",
  Polish: "pl",
};

const FormImputPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [textInput, setTextInput] = useState("");
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    console.log("Selected language:", event.target.value);
  };

  const handleFileUploaded = (fileData) => {
    setUploadedFiles((prev) => [...prev, fileData]);
  };

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
    console.log("Text input:", event.target.value);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    console.log("Form submitted with language:", selectedLanguage);
    console.log("Uploaded files:", uploadedFiles);

    const userMessage = {
      role: "user",
      content: selectedLanguage ? `Language: ${selectedLanguage}` : "",
      files: uploadedFiles.length > 0 ? uploadedFiles : undefined,
    };
    const promt_message = `respond in ${selectedLanguage} Short 50-character summary of the uploaded form goes here.

Let's go through the form together, field by field. dont list out all the fields before you start to ask each one only when the user is done relay the answers to them
There are [X] fields that need to be filled out.
If you need extra help, click the video icon at the bottom of the page.

Please answer each question one at a time.
I will ask for the next piece of information after you answer the current one.
I’ll remember your answers and help you complete the form step by step.

Once we finish all the fields, I’ll show you a clean table with everything you entered in the same order as we filled them out.

Let’s begin:

Field 1 Name: [Ask user the question based on the field name]
Wait for user input
Field 2 Name: [Ask the next question]
…
[Continue until all fields in form are complete]`;

    const payload = {
      messages: [
        userMessage,
        {
          role: "assistant",
          temperature: 0,
          topP: 1,
          content: promt_message,
        },
      ],
    };

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from LLaMA");
      }

      const data = await response.json();

      const assistantMessage = {
        role: "assistant",
        content: data.choices[0].message.content,
      };

      // Update your state as needed
      setFiles([userMessage, assistantMessage]);
      setShowChat(true);
    } catch (error) {
      console.error("Error:", error);
      setFiles([
        userMessage,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-5 max-w-[980px] mx-auto font-mono text-center">
      {!showChat && !files.length ? (
        <>
          {/* Language Input Field */}
          <div className="my-5 flex items-center justify-center">
            <label htmlFor="language-input" className="mr-2.5">
              Type or select a language:
            </label>
            <input
              type="text"
              list="languages"
              id="language-input"
              value={selectedLanguage}
              onChange={handleLanguageChange}
              onClick={() => setSelectedLanguage("")}
              className="p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <datalist id="languages">
              {languages.map((language, index) => (
                <option key={index} value={language} />
              ))}
            </datalist>
          </div>

          {/* Text Area */}
          <div className="w-full">
            <h2 className="font-mono text-6xl">
              {selectedLanguage
                ? translations[languageCodeMap[selectedLanguage]] ||
                  translations["en"]
                : translations["en"]}
            </h2>
          </div>
          <div className="my-5 flex flex-col items-center">
            <label className="mb-2.5">Upload your file:</label>
            <div className="flex justify-center w-full">
              <FileUpload onFileUploaded={handleFileUploaded} />
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <button
              onClick={handleSubmit}
              disabled={
                isSubmitting || !selectedLanguage || !uploadedFiles.length
              }
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </>
      ) : (
        <>
          <UserFormChat
            files={files}
            selectedLanguage={selectedLanguage}
            languageCodeMap={languageCodeMap}
            onExit={() => setShowChat(false)}
          />
          <DownloadButton />
        </>
      )}
    </div>
  );
};

export default FormImputPage;
