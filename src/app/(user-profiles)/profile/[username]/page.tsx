import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { dummyCookbooks, dummyRecipes } from "@/lib/dummyData";
import { usernameToUserId, userProfiles } from "@/lib/userMappings";

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  
  // Look up user ID from username slug
  const userId = usernameToUserId[username];
  
  // If user not found, show 404
  if (!userId || !userProfiles[userId]) {
    notFound();
  }

  const user = userProfiles[userId];

  // Filter recipes and cookbooks for this user
  const userRecipes = dummyRecipes.filter(
    (recipe) => recipe.createdBy === userId
  );
  const userCookbooks = dummyCookbooks.filter((cookbook) =>
    cookbook.members.some((member) => member.userId === userId)
  );

  // Get user's role in each cookbook
  const cookbooksWithRoles = userCookbooks.map((cookbook) => {
    const member = cookbook.members.find((m) => m.userId === userId);
    return {
      ...cookbook,
      userRole: member?.role || "viewer",
    };
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* User Info Header */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
          <p className="text-gray-600 mb-1">{user.email}</p>
          <p className="text-sm text-gray-500">
            Member since {user.joinDate.toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <p className="text-4xl font-bold text-blue-600">
            {userRecipes.length}
          </p>
          <p className="text-gray-600 mt-2">Recipes Created</p>
        </div>
        <div className="bg-green-50 rounded-lg p-6 text-center">
          <p className="text-4xl font-bold text-green-600">
            {userCookbooks.length}
          </p>
          <p className="text-gray-600 mt-2">Cookbooks</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-6 text-center">
          <p className="text-4xl font-bold text-purple-600">
            {userRecipes.reduce(
              (sum, recipe) => sum + recipe.ingredients.length,
              0
            )}
          </p>
          <p className="text-gray-600 mt-2">Total Ingredients Used</p>
        </div>
      </div>

      {/* Cookbooks Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Cookbooks</h2>
        </div>

        {cookbooksWithRoles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cookbooksWithRoles.map((cookbook) => (
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
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                        {cookbook.name}
                      </h3>
                      <span
                        className={`text-xs px-2 py-1 rounded capitalize ${
                          cookbook.userRole === "owner"
                            ? "bg-blue-100 text-blue-800"
                            : cookbook.userRole === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : cookbook.userRole === "editor"
                            ? "bg-green-100 text-green-800"
                            : cookbook.userRole === "contributor"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}>
                        {cookbook.userRole}
                      </span>
                    </div>
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
            <p className="text-gray-500 text-lg">
              {user.name} hasn&apos;t joined any cookbooks yet.
            </p>
          </div>
        )}
      </div>

      {/* Recipes Section */}
      <div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Recipes</h2>
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
            <p className="text-gray-500 text-lg">
              {user.name} hasn&apos;t created any recipes yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
