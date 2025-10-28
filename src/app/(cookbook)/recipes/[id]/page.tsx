import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRecipeById } from "@/lib/dummyData";
import { LinkAsButton } from "@/app/components/ui/LinkAsButton";

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = getRecipeById(id);

  if (!recipe) {
    notFound();
  }

  const totalTime = recipe.preparationTime + recipe.cookingTime;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <Link
            href="/cookbook"
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Cookbook
          </Link>
          <div className="flex gap-2">
            <LinkAsButton href={`/recipes/${recipe.id}/edit`} variant="outline">
              Edit Recipe
            </LinkAsButton>
            <LinkAsButton
              href={`/recipes/${recipe.id}/variant`}
              variant="outline">
              Create Variant
            </LinkAsButton>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-2">{recipe.recipeName}</h1>
        <div className="text-gray-600 mb-4">
          {recipe.originalAuthor && (
            <p className="text-lg">Original recipe by {recipe.originalAuthor}</p>
          )}
          <p className="text-sm">Digitized by {recipe.createdBy}</p>
        </div>
      </div>

      {/* Recipe Image */}
      {recipe.recipeImage && (
        <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
          <div className="relative aspect-video w-full">
            <Image
              src={recipe.recipeImage}
              alt={recipe.recipeName}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Description */}
      {recipe.recipeDescription && (
        <div className="mb-8">
          <p className="text-lg text-gray-700">{recipe.recipeDescription}</p>
        </div>
      )}

      {/* Recipe Info Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 bg-gray-50 rounded-lg">
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wide">
            Prep Time
          </p>
          <p className="text-xl font-semibold">{recipe.preparationTime} min</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wide">
            Cook Time
          </p>
          <p className="text-xl font-semibold">{recipe.cookingTime} min</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wide">
            Total Time
          </p>
          <p className="text-xl font-semibold">{totalTime} min</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wide">
            Servings
          </p>
          <p className="text-xl font-semibold">{recipe.servingSize}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Ingredients Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-200">
            Ingredients
          </h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>
                  {ingredient.quantityWhole > 0 && ingredient.quantityWhole}{" "}
                  {ingredient.quantityFraction &&
                    ingredient.quantityFraction !== "0" &&
                    ingredient.quantityFraction}{" "}
                  {ingredient.measurement !== "pieces" &&
                    ingredient.measurement !== "to-taste" &&
                    ingredient.measurement}{" "}
                  {ingredient.name}
                  {ingredient.measurement === "to-taste" && " (to taste)"}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-200">
            Instructions
          </h2>
          <ol className="space-y-4">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="flex items-start">
                <span className="font-bold text-blue-600 mr-3 min-w-8">
                  {index + 1}.
                </span>
                <span className="text-gray-700">{instruction}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Metadata */}
      <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
        <div className="flex flex-wrap gap-4">
          {recipe.cuisineType && (
            <div>
              <span className="font-semibold">Cuisine:</span>{" "}
              <span className="capitalize">{recipe.cuisineType}</span>
            </div>
          )}
          <div>
            <span className="font-semibold">Created:</span>{" "}
            {recipe.createdAt.toLocaleDateString()}
          </div>
          <div>
            <span className="font-semibold">Last Updated:</span>{" "}
            {recipe.updatedAt.toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}
