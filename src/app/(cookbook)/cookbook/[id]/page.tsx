import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCookbookById } from "@/lib/dummyData";
import { LinkAsButton } from "@/app/components/ui/LinkAsButton";

export default async function CookbookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookbook = getCookbookById(id);

  if (!cookbook) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header Section */}
      <div className="mb-8">
        <Link
          href="/cookbook"
          className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← Back to All Cookbooks
        </Link>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Cookbook Cover Image */}
          {cookbook.coverImage && (
            <div className="w-full md:w-1/3 rounded-lg overflow-hidden shadow-lg">
              <div className="relative aspect-square w-full">
                <Image
                  src={cookbook.coverImage}
                  alt={cookbook.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}

          {/* Cookbook Info */}
          <div className="flex-1">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">{cookbook.name}</h1>
                <p className="text-gray-600 text-lg mb-4">
                  {cookbook.description}
                </p>
              </div>
              <LinkAsButton
                href={`/cookbook/${cookbook.id}/edit`}
                variant="outline">
                Edit Cookbook
              </LinkAsButton>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
              <div>
                <span className="font-semibold">Recipes:</span>{" "}
                {cookbook.recipes.length}
              </div>
              <div>
                <span className="font-semibold">Created:</span>{" "}
                {cookbook.createdAt.toLocaleDateString()}
              </div>
              <div>
                <span className="font-semibold">Last Updated:</span>{" "}
                {cookbook.updatedAt.toLocaleDateString()}
              </div>
            </div>

            <div className="flex gap-3">
              <LinkAsButton href="/recipes/create" variant="default">
                Add New Recipe
              </LinkAsButton>
              <LinkAsButton
                href={`/cookbook/${cookbook.id}/manage`}
                variant="outline">
                Manage Recipes
              </LinkAsButton>
            </div>
          </div>
        </div>
      </div>

      {/* Recipes Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-gray-200">
          Recipes in this Cookbook ({cookbook.recipes.length})
        </h2>

        {cookbook.recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cookbook.recipes.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/recipes/${recipe.id}`}
                className="block group">
                <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  {recipe.recipeImage && (
                    <div className="aspect-video w-full overflow-hidden bg-gray-200 relative">
                      <Image
                        src={recipe.recipeImage}
                        alt={recipe.recipeName}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                      {recipe.recipeName}
                    </h3>
                    <p className="text-gray-600 mb-3 line-clamp-2 text-sm">
                      {recipe.recipeDescription}
                    </p>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                      <span className="flex items-center">
                        ⏱️ {recipe.preparationTime + recipe.cookingTime} min
                      </span>
                      <span className="flex items-center">
                        🍽️ {recipe.servingSize} servings
                      </span>
                      {recipe.cuisineType && (
                        <span className="capitalize">
                          🌍 {recipe.cuisineType}
                        </span>
                      )}
                    </div>
                    {recipe.originalAuthor && (
                      <p className="text-xs text-gray-500 mt-2 italic">
                        Recipe by {recipe.originalAuthor}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg mb-4">
              This cookbook doesn&apos;t have any recipes yet.
            </p>
            <LinkAsButton href="/recipes/create" variant="default">
              Add Your First Recipe
            </LinkAsButton>
          </div>
        )}
      </div>
    </div>
  );
}
