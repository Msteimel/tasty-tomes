// Type definitions for the application

export interface Ingredient {
  name: string;
  quantityWhole: number;
  quantityFraction: string;
  measurement: string;
}

export interface Recipe {
  id: string;
  recipeName: string;
  recipeDescription: string;
  preparationTime: number; // in minutes
  cookingTime: number; // in minutes
  servingSize: number;
  cuisineType: string;
  originalAuthor?: string; // Attribution to original recipe creator (e.g., "Grandma Betty", "Chef Jacques")
  createdBy: string; // User who digitized/added the recipe to the system
  recipeImage?: string; // URL or path to image
  ingredients: Ingredient[];
  instructions: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Cookbook {
  id: string;
  name: string;
  description: string;
  coverImage?: string; // URL or path to image
  recipes: Recipe[]; // Array of recipe IDs or full recipe objects
  createdAt: Date;
  updatedAt: Date;
}
