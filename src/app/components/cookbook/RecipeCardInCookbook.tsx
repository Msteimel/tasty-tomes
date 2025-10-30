import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Recipe } from "@/lib/types";

interface RecipeCardInCookbookProps {
  recipe: Recipe;
  onRemove: (recipeId: string) => void;
  onRemoveVariant: (recipeId: string, variantId: string) => void;
}

export function RecipeCardInCookbook({
  recipe,
  onRemove,
  onRemoveVariant,
}: RecipeCardInCookbookProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {recipe.recipeImage && (
          <div className="w-24 h-24 rounded-md overflow-hidden shrink-0 relative">
            <Image
              src={recipe.recipeImage}
              alt={recipe.recipeName}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg mb-1 truncate">
            {recipe.recipeName}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {recipe.recipeDescription}
          </p>
          <div className="flex flex-wrap gap-2">
            <Link href={`/recipes/${recipe.id}`}>
              <Button variant="outline" size="sm">
                View
              </Button>
            </Link>
            <Link href={`/recipes/${recipe.id}/edit`}>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </Link>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onRemove(recipe.id)}>
              Remove
            </Button>
          </div>

          {/* Variants */}
          {recipe.variants && recipe.variants.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-semibold mb-2 text-gray-700">
                Variants ({recipe.variants.length})
              </h4>
              <div className="space-y-2">
                {recipe.variants.map((variant) => (
                  <div
                    key={variant.id}
                    className="bg-gray-50 p-3 rounded-md flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {variant.variantName}
                      </p>
                      {variant.description && (
                        <p className="text-xs text-gray-600 line-clamp-1 mt-1">
                          {variant.description}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-1 ml-2 shrink-0">
                      <Link
                        href={`/recipes/${recipe.id}/variant/${variant.id}/edit`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 px-2">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="text-xs h-7 px-2"
                        onClick={() => onRemoveVariant(recipe.id, variant.id)}>
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href={`/recipes/${recipe.id}/variant`}
                className="inline-block mt-3">
                <Button variant="outline" size="sm">
                  + Add Variant
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
