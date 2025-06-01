"use client";

import React, { useState, useEffect } from "react";
import { Mic, Volume2, Plus, Send, Settings, Paperclip, X } from "lucide-react";
import FileUpload from "./FileUpload";
import translations from '../data/translations.json';

const UserFormChat = ({ selectedLanguage, languageCodeMap, onExit }) => {
  // Get language code from selected language
  const languageCode = selectedLanguage && languageCodeMap ? 
    languageCodeMap[selectedLanguage] || "en" : "en";
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [progress, setProgress] = useState(0);

  // Increase progress as user interacts with the chat
  useEffect(() => {
    // Increase progress based on number of messages
    // Max progress is 100%
    const newProgress = Math.min(messages.length * 10, 100);
    setProgress(newProgress);
  }, [messages]);

  const handleFileUploaded = (fileData) => {
    setAttachedFiles((prev) => [...prev, fileData]);
    setShowFileUpload(false);
  };

  const removeAttachedFile = (fileId) => {
    setAttachedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const sendMessage = async () => {
    if (!message.trim() && attachedFiles.length === 0) return;

    const userMessage = {
      role: "user",
      content: message,
      files: attachedFiles.length > 0 ? attachedFiles : undefined,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setMessage("");
    setAttachedFiles([]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const assistantMessage = {
        role: "assistant",
        content: data.choices[0].message.content,
      };

      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="p-5 max-w-[490px] mx-auto font-mono text-center h-[calc(100vh-64px)] flex flex-col cursor-[32px]">
      {/* Exit Button */}
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={onExit}
          className="p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors shadow-lg"
        >
          <X className="w-8 h-8" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full mb-6">
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden relative">
          <div 
            className="h-full bg-black transition-all duration-500 ease-in-out"
            style={{ 
              width: `${progress}%`,
              backgroundImage: 'repeating-linear-gradient(90deg, black, black 10px, white 10px, white 15px)'
            }}
          ></div>
        </div>
        <div className="text-sm text-gray-600 mt-1">
          Progress: {progress}%
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center px-6">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-normal mb-2">
                  {languageCode === "en" ? 
                    "Let's start filling your form" : 
                    translations[languageCode] || "Let's start filling your form"}
                </h1>
                <p className="text-gray-600">
                  {languageCode === "en" ? 
                    "I'll guide you through the process step by step" : 
                    ""}
                </p>
              </div>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-3xl p-4 rounded-2xl ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {/* Display attached files */}
                  {msg.files && msg.files.length > 0 && (
                    <div className="mb-3 space-y-2">
                      {msg.files.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center space-x-2"
                        >
                          {file.type?.startsWith("image/") ? (
                            <img
                              src={file.url}
                              alt={file.name}
                              className="max-w-xs max-h-48 rounded"
                            />
                          ) : (
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-300 hover:text-blue-200 underline"
                            >
                              {file.name}
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-3xl p-4 rounded-2xl bg-gray-100 text-gray-800">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <span className="ml-2">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* File Upload Modal */}
        {showFileUpload && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  Upload Files
                </h3>
                <button
                  onClick={() => setShowFileUpload(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <FileUpload onFileUploaded={handleFileUploaded} />
            </div>
          </div>
        )}

        {/* Input Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="w-full max-w-3xl mx-auto">
            {/* Attached Files Preview */}
            {attachedFiles.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {attachedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center bg-gray-200 rounded-lg px-3 py-1"
                  >
                    <span className="text-sm text-gray-700 mr-2">
                      {file.name}
                    </span>
                    <button
                      onClick={() => removeAttachedFile(file.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="relative">
              <div className="bg-gray-100 rounded-2xl border border-gray-300 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowFileUpload(true)}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
                  >
                    <Paperclip className="w-4 h-4" />
                    <span className="text-sm">Attach</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">Tools</span>
                  </button>
                </div>

                <div className="relative">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your response..."
                    className="w-full bg-transparent text-gray-800 placeholder-gray-500 resize-none focus:outline-none text-lg min-h-[60px]"
                    rows={3}
                    disabled={isLoading}
                  />

                  <div className="flex items-center justify-between mt-3">
                    <div className="text-sm text-gray-500">
                      {message.length}
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-200 rounded-lg">
                        <Mic className="w-5 h-5 text-gray-500" />
                      </button>
                      <button className="p-2 hover:bg-gray-200 rounded-lg">
                        <Volume2 className="w-5 h-5 text-gray-500" />
                      </button>
                      <button
                        onClick={sendMessage}
                        disabled={
                          (!message.trim() && attachedFiles.length === 0) ||
                          isLoading
                        }
                        className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg disabled:opacity-50 disabled:bg-gray-300"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFormChat;
