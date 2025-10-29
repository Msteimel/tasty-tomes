"use client";

import { useState } from "react";
import { RecipeNote } from "@/lib/types";
import { RecipeNotes } from "@/app/components/recipe/RecipeNotes";
import { AddNoteForm } from "@/app/components/recipe/AddNoteForm";
import { Button } from "@/app/components/ui/button";

interface RecipeNotesWithAddProps {
  recipeId: string;
  variantId?: string;
  recipeNotes?: RecipeNote[];
  variantNotes?: RecipeNote[];
  showBothOnVariant?: boolean;
}

export function RecipeNotesWithAdd({
  recipeId,
  variantId,
  recipeNotes,
  variantNotes,
  showBothOnVariant = false,
}: RecipeNotesWithAddProps) {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleNoteAdded = (note: RecipeNote) => {
    // In a real app, this would refresh the data or update state
    console.log("Note added:", note);
  };

  const handleCancel = () => {
    setShowAddForm(false);
  };

  // Determine which notes to show
  const isVariantView = showBothOnVariant && variantId;

  return (
    <div className="space-y-6">
      {/* Add Note Button */}
      {!showAddForm && (
        <div className="flex justify-end">
          <Button
            onClick={() => setShowAddForm(true)}
            variant="default"
            className="flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Your Note
          </Button>
        </div>
      )}

      {/* Add Note Form */}
      {showAddForm && (
        <AddNoteForm
          recipeId={recipeId}
          variantId={variantId}
          onNoteAdded={handleNoteAdded}
          onCancel={handleCancel}
        />
      )}

      {/* Display Notes */}
      {isVariantView ? (
        <>
          {/* Show original recipe notes if they exist */}
          {recipeNotes && recipeNotes.length > 0 && (
            <RecipeNotes
              notes={recipeNotes}
              title="Notes from Original Recipe"
              subtitle="Tips from the original version"
            />
          )}
          {/* Show variant-specific notes if they exist */}
          {variantNotes && variantNotes.length > 0 && (
            <RecipeNotes
              notes={variantNotes}
              title="Notes for This Variant"
              subtitle="Tips specific to this variation"
              variant="variant"
            />
          )}
        </>
      ) : (
        /* Show regular recipe notes when not viewing a variant */
        recipeNotes &&
        recipeNotes.length > 0 && <RecipeNotes notes={recipeNotes} />
      )}
    </div>
  );
}
