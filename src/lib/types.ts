// Type definitions for the application

export interface Ingredient {
  name: string;
  quantityWhole: number;
  quantityFraction: string;
  measurement: string;
}

export interface RecipeVariant {
  id: string;
  variantName: string;
  description?: string;
  parentRecipeId: string; // Reference to the original recipe
  createdBy: string;
  // Only include fields that are different from the parent recipe
  ingredients?: Ingredient[]; // If different from parent
  instructions?: string[]; // If different from parent
  preparationTime?: number;
  cookingTime?: number;
  servingSize?: number;
  recipeImage?: string;
  notes?: string; // What makes this variant unique
  createdAt: Date;
  updatedAt: Date;
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
  variants?: RecipeVariant[]; // Array of recipe variants
  createdAt: Date;
  updatedAt: Date;
}

export interface CookbookMember {
  userId: string;
  role: 'owner' | 'editor' | 'viewer';
  addedAt: Date;
}

export interface Cookbook {
  id: string;
  name: string;
  description: string;
  coverImage?: string; // URL or path to image
  recipes: Recipe[]; // Array of recipe IDs or full recipe objects
  createdBy: string; // User ID of the creator
  members: CookbookMember[]; // Array of members with their roles
  isPublic: boolean; // Whether the cookbook is publicly viewable
  isCollaborative: boolean; // Whether members can add/edit recipes
  tags?: string[]; // Categories for organization
  createdAt: Date;
  updatedAt: Date;
}

