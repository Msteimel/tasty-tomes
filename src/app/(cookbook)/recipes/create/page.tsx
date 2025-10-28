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

// Type definitions for our recipe data structure
interface Ingredient {
  name: string;
  quantityWhole: number;
  quantityFraction: string;
  measurement: string;
}

interface RecipeFormData {
  recipeName: string;
  recipeDescription: string;
  preparationTime: number;
  cookingTime: number;
  servingSize: number;
  cuisineType: string;
  originalAuthor: string;
  recipeImage?: File;
  ingredients: Ingredient[];
  instructions: string[];
}

export default function CreateRecipePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form data state
  const [formData, setFormData] = useState<RecipeFormData>({
    recipeName: "",
    recipeDescription: "",
    preparationTime: 0,
    cookingTime: 0,
    servingSize: 0,
    cuisineType: "",
    originalAuthor: "",
    ingredients: [
      { name: "", quantityWhole: 0, quantityFraction: "", measurement: "" },
    ],
    instructions: [""],
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

    // Function to add more ingredient input fields dynamically
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
    // Only allow removal if there's more than one instruction
    if (formData.instructions.length > 1) {
      setFormData((prev) => ({
        ...prev,
        instructions: prev.instructions.filter((_, i) => i !== index),
      }));
    }
  };

  // Remove an ingredient at a specific index
  const handleRemoveIngredient = (index: number) => {
    // Only allow removal if there's more than one ingredient
    if (formData.ingredients.length > 1) {
      setFormData((prev) => ({
        ...prev,
        ingredients: prev.ingredients.filter((_, i) => i !== index),
      }));
    }
  };

  // Helper function to convert fraction string to decimal
  const fractionToDecimal = (fraction: string): number => {
    if (!fraction) return 0;
    const parts = fraction.split("/");
    if (parts.length === 2) {
      return parseInt(parts[0]) / parseInt(parts[1]);
    }
    return 0;
  };

  // Helper function to get total quantity as decimal
  const getTotalQuantity = (ingredient: Ingredient): number => {
    return (
      ingredient.quantityWhole + fractionToDecimal(ingredient.quantityFraction)
    );
  };

  // Check if form is valid for submission
  const isFormValid = (): boolean => {
    // Recipe name is required
    if (!formData.recipeName.trim()) return false;

    // At least one complete ingredient required
    const hasValidIngredient = formData.ingredients.some(
      (ingredient) =>
        ingredient.name.trim().length > 0 &&
        ingredient.measurement.trim().length > 0 &&
        (ingredient.quantityWhole > 0 ||
          ingredient.quantityFraction.length > 0),
    );
    if (!hasValidIngredient) return false;

    // At least one instruction required
    const hasValidInstruction = formData.instructions.some(
      (instruction) => instruction.trim().length > 0,
    );
    if (!hasValidInstruction) return false;

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.recipeName.trim()) {
      alert("Recipe name is required!");
      return;
    }

    // Check if at least one ingredient is complete
    const hasValidIngredient = formData.ingredients.some(
      (ingredient) =>
        ingredient.name.trim().length > 0 &&
        ingredient.measurement.trim().length > 0 &&
        (ingredient.quantityWhole > 0 ||
          ingredient.quantityFraction.length > 0),
    );

    if (!hasValidIngredient) {
      alert("At least one complete ingredient is required!");
      return;
    }

    // Check if at least one instruction has content
    const hasValidInstruction = formData.instructions.some(
      (instruction) => instruction.trim().length > 0,
    );

    if (!hasValidInstruction) {
      alert("At least one instruction is required!");
      return;
    }

    // Set loading state
    setIsSubmitting(true);

    try {
      // You can use getTotalQuantity() when sending to database
      const formattedData = {
        ...formData,
        ingredients: formData.ingredients.map((ing) => ({
          ...ing,
          totalQuantity: getTotalQuantity(ing), // Computed decimal value
        })),
      };

      console.log("Recipe Form Data:", formattedData);

      // Simulate API call delay (remove this when you add real API)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Here you would typically send the data to your backend/database
      // Example: await createRecipe(formattedData);

      // Navigate to success page
      router.push("/recipes/create/success");
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
            Original Author:
            <Input
              type="text"
              name="originalAuthor"
              value={formData.originalAuthor}
              onChange={(e) =>
                handleInputChange("originalAuthor", e.target.value)
              }
            />
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
          {formData.ingredients.map((_, i) => addIngredient(i))}
          <Button
            variant="default"
            size="sm"
            type="button"
            onClick={handleAddIngredientClick}
            disabled={!canAddIngredient()}>
            Add another Ingredient
          </Button>
        </fieldset>

        <fieldset>
          <legend>Instructions</legend>
          {formData.instructions.map((_, i) => addInstruction(i))}

          <Button
            variant="default"
            size="sm"
            type="button"
            onClick={handleAddInstructionClick}
            disabled={!canAddInstruction()}>
            Add another Instruction
          </Button>
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
