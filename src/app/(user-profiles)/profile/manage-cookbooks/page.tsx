"use client";

import { useState } from "react";
import Link from "next/link";
import { dummyCookbooks, dummyRecipes } from "@/lib/dummyData";
import { Recipe, Cookbook } from "@/lib/types";
import { useCookbookManagement } from "@/app/components/cookbook/useCookbookManagement";
import { CurrentRecipesPanel } from "@/app/components/cookbook/CurrentRecipesPanel";
import { AvailableRecipesPanel } from "@/app/components/cookbook/AvailableRecipesPanel";
import { DeleteConfirmModal } from "@/app/components/cookbook/DeleteConfirmModal";

export default function ManageAllCookbooksPage() {
  // State for managing cookbooks and recipes
  const [cookbooks, setCookbooks] = useState<Cookbook[]>(dummyCookbooks);
  const [selectedCookbookId, setSelectedCookbookId] = useState<string | null>(
    dummyCookbooks[0]?.id || null,
  );
  const [availableRecipes] = useState<Recipe[]>(dummyRecipes);

  const selectedCookbook = cookbooks.find((cb) => cb.id === selectedCookbookId);

  // Handler to update specific cookbook in the array
  const handleCookbookUpdate = (updatedCookbook: Cookbook) => {
    setCookbooks((prev) =>
      prev.map((cb) =>
        cb.id === updatedCookbook.id ? updatedCookbook : cb
      )
    );
  };

  const {
    searchTerm,
    setSearchTerm,
    showDeleteConfirm,
    setShowDeleteConfirm,
    filteredAvailableRecipes,
    handleAddRecipe,
    handleDeleteConfirm,
  } = useCookbookManagement({
    cookbook: selectedCookbook || {
      id: "",
      name: "",
      description: "",
      recipes: [],
      createdBy: "",
      members: [],
      isPublic: false,
      isCollaborative: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    availableRecipes,
    onCookbookUpdate: handleCookbookUpdate,
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/profile"
          className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← Back to Profile
        </Link>
        <h1 className="text-4xl font-bold mb-2">Manage All Cookbooks</h1>
        <p className="text-gray-600">
          Add, remove, or edit recipes and variants across all your cookbooks.
        </p>
      </div>

      {/* Cookbook Selector */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <label
          htmlFor="cookbook-select"
          className="block text-sm font-semibold mb-2">
          Select Cookbook
        </label>
        <select
          id="cookbook-select"
          value={selectedCookbookId || ""}
          onChange={(e) => setSelectedCookbookId(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          {cookbooks.map((cb) => (
            <option key={cb.id} value={cb.id}>
              {cb.name} ({cb.recipes.length} recipes)
            </option>
          ))}
        </select>
      </div>

      {selectedCookbook && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CurrentRecipesPanel
            recipes={selectedCookbook.recipes}
            cookbookId={selectedCookbook.id}
            onRemoveRecipe={(id) =>
              setShowDeleteConfirm({ type: "recipe", id })
            }
            onRemoveVariant={(recipeId, variantId) =>
              setShowDeleteConfirm({
                type: "variant",
                id: variantId,
                parentId: recipeId,
              })
            }
          />

          <AvailableRecipesPanel
            recipes={filteredAvailableRecipes}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onAddRecipe={handleAddRecipe}
          />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <DeleteConfirmModal
          type={showDeleteConfirm.type}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowDeleteConfirm(null)}
        />
      )}
    </div>
  );
}
