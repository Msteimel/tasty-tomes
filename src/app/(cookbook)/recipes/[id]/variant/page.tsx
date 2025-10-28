"use client";
import { use, useState } from "react";
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
import { Ingredient, RecipeVariant } from "@/lib/types";
import { getRecipeById } from "@/lib/dummyData";

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

  // Form data state - Initialize with parent recipe data
  const [formData, setFormData] = useState({
    variantName: "",
    description: "",
    notes: "",
    preparationTime: recipe?.preparationTime || 0,
    cookingTime: recipe?.cookingTime || 0,
    servingSize: recipe?.servingSize || 0,
    ingredients: recipe
      ? [...recipe.ingredients.map((ing) => ({ ...ing }))]
      : [], // Deep copy
    instructions: recipe ? [...recipe.instructions] : [], // Copy array
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

  // Handle form field changes
  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle ingredient changes
  const handleIngredientChange = (
    index: number,
    field: keyof Ingredient,
    value: string | number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ingredient, i) =>
        i === index ? { ...ingredient, [field]: value } : ingredient,
      ),
    }));
  };

  // Handle instruction changes
  const handleInstructionChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      instructions: prev.instructions.map((instruction, i) =>
        i === index ? value : instruction,
      ),
    }));
  };

  const addIngredient = (i: number) => {
    const ingredientCount = i + 1;

    return (
      <div key={i} className="flex gap-2 mb-2">
        <Input
          type="text"
          name={`ingredient${ingredientCount}`}
          placeholder={`Ingredient ${ingredientCount}`}
          value={formData.ingredients[i]?.name || ""}
          onChange={(e) => handleIngredientChange(i, "name", e.target.value)}
          className="flex-1"
        />
        <Input
          type="number"
          name={`quantityWhole${ingredientCount}`}
          placeholder="Qty"
          min="0"
          value={formData.ingredients[i]?.quantityWhole || ""}
          onChange={(e) =>
            handleIngredientChange(
              i,
              "quantityWhole",
              parseInt(e.target.value) || 0,
            )
          }
          className="w-20"
        />
        <Select
          name={`quantityFraction${ingredientCount}`}
          value={formData.ingredients[i]?.quantityFraction || ""}
          onValueChange={(value) =>
            handleIngredientChange(i, "quantityFraction", value)
          }>
          <SelectTrigger className="w-24">
            <SelectValue placeholder="Frac." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fraction</SelectLabel>
              <SelectItem value="0">None</SelectItem>
              <SelectItem value="1/8">1/8</SelectItem>
              <SelectItem value="1/4">1/4</SelectItem>
              <SelectItem value="1/3">1/3</SelectItem>
              <SelectItem value="1/2">1/2</SelectItem>
              <SelectItem value="2/3">2/3</SelectItem>
              <SelectItem value="3/4">3/4</SelectItem>
              <SelectItem value="7/8">7/8</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          name={`measurement${ingredientCount}`}
          value={formData.ingredients[i]?.measurement || ""}
          onValueChange={(value) =>
            handleIngredientChange(i, "measurement", value)
          }>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Unit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Measurements</SelectLabel>
              <SelectItem value="grams">Grams</SelectItem>
              <SelectItem value="cups">Cups</SelectItem>
              <SelectItem value="tablespoons">Tablespoons</SelectItem>
              <SelectItem value="teaspoons">Teaspoons</SelectItem>
              <SelectItem value="ounces">Ounces</SelectItem>
              <SelectItem value="pounds">Pounds</SelectItem>
              <SelectItem value="pieces">Pieces</SelectItem>
              <SelectItem value="pinch">Pinch</SelectItem>
              <SelectItem value="to-taste">To taste</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {formData.ingredients.length > 1 && (
          <Button
            variant="destructive"
            size="sm"
            type="button"
            onClick={() => handleRemoveIngredient(i)}>
            Remove
          </Button>
        )}
      </div>
    );
  };

  const addInstruction = (i: number) => {
    const instructionCount = i + 1;

    return (
      <div key={i} className="mb-2 flex gap-2">
        <Textarea
          name={`instruction${instructionCount}`}
          placeholder={`Instruction ${instructionCount}`}
          value={formData.instructions[i] || ""}
          onChange={(e) => handleInstructionChange(i, e.target.value)}
          className="flex-1"
        />
        {formData.instructions.length > 1 && (
          <Button
            variant="destructive"
            size="sm"
            type="button"
            onClick={() => handleRemoveInstruction(i)}
            className="self-start">
            Remove
          </Button>
        )}
      </div>
    );
  };

  const handleAddIngredientClick = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [
        ...prev.ingredients,
        { name: "", quantityWhole: 0, quantityFraction: "", measurement: "" },
      ],
    }));
  };

  const handleAddInstructionClick = () => {
    setFormData((prev) => ({
      ...prev,
      instructions: [...prev.instructions, ""],
    }));
  };

  // Check if all instructions have content before allowing a new one
  const canAddInstruction = () => {
    return formData.instructions.every(
      (instruction) => instruction.trim().length > 0,
    );
  };

  // Check if all ingredients are filled before allowing a new one
  const canAddIngredient = () => {
    return formData.ingredients.every(
      (ingredient) =>
        ingredient.name.trim().length > 0 &&
        ingredient.measurement.trim().length > 0 &&
        (ingredient.quantityWhole > 0 ||
          ingredient.quantityFraction.length > 0),
    );
  };

  // Remove an instruction at a specific index
  const handleRemoveInstruction = (index: number) => {
    if (formData.instructions.length > 1) {
      setFormData((prev) => ({
        ...prev,
        instructions: prev.instructions.filter((_, i) => i !== index),
      }));
    }
  };

  // Remove an ingredient at a specific index
  const handleRemoveIngredient = (index: number) => {
    if (formData.ingredients.length > 1) {
      setFormData((prev) => ({
        ...prev,
        ingredients: prev.ingredients.filter((_, i) => i !== index),
      }));
    }
  };

  // Generate a unique variant ID
  const generateVariantId = (): string => {
    const variantCount = (recipe.variants?.length || 0) + 1;
    return `${recipe.id}-${variantCount}`;
  };

  // Check if form is valid for submission
  const isFormValid = (): boolean => {
    if (!formData.variantName.trim()) return false;
    if (!formData.notes.trim()) return false;

    const hasValidIngredient = formData.ingredients.some(
      (ingredient) =>
        ingredient.name.trim().length > 0 &&
        ingredient.measurement.trim().length > 0 &&
        (ingredient.quantityWhole > 0 ||
          ingredient.quantityFraction.length > 0),
    );
    if (!hasValidIngredient) return false;

    const hasValidInstruction = formData.instructions.some(
      (instruction) => instruction.trim().length > 0,
    );
    if (!hasValidInstruction) return false;

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.variantName.trim()) {
      alert("Variant name is required!");
      return;
    }

    if (!formData.notes.trim()) {
      alert("Please describe what makes this variant different!");
      return;
    }

    setIsSubmitting(true);

    try {
      const now = new Date();

      const newVariant: RecipeVariant = {
        id: generateVariantId(),
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
        ingredients: formData.ingredients.filter(
          (ing) =>
            ing.name.trim() &&
            ing.measurement &&
            (ing.quantityWhole > 0 || ing.quantityFraction),
        ),
        instructions: formData.instructions.filter((inst) => inst.trim()),
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
            {formData.ingredients.map((_, i) => addIngredient(i))}
            <Button
              variant="default"
              size="sm"
              type="button"
              onClick={handleAddIngredientClick}
              disabled={!canAddIngredient()}
              className="mt-2">
              Add another Ingredient
            </Button>
          </div>
        </fieldset>

        <fieldset className="border rounded-lg p-6">
          <legend className="text-xl font-semibold px-2">Instructions</legend>
          <p className="text-sm text-gray-600 mb-4 mt-2">
            Pre-filled with original recipe instructions. Edit, add, or remove
            as needed.
          </p>
          <div className="mt-4">
            {formData.instructions.map((_, i) => addInstruction(i))}
            <Button
              variant="default"
              size="sm"
              type="button"
              onClick={handleAddInstructionClick}
              disabled={!canAddInstruction()}
              className="mt-2">
              Add another Instruction
            </Button>
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
                  <Link
                    href={`/recipes/${recipe.id}?variant=${variant.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
