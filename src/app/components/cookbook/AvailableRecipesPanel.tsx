import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Recipe } from "@/lib/types";
import { AvailableRecipeCard } from "./AvailableRecipeCard";

interface AvailableRecipesPanelProps {
  recipes: Recipe[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddRecipe: (recipeId: string) => void;
}

export function AvailableRecipesPanel({
  recipes,
  searchTerm,
  onSearchChange,
  onAddRecipe,
}: AvailableRecipesPanelProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        Available Recipes ({recipes.length})
      </h2>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {recipes.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            {searchTerm
              ? "No recipes found matching your search."
              : "All available recipes have been added to this cookbook."}
          </p>
          {!searchTerm && (
            <Link href="/recipes/create" className="inline-block mt-4">
              <Button variant="default" size="sm">
                Create New Recipe
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4 max-h-[800px] overflow-y-auto">
          {recipes.map((recipe) => (
            <AvailableRecipeCard
              key={recipe.id}
              recipe={recipe}
              onAdd={onAddRecipe}
            />
          ))}
        </div>
      )}
    </div>
  );
}
