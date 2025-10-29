"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { getRecipeById, getVariantById } from "@/lib/dummyData";
import { RecipeVariant } from "@/lib/types";
import {
  useIngredients,
  useInstructions,
  validateRecipeForm,
} from "@/lib/recipeFormUtils";
import {
  IngredientsList,
  InstructionsList,
} from "@/app/components/recipe/RecipeFormComponents";

// Form data type for editing variants
type VariantFormData = Omit<
  RecipeVariant,
  "id" | "parentRecipeId" | "createdBy" | "createdAt" | "updatedAt" | "ingredients" | "instructions"
>;

export default function EditVariantPage({
  params,
}: {
  params: Promise<{ id: string; variantId: string }>;
}) {
  const { id, variantId } = use(params);
  const router = useRouter();
  const recipe = getRecipeById(id);
  const variant = getVariantById(id, variantId);

  // Use shared hooks for ingredients and instructions
  const ingredientsManager = useIngredients(
    variant?.ingredients || recipe?.ingredients || []
  );
  const instructionsManager = useInstructions(
    variant?.instructions || recipe?.instructions || []
  );

  // Initialize state before conditional returns
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<VariantFormData>({
    variantName: variant?.variantName || "",
    description: variant?.description || "",
    notes: variant?.notes || "",
    preparationTime: variant?.preparationTime || recipe?.preparationTime,
    cookingTime: variant?.cookingTime || recipe?.cookingTime,
    servingSize: variant?.servingSize || recipe?.servingSize,
  });

  // Redirect if recipe or variant not found
  if (!recipe || !variant) {
    router.push("/cookbook");
    return null;
  }

  // TODO: Check if current user has permission to edit (variant creator or recipe owner)
  const currentUser = "Current User";
  const canEdit = variant.createdBy === currentUser;

  if (!canEdit) {
    router.push(`/recipes/${id}?variant=${variantId}`);
    return null;
  }

  // Handle form field changes
  const handleInputChange = (
    field: keyof VariantFormData,
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
        name: formData.variantName,
        notes: formData.notes,
        hasValidIngredient: ingredientsManager.hasValidIngredient(),
        hasValidInstruction: instructionsManager.hasValidInstruction(),
      },
      {
        requireName: true,
        requireNotes: true,
        requireIngredients: true,
        requireInstructions: true,
      }
    );

    return validation.isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert("Please fill in all required fields!");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create updated variant object
      const updatedVariant: RecipeVariant = {
        ...variant,
        variantName: formData.variantName,
        description: formData.description,
        notes: formData.notes,
        preparationTime:
          formData.preparationTime !== recipe.preparationTime
            ? formData.preparationTime
            : undefined,
        cookingTime:
          formData.cookingTime !== recipe.cookingTime
            ? formData.cookingTime
            : undefined,
        servingSize:
          formData.servingSize !== recipe.servingSize
            ? formData.servingSize
            : undefined,
        ingredients: ingredientsManager.getValidIngredients(),
        instructions: instructionsManager.getValidInstructions(),
        updatedAt: new Date(),
      };

      console.log("Updated Variant:", updatedVariant);

      // TODO: Save to database
      // Example: await updateVariant(id, variantId, updatedVariant);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Navigate back to the recipe with variant selected
      router.push(`/recipes/${id}?variant=${variantId}`);
    } catch (error) {
      console.error("Error updating variant:", error);
      alert("Failed to update variant. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this variant? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      // TODO: Delete from database
      // Example: await deleteVariant(id, variantId);

      console.log("Deleting variant:", variantId);
      alert("Variant deleted successfully!");
      router.push(`/recipes/${id}`);
    } catch (error) {
      console.error("Error deleting variant:", error);
      alert("Failed to delete variant. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Link
          href={`/recipes/${id}?variant=${variantId}`}
          className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← Back to Variant
        </Link>
        <h1 className="text-4xl font-bold mb-2">Edit Recipe Variant</h1>
        <p className="text-gray-600">
          Editing variant of: <strong>{recipe.recipeName}</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Variant Information Section */}
        <section className="border rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Variant Information</h2>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="variantName"
                className="block text-sm font-medium mb-2">
                Variant Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="variantName"
                type="text"
                name="variantName"
                required
                value={formData.variantName}
                onChange={(e) =>
                  handleInputChange("variantName", e.target.value)
                }
                placeholder="e.g., Vegan Version, Spicy Variation"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-2">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description || ""}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Brief description of this variant"
                rows={3}
              />
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium mb-2">
                What&apos;s Different? <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes || ""}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="e.g., Uses almond milk instead of dairy, adds jalapeños for heat"
                rows={2}
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Explain what makes this variant unique
              </p>
            </div>
          </div>
        </section>

        {/* Recipe Details Section */}
        <section className="border rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Recipe Details</h2>

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
              <p className="text-xs text-gray-500 mt-1">
                Original: {recipe.preparationTime} min
              </p>
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
              <p className="text-xs text-gray-500 mt-1">
                Original: {recipe.cookingTime} min
              </p>
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
              <p className="text-xs text-gray-500 mt-1">
                Original: {recipe.servingSize} servings
              </p>
            </div>
          </div>
        </section>

        {/* Ingredients Section */}
        <section className="border rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
          <p className="text-sm text-gray-600 mb-4">
            Edit ingredients as needed for this variant
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
          <h2 className="text-2xl font-bold mb-4">Instructions</h2>
          <p className="text-sm text-gray-600 mb-4">
            Edit instructions as needed for this variant
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
            onClick={() => router.push(`/recipes/${id}?variant=${variantId}`)}
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
            Delete Variant
          </Button>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Warning: Deleting this variant cannot be undone. The original recipe
            will not be affected.
          </p>
        </div>
      </form>
    </div>
  );
}
