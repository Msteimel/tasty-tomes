"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";
import { RecipeNote } from "@/lib/types";

interface AddNoteFormProps {
  recipeId: string;
  variantId?: string;
  onNoteAdded?: (note: RecipeNote) => void;
  onCancel?: () => void;
}

export function AddNoteForm({ recipeId, variantId, onNoteAdded, onCancel }: AddNoteFormProps) {
  const [noteContent, setNoteContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // TODO: Replace with actual authenticated user
  const currentUser = {
    id: "current-user",
    name: "Current User",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!noteContent.trim()) {
      alert("Please enter a note");
      return;
    }

    setIsSubmitting(true);

    try {
      const now = new Date();
      const newNote: RecipeNote = {
        id: `note-${Date.now()}`,
        userId: currentUser.id,
        username: currentUser.name,
        content: noteContent.trim(),
        createdAt: now,
        updatedAt: now,
      };

      console.log("New Note:", {
        note: newNote,
        recipeId,
        variantId,
      });

      // TODO: Implement actual API call to save note
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Call the callback if provided
      if (onNoteAdded) {
        onNoteAdded(newNote);
      }

      // Reset form
      setNoteContent("");
      
      // Call cancel to close the form
      if (onCancel) {
        onCancel();
      }

      alert("Note added successfully! (This is a demo - note not persisted)");
    } catch (error) {
      console.error("Error adding note:", error);
      alert("Failed to add note. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border-2 border-amber-300 rounded-lg p-6 shadow-md">
      <div className="flex items-start gap-3 mb-4">
        <svg
          className="w-6 h-6 text-amber-600 mt-1 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            {variantId ? "Add a Note for This Variant" : "Add Your Cook's Note"}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Share tips, ingredient substitutions, or techniques that work for you
          </p>
          
          <div className="mb-4">
            <Textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Example: I sift the flour for a lighter cake! or I use this brand of vanilla, the others don't work as well."
              rows={4}
              className="w-full"
              disabled={isSubmitting}
              required
            />
            <p className="text-xs text-gray-500 mt-2">
              Posting as: <strong>{currentUser.name}</strong>
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              type="submit"
              variant="default"
              disabled={!noteContent.trim() || isSubmitting}
            >
              {isSubmitting ? "Adding Note..." : "Add Note"}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
