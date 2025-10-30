"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { getCookbookById } from "@/lib/dummyData";
import { Cookbook, CookbookMember } from "@/lib/types";
import { canEditCookbookSettings, canDeleteCookbook } from "@/lib/permissions";

// Form data type for editing - omits auto-generated and complex fields
type CookbookFormData = Omit<
  Cookbook,
  | "id"
  | "recipes"
  | "members"
  | "createdBy"
  | "createdAt"
  | "updatedAt"
  | "tags"
> & {
  tags: string; // Tags as comma-separated string for form input
};

export default function EditCookbookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const cookbook = getCookbookById(id);

  // Initialize state before any conditional returns
  const [formData, setFormData] = useState<CookbookFormData>({
    name: cookbook?.name || "",
    description: cookbook?.description || "",
    coverImage: cookbook?.coverImage || "",
    isPublic: cookbook?.isPublic || false,
    isCollaborative: cookbook?.isCollaborative || false,
    tags: cookbook?.tags?.join(", ") || "",
  });

  const [members, setMembers] = useState<CookbookMember[]>(
    cookbook?.members || [],
  );
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState<"editor" | "viewer">(
    "viewer",
  );
  const [recipesToRemove, setRecipesToRemove] = useState<Set<string>>(
    new Set(),
  );

  // Redirect if cookbook not found
  if (!cookbook) {
    router.push("/cookbook");
    return null;
  }

  // Check if current user is owner/admin
  // TODO: Replace with actual auth check
  const currentUserId = "Current User";
  
  // Check permissions
  const canEdit = canEditCookbookSettings(cookbook, currentUserId);
  const canDelete = canDeleteCookbook(cookbook, currentUserId);

  if (!canEdit) {
    // Non-owners/admins can't edit
    router.push(`/cookbook/${id}`);
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: When we have a database, this will be an API call
    const updatedCookbook: Cookbook = {
      ...cookbook,
      name: formData.name,
      description: formData.description,
      coverImage: formData.coverImage,
      isPublic: formData.isPublic,
      isCollaborative: formData.isCollaborative,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
      members,
      recipes: cookbook.recipes.filter((r) => !recipesToRemove.has(r.id)),
      updatedAt: new Date(),
    };

    console.log("Updating cookbook:", updatedCookbook);

    // TODO: Save to database
    // After saving, redirect to the cookbook detail page
    router.push(`/cookbook/${id}`);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name as keyof CookbookFormData]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name as keyof CookbookFormData]: value,
      }));
    }
  };

  const handleInviteMember = () => {
    if (!newMemberEmail.trim()) return;

    // TODO: Replace with actual user lookup by email
    const newMember: CookbookMember = {
      userId: newMemberEmail, // In real app, this would be the user's ID
      username: newMemberEmail, // In real app, this would be the user's display name
      role: newMemberRole,
      addedAt: new Date(),
    };

    setMembers([...members, newMember]);
    setNewMemberEmail("");
    setNewMemberRole("viewer");
  };

  const handleRemoveMember = (userId: string) => {
    if (
      confirm("Are you sure you want to remove this member from the cookbook?")
    ) {
      setMembers(members.filter((m) => m.userId !== userId));
    }
  };

  const handleChangeMemberRole = (userId: string, newRole: string) => {
    setMembers(
      members.map((m) =>
        m.userId === userId
          ? { ...m, role: newRole as "owner" | "editor" | "viewer" }
          : m,
      ),
    );
  };

  const toggleRecipeRemoval = (recipeId: string) => {
    const newSet = new Set(recipesToRemove);
    if (newSet.has(recipeId)) {
      newSet.delete(recipeId);
    } else {
      newSet.add(recipeId);
    }
    setRecipesToRemove(newSet);
  };

  const handleDeleteCookbook = () => {
    if (
      !confirm(
        `Are you sure you want to DELETE "${cookbook.name}"?\n\nThis will permanently delete the cookbook and cannot be undone.\n\nRecipes will not be deleted, but they will be removed from this cookbook.`
      )
    ) {
      return;
    }

    // Double confirmation for safety
    if (
      !confirm(
        "This is your last chance. Type YES in the next prompt to confirm deletion."
      )
    ) {
      return;
    }

    const userConfirmation = prompt(
      'Type "DELETE" in all caps to confirm permanent deletion:'
    );

    if (userConfirmation !== "DELETE") {
      alert("Deletion cancelled. The cookbook was not deleted.");
      return;
    }

    // TODO: Delete from database
    console.log("Deleting cookbook:", cookbook.id);

    // Redirect to cookbook list
    router.push("/cookbook");
    alert(`"${cookbook.name}" has been permanently deleted.`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Link
          href={`/cookbook/${id}`}
          className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← Back to Cookbook
        </Link>
        <h1 className="text-4xl font-bold mb-2">Edit Cookbook</h1>
        <p className="text-gray-600">
          Update cookbook details, manage members, and organize recipes.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Details Section */}
        <section className="border rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Basic Details</h2>

          <div className="space-y-4">
            {/* Cookbook Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Cookbook Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="e.g., Family Favorites, Holiday Recipes"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="description"
                name="description"
                placeholder="What makes this cookbook special?"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
              />
            </div>

            {/* Cover Image */}
            <div>
              <label
                htmlFor="coverImage"
                className="block text-sm font-medium mb-2">
                Cover Image URL
              </label>
              <Input
                id="coverImage"
                name="coverImage"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={formData.coverImage}
                onChange={handleChange}
              />
              {formData.coverImage && (
                <div className="mt-3 rounded-lg overflow-hidden max-w-xs border">
                  <div className="relative aspect-square w-full">
                    <Image
                      src={formData.coverImage}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium mb-2">
                Tags
              </label>
              <Input
                id="tags"
                name="tags"
                type="text"
                placeholder="e.g., comfort-food, quick-meals, baking"
                value={formData.tags}
                onChange={handleChange}
              />
              <p className="text-sm text-gray-500 mt-1">
                Separate tags with commas
              </p>
            </div>

            {/* Public Checkbox */}
            <div className="flex items-start space-x-3">
              <input
                id="isPublic"
                name="isPublic"
                type="checkbox"
                checked={formData.isPublic}
                onChange={handleChange}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <label htmlFor="isPublic" className="block text-sm font-medium">
                  Make this cookbook public
                </label>
                <p className="text-sm text-gray-500">
                  Public cookbooks can be viewed by anyone
                </p>
              </div>
            </div>

            {/* Collaborative Checkbox */}
            <div className="flex items-start space-x-3">
              <input
                id="isCollaborative"
                name="isCollaborative"
                type="checkbox"
                checked={formData.isCollaborative}
                onChange={handleChange}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <label
                  htmlFor="isCollaborative"
                  className="block text-sm font-medium">
                  Allow members to add and edit recipes
                </label>
                <p className="text-sm text-gray-500">
                  Members can contribute their own recipes
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Members Management Section */}
        <section className="border rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Manage Members</h2>

          {/* Invite Member */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Invite New Member</h3>
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter email address"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                className="flex-1"
              />
              <Select
                value={newMemberRole}
                onValueChange={(value) =>
                  setNewMemberRole(value as "editor" | "viewer")
                }>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="viewer">Viewer</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                </SelectContent>
              </Select>
              <Button
                type="button"
                onClick={handleInviteMember}
                variant="default">
                Invite
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Viewers can only see recipes. Editors can add and modify recipes
              if collaborative mode is enabled.
            </p>
          </div>

          {/* Current Members List */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Current Members</h3>
            <div className="space-y-3">
              {members.map((member) => (
                <div
                  key={member.userId}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{member.userId}</p>
                    <p className="text-sm text-gray-500">
                      Added {member.addedAt.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {member.role === "owner" ? (
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        Owner
                      </span>
                    ) : (
                      <Select
                        value={member.role}
                        onValueChange={(value) =>
                          handleChangeMemberRole(member.userId, value)
                        }>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="viewer">Viewer</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                    {member.role !== "owner" && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleRemoveMember(member.userId)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50">
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recipe Management Section */}
        <section className="border rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Manage Recipes</h2>
          <p className="text-gray-600 mb-4">
            Select recipes to remove from this cookbook. The recipes will not be
            deleted, just removed from this collection.
          </p>

          {cookbook.recipes.length > 0 ? (
            <div className="space-y-3">
              {cookbook.recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-colors ${
                    recipesToRemove.has(recipe.id)
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 bg-white"
                  }`}>
                  <input
                    type="checkbox"
                    checked={recipesToRemove.has(recipe.id)}
                    onChange={() => toggleRecipeRemoval(recipe.id)}
                    className="h-5 w-5 rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  {recipe.recipeImage && (
                    <div className="relative w-16 h-16 rounded overflow-hidden shrink-0">
                      <Image
                        src={recipe.recipeImage}
                        alt={recipe.recipeName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold">{recipe.recipeName}</h3>
                    <p className="text-sm text-gray-600 line-clamp-1">
                      {recipe.recipeDescription}
                    </p>
                  </div>
                  <Link
                    href={`/recipes/${recipe.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View →
                  </Link>
                </div>
              ))}
              {recipesToRemove.size > 0 && (
                <p className="text-sm text-red-600 font-medium">
                  {recipesToRemove.size} recipe(s) will be removed from this
                  cookbook
                </p>
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-6">
              This cookbook doesn&apos;t have any recipes yet.
            </p>
          )}
        </section>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-6 border-t">
          <Button type="submit" variant="default" className="flex-1">
            Save Changes
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/cookbook/${id}`)}
            className="flex-1">
            Cancel
          </Button>
        </div>
      </form>

      {/* Danger Zone - Delete Cookbook (Owners Only) */}
      {canDelete && (
        <div className="mt-8 pt-8 border-t-2 border-red-200">
          <div className="border-2 border-red-300 rounded-lg p-6 bg-red-50">
            <h2 className="text-2xl font-bold text-red-900 mb-2">
              Danger Zone
            </h2>
            <p className="text-red-800 mb-4">
              Once you delete a cookbook, there is no going back. Please be
              certain.
            </p>
            <div className="bg-white border border-red-300 rounded p-4 mb-4">
              <h3 className="font-semibold text-red-900 mb-2">
                What happens when you delete this cookbook:
              </h3>
              <ul className="text-sm text-red-800 space-y-1 list-disc list-inside">
                <li>The cookbook and all its settings will be permanently deleted</li>
                <li>All member associations will be removed</li>
                <li>Recipes will remain in the system but will be removed from this cookbook</li>
                <li>This action cannot be undone</li>
              </ul>
            </div>
            <Button
              type="button"
              onClick={handleDeleteCookbook}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold"
            >
              Delete This Cookbook Permanently
            </Button>
            <p className="text-xs text-red-700 mt-2 text-center italic">
              Only cookbook owners can delete cookbooks
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
