import { useState, useMemo } from "react";
import { Recipe, Cookbook } from "@/lib/types";

interface UseCookbookManagementProps {
  cookbook: Cookbook;
  availableRecipes: Recipe[];
  onCookbookUpdate: (updatedCookbook: Cookbook) => void;
}

export function useCookbookManagement({
  cookbook,
  availableRecipes,
  onCookbookUpdate,
}: UseCookbookManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{
    type: "recipe" | "variant";
    id: string;
    parentId?: string;
  } | null>(null);

  // Get recipes that are in the cookbook
  const cookbookRecipeIds = useMemo(
    () => new Set(cookbook.recipes.map((r) => r.id)),
    [cookbook.recipes],
  );

  // Filter available recipes based on search
  const filteredAvailableRecipes = useMemo(
    () =>
      availableRecipes.filter(
        (recipe) =>
          !cookbookRecipeIds.has(recipe.id) &&
          (recipe.recipeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.recipeDescription
              .toLowerCase()
              .includes(searchTerm.toLowerCase())),
      ),
    [availableRecipes, cookbookRecipeIds, searchTerm],
  );

  // Add recipe to cookbook
  const handleAddRecipe = (recipeId: string) => {
    const recipeToAdd = availableRecipes.find((r) => r.id === recipeId);
    if (!recipeToAdd) return;

    onCookbookUpdate({
      ...cookbook,
      recipes: [...cookbook.recipes, recipeToAdd],
      updatedAt: new Date(),
    });
  };

  // Remove recipe from cookbook
  const handleRemoveRecipe = (recipeId: string) => {
    onCookbookUpdate({
      ...cookbook,
      recipes: cookbook.recipes.filter((r) => r.id !== recipeId),
      updatedAt: new Date(),
    });
    setShowDeleteConfirm(null);
  };

  // Remove variant from recipe
  const handleRemoveVariant = (recipeId: string, variantId: string) => {
    onCookbookUpdate({
      ...cookbook,
      recipes: cookbook.recipes.map((r) =>
        r.id === recipeId
          ? {
              ...r,
              variants: r.variants?.filter((v) => v.id !== variantId),
              updatedAt: new Date(),
            }
          : r,
      ),
      updatedAt: new Date(),
    });
    setShowDeleteConfirm(null);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (!showDeleteConfirm) return;

    if (showDeleteConfirm.type === "recipe") {
      handleRemoveRecipe(showDeleteConfirm.id);
    } else if (showDeleteConfirm.parentId) {
      handleRemoveVariant(showDeleteConfirm.parentId, showDeleteConfirm.id);
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    showDeleteConfirm,
    setShowDeleteConfirm,
    filteredAvailableRecipes,
    handleAddRecipe,
    handleRemoveRecipe,
    handleRemoveVariant,
    handleDeleteConfirm,
  };
}
