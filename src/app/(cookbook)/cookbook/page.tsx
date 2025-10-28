import Link from "next/link";
import Image from "next/image";
import { dummyCookbooks, dummyRecipes } from "@/lib/dummyData";
import { LinkAsButton } from "@/app/components/ui/LinkAsButton";

export default function CookbookPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Cookbooks Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">My Cookbooks</h1>
          <LinkAsButton href="/cookbook/create" variant="default">
            Create New Cookbook
          </LinkAsButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyCookbooks.map((cookbook) => (
            <Link
              key={cookbook.id}
              href={`/cookbook/${cookbook.id}`}
              className="block group">
              <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                {cookbook.coverImage && (
                  <div className="aspect-video w-full overflow-hidden bg-gray-200 relative">
                    <Image
                      src={cookbook.coverImage}
                      alt={cookbook.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {cookbook.name}
                  </h2>
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {cookbook.description}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{cookbook.recipes.length} recipes</span>
                    <span>
                      Updated {cookbook.updatedAt.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {dummyCookbooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              You don&apos;t have any cookbooks yet.
            </p>
            <LinkAsButton href="/cookbook/create" variant="default">
              Create Your First Cookbook
            </LinkAsButton>
          </div>
        )}
      </div>

      {/* All Recipes Section */}
      <div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">All Recipes</h2>
          <LinkAsButton href="/recipes/create" variant="default">
            Create New Recipe
          </LinkAsButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyRecipes.map((recipe) => (
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
                </div>
              </div>
            </Link>
          ))}
        </div>

        {dummyRecipes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              You don&apos;t have any recipes yet.
            </p>
            <LinkAsButton href="/recipes/create" variant="default">
              Create Your First Recipe
            </LinkAsButton>
          </div>
        )}
      </div>
    </div>
  );
}
