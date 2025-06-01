"use client";

import React from "react";

export default function DownloadButton() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/complete.pdf"; // This assumes complete.pdf is in the public/ folder
    link.download = "complete.pdf";
    link.click();
  };

  return <button onClick={handleDownload}>End Conversation</button>;
}
