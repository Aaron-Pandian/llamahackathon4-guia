"use client";

import { useAuth } from "@/context/AuthContext";

import FormImputPage from "./FormImputPage";

export default function ClientWrapper() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <FormImputPage />
    </div>
  );
}
