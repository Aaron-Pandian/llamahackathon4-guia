"use client";

import React from "react";
import translations from "../data/translations.json";

const TavusLoadingMessage = ({ selectedLanguage, languageCodeMap }) => {
  const languageCode =
    selectedLanguage && languageCodeMap
      ? languageCodeMap[selectedLanguage] || "en"
      : "en";

  const defaultMessage = "Please wait while we load your video chat room...";
  const message =
    translations[languageCode]?.includes("please") ||
    !translations[languageCode]
      ? defaultMessage
      : translations[languageCode] + "...";

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-10 text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-black mb-6"></div>
      <p className="text-lg font-medium text-gray-700">
        {message || defaultMessage}
      </p>
    </div>
  );
};

export default TavusLoadingMessage;
