"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";

export default function CreateCookbookPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    coverImage: "",
    isPublic: false,
    isCollaborative: false,
    tags: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: When we have a database, this will be an API call
    // For now, we'll just log the data and redirect
    const newCookbook = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
      createdBy: "Current User", // TODO: Get from auth session
      members: [
        {
          userId: "Current User", // TODO: Get from auth session
          role: "owner" as const,
          addedAt: new Date(),
        },
      ],
      recipes: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log("Creating cookbook:", newCookbook);

    // TODO: Save to database
    // After saving, redirect to the cookbook page
    router.push("/cookbook");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Create New Cookbook</h1>
        <p className="text-gray-600">
          Organize your favorite recipes into a beautiful cookbook collection.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
            placeholder="What makes this cookbook special? What kind of recipes will it contain?"
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
          <p className="text-sm text-gray-500 mt-1">
            Optional: Provide a URL for the cookbook cover image
          </p>
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
            Separate tags with commas to help organize and find your cookbook
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
              Public cookbooks can be viewed by anyone. You can change this
              later.
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
              If enabled, members you invite can contribute their own recipes to
              this cookbook.
            </p>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-6 border-t">
          <Button type="submit" variant="default" className="flex-1">
            Create Cookbook
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/cookbook")}
            className="flex-1">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
