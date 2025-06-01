"use client";

import React from "react";

const GeneratePdfButton = () => {
  const handleGeneratePdf = async () => {
    const mockData = {
      name: "Irving Duran",
      email: "irving@example.com",
      message: "Thanks for using our service!",
    };

    try {
      const response = await fetch("/api/create-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mockData),
      });

      if (!response.ok) {
        throw new Error("PDF generation failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "generated.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <button
      onClick={handleGeneratePdf}
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        borderRadius: "8px",
        backgroundColor: "#0070f3",
        color: "white",
        border: "none",
        cursor: "pointer",
      }}
    >
      Generate PDF
    </button>
  );
};

export default GeneratePdfButton;
