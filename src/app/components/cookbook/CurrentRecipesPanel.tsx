import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Recipe } from "@/lib/types";
import { RecipeCardInCookbook } from "./RecipeCardInCookbook";

interface CurrentRecipesPanelProps {
  recipes: Recipe[];
  cookbookId: string;
  onRemoveRecipe: (recipeId: string) => void;
  onRemoveVariant: (recipeId: string, variantId: string) => void;
}

export function CurrentRecipesPanel({
  recipes,
  cookbookId,
  onRemoveRecipe,
  onRemoveVariant,
}: CurrentRecipesPanelProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Current Recipes ({recipes.length})
        </h2>
        <Link href={`/cookbook/${cookbookId}`}>
          <Button variant="outline" size="sm">
            View Cookbook
          </Button>
        </Link>
      </div>

      {recipes.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No recipes in this cookbook yet.</p>
          <p className="text-sm text-gray-400 mt-2">
            Add recipes from the list on the right.
          </p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[800px] overflow-y-auto">
          {recipes.map((recipe) => (
            <RecipeCardInCookbook
              key={recipe.id}
              recipe={recipe}
              onRemove={onRemoveRecipe}
              onRemoveVariant={onRemoveVariant}
            />
          ))}
        </div>
      )}
    </div>
  );
}
