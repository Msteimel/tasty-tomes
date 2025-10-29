import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRecipeById } from "@/lib/dummyData";
import { LinkAsButton } from "@/app/components/ui/LinkAsButton";
import { RecipeNotesWithAdd } from "@/app/components/recipe/RecipeNotesWithAdd";

export default async function RecipePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ variant?: string }>;
}) {
  const { id } = await params;
  const { variant: variantId } = await searchParams;
  const recipe = getRecipeById(id);

  if (!recipe) {
    notFound();
  }

  // Determine which version to display (original or variant)
  const hasVariants = recipe.variants && recipe.variants.length > 0;
  const selectedVariant = variantId
    ? recipe.variants?.find((v) => v.id === variantId)
    : null;

  // Use variant data if selected, otherwise use recipe data
  const displayName = selectedVariant
    ? `${recipe.recipeName} - ${selectedVariant.variantName}`
    : recipe.recipeName;
  const displayDescription =
    selectedVariant?.description || recipe.recipeDescription;
  const displayIngredients = selectedVariant?.ingredients || recipe.ingredients;
  const displayInstructions =
    selectedVariant?.instructions || recipe.instructions;
  const displayPrepTime =
    selectedVariant?.preparationTime ?? recipe.preparationTime;
  const displayCookTime = selectedVariant?.cookingTime ?? recipe.cookingTime;
  const displayServings = selectedVariant?.servingSize ?? recipe.servingSize;
  const displayImage = selectedVariant?.recipeImage || recipe.recipeImage;
  const displayCreator = selectedVariant?.createdBy || recipe.createdBy;

  const totalTime = displayPrepTime + displayCookTime;

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
            {selectedVariant ? (
              <>
                <LinkAsButton
                  href={`/recipes/${recipe.id}/variant/${variantId}/edit`}
                  variant="outline">
                  Edit Variant
                </LinkAsButton>
                <LinkAsButton
                  href={`/recipes/${recipe.id}/edit`}
                  variant="outline">
                  Edit Recipe
                </LinkAsButton>
              </>
            ) : (
              <>
                <LinkAsButton
                  href={`/recipes/${recipe.id}/edit`}
                  variant="outline">
                  Edit Recipe
                </LinkAsButton>
                <LinkAsButton
                  href={`/recipes/${recipe.id}/variant`}
                  variant="outline">
                  Create Variant
                </LinkAsButton>
              </>
            )}
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-2">{displayName}</h1>
        <div className="text-gray-600 mb-4">
          {recipe.originalAuthor && (
            <p className="text-lg">
              Original recipe by {recipe.originalAuthor}
            </p>
          )}
          <p className="text-sm">Digitized by {displayCreator}</p>
          {selectedVariant && (
            <p className="text-sm text-blue-600 font-medium mt-1">
              Variant created by {selectedVariant.createdBy}
            </p>
          )}
        </div>

        {/* Variant Selector */}
        {hasVariants && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold mb-2 text-gray-700">
              Recipe Versions:
            </h3>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/recipes/${recipe.id}`}
                className={`px-4 py-2 rounded-md border transition-colors ${
                  !variantId
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}>
                Original
              </Link>
              {recipe.variants?.map((variant) => (
                <Link
                  key={variant.id}
                  href={`/recipes/${recipe.id}?variant=${variant.id}`}
                  className={`px-4 py-2 rounded-md border transition-colors ${
                    variantId === variant.id
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}>
                  {variant.variantName}
                </Link>
              ))}
            </div>
            {selectedVariant?.notes && (
              <p className="mt-3 text-sm text-gray-600 italic">
                <strong>What&apos;s different:</strong> {selectedVariant.notes}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Recipe Image */}
      {displayImage && (
        <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
          <div className="relative aspect-video w-full">
            <Image
              src={displayImage}
              alt={displayName}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Description */}
      {displayDescription && (
        <div className="mb-8">
          <p className="text-lg text-gray-700">{displayDescription}</p>
        </div>
      )}

      {/* Recipe Info Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 bg-gray-50 rounded-lg">
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wide">
            Prep Time
          </p>
          <p className="text-xl font-semibold">{displayPrepTime} min</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wide">
            Cook Time
          </p>
          <p className="text-xl font-semibold">{displayCookTime} min</p>
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
          <p className="text-xl font-semibold">{displayServings}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Ingredients Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-200">
            Ingredients
          </h2>
          <ul className="space-y-2">
            {displayIngredients.map((ingredient, index) => (
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
            {displayInstructions.map((instruction, index) => (
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

      {/* Recipe Notes Section */}
      <div className="mb-8">
        <RecipeNotesWithAdd
          recipeId={recipe.id}
          variantId={selectedVariant?.id}
          recipeNotes={recipe.notes}
          variantNotes={selectedVariant?.userNotes}
          showBothOnVariant={!!selectedVariant}
        />
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
