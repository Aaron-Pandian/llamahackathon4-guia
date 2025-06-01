import React, { useState } from "react";
import languages from "../data/languages.json"; // Import the JSON file
import FileUpload from "./FileUpload";
import UserFormChat from "./UserFormChat";

const FormImputPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [textInput, setTextInput] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    console.log("Selected language:", event.target.value);
  };

  const handleFileUploaded = (fileData) => {
    setUploadedFiles(prev => [...prev, fileData]);
  };

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
    console.log("Text input:", event.target.value);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    console.log("Form submitted with language:", selectedLanguage);
    console.log("Uploaded files:", uploadedFiles);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowChat(true);
    }, 1000);
  };

  return (
    <div className="p-5 max-w-[980px] mx-auto font-mono text-center">

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
          Upload form you would like help with
        </h2>
      </div>

      <div className="my-5 flex flex-col items-center">
        <label className="mb-2.5">
          Upload your file:
        </label>
        <div className="flex justify-center w-full">
          <FileUpload onFileUploaded={handleFileUploaded} />
        </div>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="mt-5 space-y-3">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>

        </div>
      )}

      {showChat && (
        <div className="mt-8 w-full">
          <UserFormChat />
        </div>
      )}
    </div>
  );
};

export default FormImputPage;
