"use client";

import { RecipeNote } from "@/lib/types";
import { useState } from "react";

interface RecipeNotesProps {
  notes: RecipeNote[];
  title?: string;
  subtitle?: string;
  variant?: "default" | "variant";
}

export function RecipeNotes({ 
  notes, 
  title = "Cook's Notes",
  subtitle = "Tips and variations from the community",
  variant = "default"
}: RecipeNotesProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!notes || notes.length === 0) {
    return null;
  }

  const borderColor = variant === "variant" ? "border-blue-400" : "border-amber-400";
  const bgColor = variant === "variant" ? "bg-blue-50" : "bg-amber-50";
  const iconColor = variant === "variant" ? "text-blue-600" : "text-amber-600";
  const titleColor = variant === "variant" ? "text-blue-900" : "text-amber-900";
  const subtitleColor = variant === "variant" ? "text-blue-700" : "text-amber-700";
  const cardBorderColor = variant === "variant" ? "border-blue-200" : "border-amber-200";

  return (
    <aside className={`${bgColor} border-l-4 ${borderColor} rounded-lg shadow-md overflow-hidden`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-start gap-3 hover:opacity-80 transition-opacity"
        aria-expanded={isOpen}
      >
        <svg
          className={`w-6 h-6 ${iconColor} mt-1 shrink-0`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
        <div className="flex-1 text-left">
          <h3 className={`text-xl font-bold ${titleColor}`}>{title}</h3>
          <p className={`text-sm ${subtitleColor}`}>
            {subtitle}
          </p>
        </div>
        <svg
          className={`w-5 h-5 ${iconColor} transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="px-6 pb-6 space-y-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`bg-white rounded-md p-4 border ${cardBorderColor}`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="font-semibold text-gray-800 text-sm">
                  {note.username}
                </p>
                <time className="text-xs text-gray-500 whitespace-nowrap">
                  {note.createdAt.toLocaleDateString()}
                </time>
              </div>
              <p className="text-gray-700 leading-relaxed italic">
                &ldquo;{note.content}&rdquo;
              </p>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}
