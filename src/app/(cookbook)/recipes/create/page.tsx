"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Recipe } from "@/lib/types";
import {
  useIngredients,
  useInstructions,
  validateRecipeForm,
  generateId,
} from "@/lib/recipeFormUtils";
import {
  IngredientsList,
  InstructionsList,
} from "@/app/components/recipe/RecipeFormComponents";

// Form data type - omits auto-generated fields and handles File for image
type RecipeFormData = Omit<
  Recipe,
  "id" | "createdAt" | "updatedAt" | "createdBy" | "recipeImage"
> & {
  recipeImage?: File;
};

export default function CreateRecipePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // TODO: Replace with actual authenticated user
  const currentUser = "Current User";

  // Use shared hooks for ingredients and instructions
  const ingredientsManager = useIngredients();
  const instructionsManager = useInstructions();

  // Form data state (without ingredients and instructions)
  const [formData, setFormData] = useState<
    Omit<RecipeFormData, "ingredients" | "instructions">
  >({
    recipeName: "",
    recipeDescription: "",
    preparationTime: 0,
    cookingTime: 0,
    servingSize: 0,
    cuisineType: "",
    originalAuthor: "", // Optional - for attributing the original recipe creator
  });

  // Handle form field changes
  const handleInputChange = (
    field: keyof RecipeFormData,
    value: string | number | File,
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
        name: formData.recipeName,
        hasValidIngredient: ingredientsManager.hasValidIngredient(),
        hasValidInstruction: instructionsManager.hasValidInstruction(),
      },
      {
        requireName: true,
        requireNotes: false,
        requireIngredients: true,
        requireInstructions: true,
      },
    );

    if (!validation.isValid) {
      alert(validation.errors.join("\n"));
      return;
    }

    // Set loading state
    setIsSubmitting(true);

    try {
      const now = new Date();

      // Convert File to URL string if image exists (in production, upload to storage first)
      let recipeImageUrl: string | undefined;
      if (formData.recipeImage) {
        // TODO: Upload image to storage service and get URL
        // For now, create a local URL (this won't persist)
        recipeImageUrl = URL.createObjectURL(formData.recipeImage);
      }

      // Create complete Recipe object with auto-generated fields
      const newRecipe: Recipe = {
        id: generateId(),
        recipeName: formData.recipeName,
        recipeDescription: formData.recipeDescription,
        preparationTime: formData.preparationTime,
        cookingTime: formData.cookingTime,
        servingSize: formData.servingSize,
        cuisineType: formData.cuisineType,
        originalAuthor: formData.originalAuthor || undefined, // Optional attribution
        createdBy: currentUser, // Auto-set to current user
        recipeImage: recipeImageUrl,
        ingredients: ingredientsManager.getValidIngredients(),
        instructions: instructionsManager.getValidInstructions(),
        createdAt: now,
        updatedAt: now,
      };

      console.log("New Recipe:", newRecipe);

      // Simulate API call delay (remove this when you add real API)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Here you would typically send the data to your backend/database
      // Example: await createRecipe(newRecipe);

      // Navigate to the newly created recipe page
      router.push(`/recipes/${newRecipe.id}`);
    } catch (error) {
      console.error("Error creating recipe:", error);
      alert("Failed to create recipe. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div>Create Recipe Page</div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            Recipe Name:
            <Input
              type="text"
              name="recipeName"
              required
              value={formData.recipeName}
              onChange={(e) => handleInputChange("recipeName", e.target.value)}
            />
          </label>
          <label>
            Recipe Description:
            <Textarea
              name="recipeDescription"
              value={formData.recipeDescription}
              onChange={(e) =>
                handleInputChange("recipeDescription", e.target.value)
              }
            />
          </label>
          <label>
            Preparation Time (minutes):
            <Input
              type="number"
              name="preparationTime"
              value={formData.preparationTime || ""}
              onChange={(e) =>
                handleInputChange(
                  "preparationTime",
                  parseInt(e.target.value) || 0,
                )
              }
            />
          </label>
          <label>
            Cooking Time (minutes):
            <Input
              type="number"
              name="cookingTime"
              value={formData.cookingTime || ""}
              onChange={(e) =>
                handleInputChange("cookingTime", parseInt(e.target.value) || 0)
              }
            />
          </label>
          <label>
            Serving Size:
            <Input
              type="number"
              name="servingSize"
              value={formData.servingSize || ""}
              onChange={(e) =>
                handleInputChange("servingSize", parseInt(e.target.value) || 0)
              }
            />
          </label>
          <label>
            Cuisine Type:
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
                </SelectGroup>
              </SelectContent>
            </Select>
          </label>
          <label>
            Original Author (Optional):
            <Input
              type="text"
              name="originalAuthor"
              value={formData.originalAuthor}
              onChange={(e) =>
                handleInputChange("originalAuthor", e.target.value)
              }
              placeholder="e.g., Grandma Betty, Chef Jacques"
            />
            <p className="text-sm text-gray-500 mt-1">
              Who originally created this recipe? Leave blank if it&apos;s your
              own creation.
            </p>
          </label>
          <label>
            Recipe Image:
            <input
              type="file"
              name="recipeImage"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleInputChange("recipeImage", file);
              }}
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>Ingredients</legend>
          <IngredientsList
            ingredients={ingredientsManager.ingredients}
            canAddMore={ingredientsManager.canAddIngredient()}
            onChange={ingredientsManager.handleIngredientChange}
            onRemove={ingredientsManager.removeIngredient}
            onAdd={ingredientsManager.addIngredient}
          />
        </fieldset>

        <fieldset>
          <legend>Instructions</legend>
          <InstructionsList
            instructions={instructionsManager.instructions}
            canAddMore={instructionsManager.canAddInstruction()}
            onChange={instructionsManager.handleInstructionChange}
            onRemove={instructionsManager.removeInstruction}
            onAdd={instructionsManager.addInstruction}
          />
        </fieldset>

        <div className="mt-6">
          <Button
            type="submit"
            variant="default"
            size="lg"
            disabled={!isFormValid() || isSubmitting}>
            {isSubmitting ? "Creating Recipe..." : "Create Recipe"}
          </Button>
        </div>
      </form>
    </div>
  );
}
