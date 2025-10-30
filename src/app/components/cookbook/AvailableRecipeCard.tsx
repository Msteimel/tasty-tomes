import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Recipe } from "@/lib/types";

interface AvailableRecipeCardProps {
  recipe: Recipe;
  onAdd: (recipeId: string) => void;
}

export function AvailableRecipeCard({
  recipe,
  onAdd,
}: AvailableRecipeCardProps) {
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
          <div className="flex gap-2">
            <Link href={`/recipes/${recipe.id}`}>
              <Button variant="outline" size="sm">
                View
              </Button>
            </Link>
            <Button variant="default" size="sm" onClick={() => onAdd(recipe.id)}>
              + Add to Cookbook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
