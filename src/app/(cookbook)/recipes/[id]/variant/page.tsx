"use client";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { RecipeVariant } from "@/lib/types";
import { getRecipeById, getCookbookById } from "@/lib/dummyData";
import { canCreateVariant } from "@/lib/permissions";
import {
  useIngredients,
  useInstructions,
  validateRecipeForm,
  generateVariantId,
} from "@/lib/recipeFormUtils";
import {
  IngredientsList,
  InstructionsList,
} from "@/app/components/recipe/RecipeFormComponents";

export default function CreateVariantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Unwrap the params Promise
  const { id } = use(params);

  // Get the parent recipe
  const recipe = getRecipeById(id);

  // TODO: Replace with actual authenticated user
  const currentUser = "Current User";

  // Get cookbook context for permission checks
  const cookbook = recipe?.cookbookIds?.[0] 
    ? getCookbookById(recipe.cookbookIds[0]) 
    : null;

  // Check if user has permission to create variant
  const userCanCreateVariant = recipe
    ? canCreateVariant(recipe, currentUser, cookbook || undefined)
    : false;

  // Use shared hooks for ingredients and instructions - initialize with parent recipe data
  const ingredientsManager = useIngredients(
    recipe ? recipe.ingredients.map((ing) => ({ ...ing })) : undefined,
  );
  const instructionsManager = useInstructions(
    recipe ? [...recipe.instructions] : undefined,
  );

  // Form data state - without ingredients and instructions
  const [formData, setFormData] = useState({
    variantName: "",
    description: "",
    notes: "",
    preparationTime: recipe?.preparationTime || 0,
    cookingTime: recipe?.cookingTime || 0,
    servingSize: recipe?.servingSize || 0,
  });

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Recipe not found</p>
        <Link href="/cookbook" className="text-blue-600 hover:text-blue-800">
          ← Back to Cookbook
        </Link>
      </div>
    );
  }

  // Check permission to create variant
  if (!userCanCreateVariant) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Permission Denied</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <p className="text-red-800 mb-4">
              You don&apos;t have permission to create variants for this recipe.
            </p>
            <p className="text-sm text-red-600">
              {cookbook 
                ? "Only owners, admins, and editors in collaborative cookbooks can create variants."
                : "Only the recipe creator can create variants of recipes without cookbook association."
              }
            </p>
          </div>
          <Link 
            href={`/recipes/${recipe.id}`}
            className="text-blue-600 hover:text-blue-800">
            ← Back to Recipe
          </Link>
        </div>
      </div>
    );
  }

  // Handle form field changes
  const handleInputChange = (field: string, value: string | number) => {
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
        requireNotes: true, // Variants require notes
        requireIngredients: true,
        requireInstructions: true,
      },
    );

    return validation.isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate using shared validation utility
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
      },
    );

    if (!validation.isValid) {
      alert(validation.errors.join("\n"));
      return;
    }

    setIsSubmitting(true);

    try {
      const now = new Date();

      const newVariant: RecipeVariant = {
        id: generateVariantId(recipe.id, recipe.variants?.length || 0),
        variantName: formData.variantName,
        description: formData.description || undefined,
        parentRecipeId: recipe.id,
        createdBy: currentUser,
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
        notes: formData.notes,
        createdAt: now,
        updatedAt: now,
      };

      console.log("New Variant:", newVariant);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Navigate to recipe with the new variant selected
      router.push(`/recipes/${recipe.id}?variant=${newVariant.id}`);
    } catch (error) {
      console.error("Error creating variant:", error);
      alert("Failed to create variant. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link
          href={`/recipes/${recipe.id}`}
          className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← Back to Recipe
        </Link>
        <h1 className="text-4xl font-bold mb-2">Create Recipe Variant</h1>
        <p className="text-gray-600">
          Creating a variant of: <strong>{recipe.recipeName}</strong>
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          What are recipe variants?
        </h2>
        <p className="text-sm text-gray-700 mb-3">
          Variants are modified versions of the original recipe. The form below
          is pre-filled with the original recipe data - simply edit what you
          want to change!
        </p>
        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside ml-2">
          <li>Dietary modifications (gluten-free, vegan, etc.)</li>
          <li>Different flavor profiles or ingredient substitutions</li>
          <li>Scaled versions (half batch, double batch)</li>
          <li>Regional or personal adaptations</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <fieldset className="border rounded-lg p-6">
          <legend className="text-xl font-semibold px-2">
            Variant Information
          </legend>

          <div className="space-y-4 mt-4">
            <div>
              <label
                htmlFor="variantName"
                className="block text-sm font-medium text-gray-700 mb-2">
                Variant Name *
              </label>
              <Input
                type="text"
                id="variantName"
                name="variantName"
                value={formData.variantName}
                onChange={(e) =>
                  handleInputChange("variantName", e.target.value)
                }
                placeholder="e.g., Vegan Version, Spicy Variation, Gluten-Free"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Brief description of this variant"
                rows={3}
              />
            </div>

            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700 mb-2">
                What&apos;s Different? *
              </label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="e.g., Uses almond milk instead of dairy, adds jalapeños for heat, doubles the chocolate"
                rows={2}
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Briefly explain what makes this variant unique
              </p>
            </div>
          </div>
        </fieldset>

        <fieldset className="border rounded-lg p-6">
          <legend className="text-xl font-semibold px-2">Recipe Details</legend>

          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div>
              <label
                htmlFor="preparationTime"
                className="block text-sm font-medium text-gray-700 mb-2">
                Prep Time (minutes)
              </label>
              <Input
                type="number"
                id="preparationTime"
                name="preparationTime"
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
                className="block text-sm font-medium text-gray-700 mb-2">
                Cook Time (minutes)
              </label>
              <Input
                type="number"
                id="cookingTime"
                name="cookingTime"
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
                className="block text-sm font-medium text-gray-700 mb-2">
                Servings
              </label>
              <Input
                type="number"
                id="servingSize"
                name="servingSize"
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
        </fieldset>

        <fieldset className="border rounded-lg p-6">
          <legend className="text-xl font-semibold px-2">Ingredients</legend>
          <p className="text-sm text-gray-600 mb-4 mt-2">
            Pre-filled with original recipe ingredients. Edit, add, or remove as
            needed.
          </p>
          <div className="mt-4">
            <IngredientsList
              ingredients={ingredientsManager.ingredients}
              canAddMore={ingredientsManager.canAddIngredient()}
              onChange={ingredientsManager.handleIngredientChange}
              onRemove={ingredientsManager.removeIngredient}
              onAdd={ingredientsManager.addIngredient}
            />
          </div>
        </fieldset>

        <fieldset className="border rounded-lg p-6">
          <legend className="text-xl font-semibold px-2">Instructions</legend>
          <p className="text-sm text-gray-600 mb-4 mt-2">
            Pre-filled with original recipe instructions. Edit, add, or remove
            as needed.
          </p>
          <div className="mt-4">
            <InstructionsList
              instructions={instructionsManager.instructions}
              canAddMore={instructionsManager.canAddInstruction()}
              onChange={instructionsManager.handleInstructionChange}
              onRemove={instructionsManager.removeInstruction}
              onAdd={instructionsManager.addInstruction}
            />
          </div>
        </fieldset>

        <div className="flex gap-4 pt-6">
          <Button
            type="submit"
            variant="default"
            size="lg"
            disabled={!isFormValid() || isSubmitting}>
            {isSubmitting ? "Creating Variant..." : "Create Variant"}
          </Button>
          <Link
            href={`/recipes/${recipe.id}`}
            className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition-colors inline-flex items-center">
            Cancel
          </Link>
        </div>
      </form>

      {/* Show existing variants */}
      {recipe.variants && recipe.variants.length > 0 && (
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-xl font-bold mb-4">Existing Variants</h3>
          <div className="space-y-3">
            {recipe.variants.map((variant) => (
              <div
                key={variant.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-lg">
                      {variant.variantName}
                    </h4>
                    {variant.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {variant.description}
                      </p>
                    )}
                    {variant.notes && (
                      <p className="text-xs text-gray-500 mt-2 italic">
                        {variant.notes}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      Created by {variant.createdBy} on{" "}
                      {variant.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/recipes/${recipe.id}/variant/${variant.id}/edit`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Edit
                    </Link>
                    <Link
                      href={`/recipes/${recipe.id}?variant=${variant.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
