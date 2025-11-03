"use client";

import { useState, useEffect, useSyncExternalStore } from "react";

interface RoleSwitcherProps {
  onUserChange?: (userId: string) => void;
}

/**
 * Development tool for testing different user roles
 * Shows a floating panel to quickly switch between test users
 */
export function RoleSwitcher({ onUserChange }: RoleSwitcherProps) {
  const [currentUser, setCurrentUser] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("dev-current-user") || "user-001";
    }
    return "user-001";
  });
  const [isMinimized, setIsMinimized] = useState(false);

  // Only render after mount to avoid hydration issues
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  // Test users with different roles
  const testUsers = [
    { id: "user-001", name: "Current User", role: "Owner", color: "blue" },
    { id: "user-002", name: "Sarah Johnson", role: "Editor", color: "green" },
    { id: "test-admin", name: "Admin User", role: "Admin", color: "purple" },
    {
      id: "test-contributor",
      name: "Contributor User",
      role: "Contributor",
      color: "yellow",
    },
    { id: "test-viewer", name: "Viewer User", role: "Viewer", color: "gray" },
    {
      id: "non-member",
      name: "Non-Member",
      role: "Not a member",
      color: "red",
    },
  ];

  const handleUserChange = (userId: string) => {
    setCurrentUser(userId);
    // Store in localStorage so it persists across page reloads
    localStorage.setItem("dev-current-user", userId);
    // Also set a cookie for server-side access
    document.cookie = `dev-current-user=${userId}; path=/; max-age=31536000`;
    // Trigger callback if provided
    if (onUserChange) {
      onUserChange(userId);
    }
    // Reload the page to apply the new user context
    window.location.reload();
  };

  const selectedUser = testUsers.find((u) => u.id === currentUser);

  // Don't render until mounted to avoid hydration mismatch
  if (!isMounted) {
    return null;
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-yellow-400 text-black px-4 py-2 rounded-lg shadow-lg hover:bg-yellow-500 transition-colors font-medium">
          🔧 Role Switcher
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white border-2 border-yellow-400 rounded-lg shadow-2xl p-4 min-w-[300px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔧</span>
          <h3 className="font-bold text-gray-800">Role Switcher</h3>
        </div>
        <button
          onClick={() => setIsMinimized(true)}
          className="text-gray-500 hover:text-gray-700 text-xl leading-none">
          −
        </button>
      </div>

      {/* Warning Banner */}
      <div className="bg-yellow-50 border border-yellow-300 rounded p-2 mb-3 text-xs text-yellow-800">
        ⚠️ Development Tool - Reload required after switching
      </div>

      {/* Current User Display */}
      <div className="mb-3 p-2 bg-gray-50 rounded">
        <div className="text-xs text-gray-600 mb-1">Current User:</div>
        <div className="font-semibold">{selectedUser?.name}</div>
        <div
          className={`text-xs px-2 py-0.5 rounded inline-block mt-1 bg-${selectedUser?.color}-100 text-${selectedUser?.color}-800`}>
          {selectedUser?.role}
        </div>
      </div>

      {/* User Selector */}
      <div className="mb-2">
        <label className="text-sm font-medium text-gray-700 block mb-1">
          Switch to:
        </label>
        <select
          value={currentUser}
          onChange={(e) => handleUserChange(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400">
          {testUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.role})
            </option>
          ))}
        </select>
      </div>

      {/* Helper Text */}
      <div className="text-xs text-gray-500 mt-2">
        Select a user to test different permission levels
      </div>
    </div>
  );
}

/**
 * Hook to get the current dev user ID
 * Returns the user ID from localStorage or the default user
 */
export function useDevUser(): string {
  const [userId] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("dev-current-user") || "user-001";
    }
    return "user-001";
  });

  return userId;
}
