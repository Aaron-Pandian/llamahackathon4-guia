"use client";

import { useAuth } from "@/context/AuthContext";
import Navigation from "@/components/Navigation";
import ChatInterface from "@/components/ChatInterface";
import LoginPage from "@/components/LoginPage";

export default function ClientWrapper() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <ChatInterface />
    </div>
  );
}
