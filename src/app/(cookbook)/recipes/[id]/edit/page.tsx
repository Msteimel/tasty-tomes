"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import { getRecipeById } from "@/lib/dummyData";
import { Recipe } from "@/lib/types";
import { canEditRecipe } from "@/lib/permissions";
import {
  useIngredients,
  useInstructions,
  validateRecipeForm,
} from "@/lib/recipeFormUtils";
import {
  IngredientsList,
  InstructionsList,
} from "@/app/components/recipe/RecipeFormComponents";

// Form data type - omits auto-generated fields
type RecipeFormData = Omit<
  Recipe,
  "id" | "createdAt" | "updatedAt" | "createdBy" | "recipeImage" | "variants"
> & {
  recipeImageUrl?: string;
};

export default function EditRecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const recipe = getRecipeById(id);

  // Initialize state before conditional returns
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Use shared hooks for ingredients and instructions
  const ingredientsManager = useIngredients(recipe?.ingredients);
  const instructionsManager = useInstructions(recipe?.instructions);
  
  const [formData, setFormData] = useState<
    Omit<RecipeFormData, "ingredients" | "instructions">
  >({
    recipeName: recipe?.recipeName || "",
    recipeDescription: recipe?.recipeDescription || "",
    preparationTime: recipe?.preparationTime || 0,
    cookingTime: recipe?.cookingTime || 0,
    servingSize: recipe?.servingSize || 0,
    cuisineType: recipe?.cuisineType || "",
    originalAuthor: recipe?.originalAuthor || "",
    recipeImageUrl: recipe?.recipeImage,
  });

  // Redirect if recipe not found
  if (!recipe) {
    router.push("/cookbook");
    return null;
  }

  // TODO: Check if current user has permission to edit (creator or cookbook owner)
  const currentUser = "Current User";
  
  // TODO: Get cookbook context if recipe is in a cookbook
  // For now, we just check if user is the creator
  if (!canEditRecipe(recipe, currentUser)) {
    router.push(`/recipes/${id}`);
    return null;
  }

  // Handle form field changes
  const handleInputChange = (
    field: keyof RecipeFormData,
    value: string | number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Check if form is valid for submission
  const isFormValid = (): boolean => {
    const validation = validateRecipeForm(
      {
        name: formData.recipeName,
        hasValidIngredient: ingredientsManager.hasValidIngredient(),
        hasValidInstruction: instructionsManager.hasValidInstruction(),
      },
      {
        requireName: true,
        requireNotes: false,
        requireIngredients: true,
        requireInstructions: true,
      }
    );

    return validation.isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate using shared validation utility
    const validation = validateRecipeForm(
      {
        name: formData.recipeName,
        hasValidIngredient: ingredientsManager.hasValidIngredient(),
        hasValidInstruction: instructionsManager.hasValidInstruction(),
      },
      {
        requireName: true,
        requireNotes: false,
        requireIngredients: true,
        requireInstructions: true,
      }
    );

    if (!validation.isValid) {
      alert(validation.errors.join("\n"));
      return;
    }

    setIsSubmitting(true);

    try {
      // Create updated Recipe object
      const updatedRecipe: Recipe = {
        ...recipe,
        recipeName: formData.recipeName,
        recipeDescription: formData.recipeDescription,
        preparationTime: formData.preparationTime,
        cookingTime: formData.cookingTime,
        servingSize: formData.servingSize,
        cuisineType: formData.cuisineType,
        originalAuthor: formData.originalAuthor || undefined,
        recipeImage: formData.recipeImageUrl,
        ingredients: ingredientsManager.getValidIngredients(),
        instructions: instructionsManager.getValidInstructions(),
        updatedAt: new Date(),
      };

      console.log("Updated Recipe:", updatedRecipe);

      // TODO: Save to database
      // Example: await updateRecipe(id, updatedRecipe);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Navigate back to the recipe page
      router.push(`/recipes/${id}`);
    } catch (error) {
      console.error("Error updating recipe:", error);
      alert("Failed to update recipe. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this recipe? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      // TODO: Delete from database
      // Example: await deleteRecipe(id);

      console.log("Deleting recipe:", id);
      alert("Recipe deleted successfully!");
      router.push("/cookbook");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Failed to delete recipe. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Link
          href={`/recipes/${id}`}
          className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← Back to Recipe
        </Link>
        <h1 className="text-4xl font-bold mb-2">Edit Recipe</h1>
        <p className="text-gray-600">
          Make changes to your recipe details, ingredients, and instructions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Details Section */}
        <section className="border rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Basic Details</h2>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="recipeName"
                className="block text-sm font-medium mb-2">
                Recipe Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="recipeName"
                type="text"
                name="recipeName"
                required
                value={formData.recipeName}
                onChange={(e) =>
                  handleInputChange("recipeName", e.target.value)
                }
                placeholder="e.g., Classic Spaghetti Carbonara"
              />
            </div>

            <div>
              <label
                htmlFor="recipeDescription"
                className="block text-sm font-medium mb-2">
                Description
              </label>
              <Textarea
                id="recipeDescription"
                name="recipeDescription"
                value={formData.recipeDescription}
                onChange={(e) =>
                  handleInputChange("recipeDescription", e.target.value)
                }
                placeholder="What makes this recipe special?"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="preparationTime"
                  className="block text-sm font-medium mb-2">
                  Prep Time (min)
                </label>
                <Input
                  id="preparationTime"
                  type="number"
                  name="preparationTime"
                  min="0"
                  value={formData.preparationTime || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "preparationTime",
                      parseInt(e.target.value) || 0,
                    )
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="cookingTime"
                  className="block text-sm font-medium mb-2">
                  Cook Time (min)
                </label>
                <Input
                  id="cookingTime"
                  type="number"
                  name="cookingTime"
                  min="0"
                  value={formData.cookingTime || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "cookingTime",
                      parseInt(e.target.value) || 0,
                    )
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="servingSize"
                  className="block text-sm font-medium mb-2">
                  Servings
                </label>
                <Input
                  id="servingSize"
                  type="number"
                  name="servingSize"
                  min="0"
                  value={formData.servingSize || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "servingSize",
                      parseInt(e.target.value) || 0,
                    )
                  }
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="cuisineType"
                className="block text-sm font-medium mb-2">
                Cuisine Type
              </label>
              <Select
                name="cuisineType"
                value={formData.cuisineType}
                onValueChange={(value) =>
                  handleInputChange("cuisineType", value)
                }>
                <SelectTrigger>
                  <SelectValue placeholder="Select a cuisine type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Cuisine Types</SelectLabel>
                    <SelectItem value="italian">Italian</SelectItem>
                    <SelectItem value="chinese">Chinese</SelectItem>
                    <SelectItem value="mexican">Mexican</SelectItem>
                    <SelectItem value="indian">Indian</SelectItem>
                    <SelectItem value="american">American</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="thai">Thai</SelectItem>
                    <SelectItem value="japanese">Japanese</SelectItem>
                    <SelectItem value="korean">Korean</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label
                htmlFor="originalAuthor"
                className="block text-sm font-medium mb-2">
                Original Author
              </label>
              <Input
                id="originalAuthor"
                type="text"
                name="originalAuthor"
                value={formData.originalAuthor}
                onChange={(e) =>
                  handleInputChange("originalAuthor", e.target.value)
                }
                placeholder="e.g., Grandma Betty, Chef Jacques"
              />
              <p className="text-sm text-gray-500 mt-1">
                Who originally created this recipe? Leave blank if it&apos;s
                your own creation.
              </p>
            </div>

            <div>
              <label
                htmlFor="recipeImageUrl"
                className="block text-sm font-medium mb-2">
                Recipe Image URL
              </label>
              <Input
                id="recipeImageUrl"
                type="url"
                name="recipeImageUrl"
                value={formData.recipeImageUrl || ""}
                onChange={(e) =>
                  handleInputChange("recipeImageUrl", e.target.value)
                }
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-sm text-gray-500 mt-1">
                Provide a URL for the recipe image
              </p>
            </div>
          </div>
        </section>

        {/* Ingredients Section */}
        <section className="border rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            Ingredients <span className="text-red-500">*</span>
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            At least one complete ingredient is required
          </p>

          <IngredientsList
            ingredients={ingredientsManager.ingredients}
            canAddMore={ingredientsManager.canAddIngredient()}
            onChange={ingredientsManager.handleIngredientChange}
            onRemove={ingredientsManager.removeIngredient}
            onAdd={ingredientsManager.addIngredient}
          />
        </section>

        {/* Instructions Section */}
        <section className="border rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            Instructions <span className="text-red-500">*</span>
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            At least one instruction is required
          </p>

          <InstructionsList
            instructions={instructionsManager.instructions}
            canAddMore={instructionsManager.canAddInstruction()}
            onChange={instructionsManager.handleInstructionChange}
            onRemove={instructionsManager.removeInstruction}
            onAdd={instructionsManager.addInstruction}
          />
        </section>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6 border-t">
          <Button
            type="submit"
            variant="default"
            className="flex-1"
            disabled={!isFormValid() || isSubmitting}>
            {isSubmitting ? "Saving Changes..." : "Save Changes"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/recipes/${id}`)}
            className="flex-1">
            Cancel
          </Button>
        </div>

        {/* Delete Button */}
        <div className="pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={handleDelete}
            className="w-full text-red-600 hover:text-red-800 hover:bg-red-50 border-red-300">
            Delete Recipe
          </Button>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Warning: Deleting this recipe will remove it from all cookbooks and
            cannot be undone.
          </p>
        </div>
      </form>
    </div>
  );
}
