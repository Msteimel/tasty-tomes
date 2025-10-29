/**
 * Shared hooks and utilities for recipe and variant forms
 * This ensures consistent behavior across create/edit pages
 */

import { useState } from "react";
import { Ingredient } from "@/lib/types";

// Type for form data with ingredients and instructions
export interface RecipeFormState {
  ingredients: Ingredient[];
  instructions: string[];
}

/**
 * Hook for managing ingredients in a recipe/variant form
 */
export function useIngredients(initialIngredients: Ingredient[] = []) {
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    initialIngredients.length > 0
      ? initialIngredients
      : [{ name: "", quantityWhole: 0, quantityFraction: "", measurement: "" }]
  );

  const handleIngredientChange = (
    index: number,
    field: keyof Ingredient,
    value: string | number
  ) => {
    setIngredients((prev) =>
      prev.map((ingredient, i) =>
        i === index ? { ...ingredient, [field]: value } : ingredient
      )
    );
  };

  const addIngredient = () => {
    setIngredients((prev) => [
      ...prev,
      { name: "", quantityWhole: 0, quantityFraction: "", measurement: "" },
    ]);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Check if all ingredients are complete (allows adding new ones)
  const canAddIngredient = () => {
    return ingredients.every(
      (ingredient) =>
        ingredient.name.trim().length > 0 &&
        ingredient.measurement.trim().length > 0 &&
        (ingredient.quantityWhole > 0 || ingredient.quantityFraction.length > 0)
    );
  };

  // Check if at least one complete ingredient exists (for validation)
  const hasValidIngredient = () => {
    return ingredients.some(
      (ingredient) =>
        ingredient.name.trim().length > 0 &&
        ingredient.measurement.trim().length > 0 &&
        (ingredient.quantityWhole > 0 || ingredient.quantityFraction.length > 0)
    );
  };

  // Get only complete ingredients (for submission)
  const getValidIngredients = () => {
    return ingredients.filter(
      (ing) =>
        ing.name.trim() &&
        ing.measurement &&
        (ing.quantityWhole > 0 || ing.quantityFraction)
    );
  };

  return {
    ingredients,
    setIngredients,
    handleIngredientChange,
    addIngredient,
    removeIngredient,
    canAddIngredient,
    hasValidIngredient,
    getValidIngredients,
  };
}

/**
 * Hook for managing instructions in a recipe/variant form
 */
export function useInstructions(initialInstructions: string[] = []) {
  const [instructions, setInstructions] = useState<string[]>(
    initialInstructions.length > 0 ? initialInstructions : [""]
  );

  const handleInstructionChange = (index: number, value: string) => {
    setInstructions((prev) =>
      prev.map((instruction, i) => (i === index ? value : instruction))
    );
  };

  const addInstruction = () => {
    setInstructions((prev) => [...prev, ""]);
  };

  const removeInstruction = (index: number) => {
    if (instructions.length > 1) {
      setInstructions((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Check if all instructions have content (allows adding new ones)
  const canAddInstruction = () => {
    return instructions.every((instruction) => instruction.trim().length > 0);
  };

  // Check if at least one instruction exists (for validation)
  const hasValidInstruction = () => {
    return instructions.some((instruction) => instruction.trim().length > 0);
  };

  // Get only non-empty instructions (for submission)
  const getValidInstructions = () => {
    return instructions.filter((inst) => inst.trim());
  };

  return {
    instructions,
    setInstructions,
    handleInstructionChange,
    addInstruction,
    removeInstruction,
    canAddInstruction,
    hasValidInstruction,
    getValidInstructions,
  };
}

/**
 * Generate a unique ID for new recipes/variants
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

/**
 * Generate a variant ID based on parent recipe ID
 */
export function generateVariantId(recipeId: string, existingVariantsCount: number): string {
  return `${recipeId}-${existingVariantsCount + 1}`;
}

/**
 * Validate recipe/variant form data
 */
export interface ValidationOptions {
  requireName?: boolean;
  requireNotes?: boolean;
  requireIngredients?: boolean;
  requireInstructions?: boolean;
}

export function validateRecipeForm(
  data: {
    name?: string;
    notes?: string;
    hasValidIngredient: boolean;
    hasValidInstruction: boolean;
  },
  options: ValidationOptions = {}
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  const {
    requireName = true,
    requireNotes = false,
    requireIngredients = true,
    requireInstructions = true,
  } = options;

  if (requireName && data.name && !data.name.trim()) {
    errors.push("Name is required");
  }

  if (requireNotes && data.notes && !data.notes.trim()) {
    errors.push("Notes are required");
  }

  if (requireIngredients && !data.hasValidIngredient) {
    errors.push("At least one complete ingredient is required");
  }

  if (requireInstructions && !data.hasValidInstruction) {
    errors.push("At least one instruction is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
