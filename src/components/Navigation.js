"use client";

import { useAuth } from "@/context/AuthContext";
import { LogOut, User } from "lucide-react";

export default function Navigation() {
  const { user, signInWithGoogle, logout } = useAuth();

  const handleAuth = async () => {
    if (user) {
      try {
        await logout();
      } catch (error) {
        console.error("Error signing out:", error);
      }
    } else {
      try {
        await signInWithGoogle();
      } catch (error) {
        console.error("Error signing in:", error);
      }
    }
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-white">Guia</h1>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-3 text-gray-300">
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span className="text-sm">{user.displayName}</span>
            </div>
          )}

          <button
            onClick={handleAuth}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            {user ? (
              <>
                <LogOut className="w-4 h-4" />
                Sign Out
              </>
            ) : (
              <>
                <User className="w-4 h-4" />
                Sign In
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
