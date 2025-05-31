"use client";

import React, { useState } from "react";
import { Mic, Volume2, Plus, Send, Settings, Paperclip } from "lucide-react";
import FileUpload from "./FileUpload";

export default function ChatInterface() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);

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
        content: data.choices[0].message.content, // New transformed format
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
    <div className="h-[calc(100vh-64px)] flex flex-col">
      {/* Messages Area */}
      <main className="flex-1 flex flex-col">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-normal mb-2 text-white">
                Ready to dive in?
              </h1>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-3xl p-4 rounded-lg ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-100"
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
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-3xl p-4 rounded-lg bg-gray-800 text-gray-100">
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
        )}

        {/* File Upload Modal */}
        {showFileUpload && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">
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
        <div className="p-6">
          <div className="w-full max-w-3xl mx-auto">
            {/* Attached Files Preview */}
            {attachedFiles.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {attachedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center bg-gray-700 rounded-lg px-3 py-1"
                  >
                    <span className="text-sm text-gray-300 mr-2">
                      {file.name}
                    </span>
                    <button
                      onClick={() => removeAttachedFile(file.id)}
                      className="text-gray-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="relative">
              <div className="bg-gray-800 rounded-2xl border border-gray-700 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowFileUpload(true)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white"
                  >
                    <Paperclip className="w-4 h-4" />
                    <span className="text-sm">Attach</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">Tools</span>
                  </button>
                </div>

                <div className="relative">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask anything"
                    className="w-full bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none text-lg min-h-[60px]"
                    rows={3}
                    disabled={isLoading}
                  />

                  <div className="flex items-center justify-between mt-3">
                    <div className="text-sm text-gray-500">
                      {message.length}
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-700 rounded-lg">
                        <Mic className="w-5 h-5 text-gray-400" />
                      </button>
                      <button className="p-2 hover:bg-gray-700 rounded-lg">
                        <Volume2 className="w-5 h-5 text-gray-400" />
                      </button>
                      <button
                        onClick={sendMessage}
                        disabled={
                          (!message.trim() && attachedFiles.length === 0) ||
                          isLoading
                        }
                        className="p-2 hover:bg-gray-700 rounded-lg disabled:opacity-50"
                      >
                        <Send className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
