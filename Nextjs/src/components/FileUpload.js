"use client";

import { useState } from "react";
import { Upload, X, File, Image } from "lucide-react";

export default function FileUpload({ onFileUploaded }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = async (files) => {
    setUploading(true);

    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const result = await response.json();

        const fileData = {
          id: result.publicId,
          name: file.name,
          url: result.previewImageUrl || result.url, // ✅ Prefer image if available
          type: result.previewImageUrl ? "image/png" : file.type, // ✅ Force image type for LLaMA
          size: result.bytes,
          width: result.width,
          height: result.height,
        };

        setUploadedFiles((prev) => [...prev, fileData]);

        // Callback to parent component
        if (onFileUploaded) {
          onFileUploaded(fileData);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        alert(`Failed to upload ${file.name}`);
      }
    }

    setUploading(false);
  };

  const removeFile = (fileId) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const isImage = (type) => type?.startsWith("image/");

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging
            ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20"
            : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
        />

        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <Upload className="w-8 h-8 text-gray-400" />
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium text-blue-600 dark:text-blue-400">
              Click to upload
            </span>{" "}
            or drag and drop
          </div>
          <div className="text-xs text-gray-500">
            Images, videos, audio, documents
          </div>
        </label>
      </div>

      {/* Uploading Indicator */}
      {uploading && (
        <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm">Uploading...</span>
        </div>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Uploaded Files
          </h4>
          <div className="space-y-2">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                {isImage(file.type) ? (
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                    <File className="w-5 h-5 text-gray-500" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

                <button
                  onClick={() => removeFile(file.id)}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
