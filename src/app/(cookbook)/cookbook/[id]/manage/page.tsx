"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { getCookbookById, dummyRecipes } from "@/lib/dummyData";
import { Recipe, Cookbook } from "@/lib/types";
import { canManageRecipesInCookbook } from "@/lib/permissions";
import { useCookbookManagement } from "@/app/components/cookbook/useCookbookManagement";
import { CurrentRecipesPanel } from "@/app/components/cookbook/CurrentRecipesPanel";
import { AvailableRecipesPanel } from "@/app/components/cookbook/AvailableRecipesPanel";
import { DeleteConfirmModal } from "@/app/components/cookbook/DeleteConfirmModal";

export default function ManageSpecificCookbookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [cookbookId, setCookbookId] = useState<string | null>(null);
  const [cookbook, setCookbook] = useState<Cookbook | null>(null);
  const [availableRecipes] = useState<Recipe[]>(dummyRecipes);
  const [isLoading, setIsLoading] = useState(true);

  // TODO: Replace with actual authenticated user
  const currentUserId = "Current User";

  // Initialize cookbook
  useEffect(() => {
    params.then(({ id }) => {
      setCookbookId(id);
      const initialCookbook = getCookbookById(id);
      if (initialCookbook) {
        setCookbook(initialCookbook);
      }
      setIsLoading(false);
    });
  }, [params]);

  const {
    searchTerm,
    setSearchTerm,
    showDeleteConfirm,
    setShowDeleteConfirm,
    filteredAvailableRecipes,
    handleAddRecipe,
    handleDeleteConfirm,
  } = useCookbookManagement({
    cookbook: cookbook || {
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
    onCookbookUpdate: setCookbook,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!cookbook && cookbookId) {
    notFound();
  }

  if (!cookbook) {
    return <div>Loading...</div>;
  }

  // Check permissions
  if (!canManageRecipesInCookbook(cookbook, currentUserId)) {
    router.push(`/cookbook/${cookbook.id}`);
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/cookbook/${cookbook.id}`}
          className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← Back to {cookbook.name}
        </Link>
        <h1 className="text-4xl font-bold mb-2">Manage {cookbook.name}</h1>
        <p className="text-gray-600">
          Add, remove, or edit recipes and variants in this cookbook.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CurrentRecipesPanel
          recipes={cookbook.recipes}
          cookbookId={cookbook.id}
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
