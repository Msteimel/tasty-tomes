"use client";

import { checkIfSignedIn } from "@/app/components/lib/utils";
import { Button } from "@/app/components/ui/button";
import { LinkAsButton } from "@/app/components/ui/LinkAsButton";
import Image from "next/image";
import Link from "next/link";
import { dummyCookbooks, dummyRecipes } from "@/lib/dummyData";

export default function ProfilePage() {
  const isUserSignedIn = checkIfSignedIn(); // Since this is the profile page, we assume the user is signed in.

  // TODO: Replace with actual authenticated user data
  const currentUser = {
    name: "Current User",
    email: "user@example.com",
    joinDate: new Date("2024-01-01"),
  };

  // Filter recipes and cookbooks for the current user
  // In a real app, this would be a database query
  const userRecipes = dummyRecipes.filter(
    (recipe) => recipe.createdBy === currentUser.name
  );
  const userCookbooks = dummyCookbooks.filter(
    (cookbook) => cookbook.recipes.some((recipe) => recipe.createdBy === currentUser.name)
  );

  const signUserOut = () => {
    localStorage.setItem("signedIn", "false");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPassword");
    window.location.href = "/";
  };

  return isUserSignedIn ? (
    <div className="container mx-auto px-4 py-8">
      {/* User Info Header */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">{currentUser.name}</h1>
          <p className="text-gray-600 mb-1">{currentUser.email}</p>
          <p className="text-sm text-gray-500">
            Member since {currentUser.joinDate.toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-3">
          <LinkAsButton href="/recipes/create" variant="default">
            Create Recipe
          </LinkAsButton>
          <Button variant="outline" size="lg" onClick={signUserOut}>
            Sign Out
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <p className="text-4xl font-bold text-blue-600">{userRecipes.length}</p>
          <p className="text-gray-600 mt-2">Recipes Created</p>
        </div>
        <div className="bg-green-50 rounded-lg p-6 text-center">
          <p className="text-4xl font-bold text-green-600">{userCookbooks.length}</p>
          <p className="text-gray-600 mt-2">Cookbooks</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-6 text-center">
          <p className="text-4xl font-bold text-purple-600">
            {userRecipes.reduce((sum, recipe) => sum + recipe.ingredients.length, 0)}
          </p>
          <p className="text-gray-600 mt-2">Total Ingredients Used</p>
        </div>
      </div>

      {/* My Cookbooks Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">My Cookbooks</h2>
          <div className="flex gap-3">
            <LinkAsButton href="/profile/manage-cookbooks" variant="outline">
              Manage All Cookbooks
            </LinkAsButton>
            <LinkAsButton href="/cookbook/create" variant="default">
              Create New Cookbook
            </LinkAsButton>
          </div>
        </div>

        {userCookbooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userCookbooks.map((cookbook) => (
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
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                      {cookbook.name}
                    </h3>
                    <p className="text-gray-600 mb-3 line-clamp-2 text-sm">
                      {cookbook.description}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
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
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg mb-4">
              You haven&apos;t created any cookbooks yet.
            </p>
            <LinkAsButton href="/cookbook/create" variant="default">
              Create Your First Cookbook
            </LinkAsButton>
          </div>
        )}
      </div>

      {/* My Recipes Section */}
      <div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">My Recipes</h2>
          <LinkAsButton href="/recipes/create" variant="outline">
            Create New Recipe
          </LinkAsButton>
        </div>

        {userRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRecipes.map((recipe) => (
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
                        Original recipe by {recipe.originalAuthor}
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
              You haven&apos;t created any recipes yet.
            </p>
            <LinkAsButton href="/recipes/create" variant="default">
              Create Your First Recipe
            </LinkAsButton>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <h2 className="text-2xl font-semibold">Please sign in to view your profile</h2>
      <LinkAsButton href="/sign-in" variant="default" size="lg">
        Sign In
      </LinkAsButton>
    </div>
  );
}
