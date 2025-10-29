# Recipe Form Utilities - Usage Guide

This guide explains how to use the shared recipe form utilities and components to ensure consistent behavior across all recipe and variant forms.

## Overview

We've created two files to centralize all recipe/variant form logic:

- **`/src/lib/recipeFormUtils.ts`** - Reusable hooks and validation functions
- **`/src/app/components/recipe/RecipeFormComponents.tsx`** - Shared UI components

## Benefits

✅ **Consistency** - All forms behave the same way
✅ **DRY** - No code duplication
✅ **Maintainability** - Fix bugs in one place
✅ **Type Safety** - Full TypeScript support
✅ **Validation** - Centralized validation logic

## How to Use

### 1. Import the Utilities

```typescript
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
```

### 2. Use the Hooks in Your Component

```typescript
export default function YourRecipeForm() {
  // Initialize with existing data or empty arrays
  const ingredientsManager = useIngredients(existingRecipe?.ingredients);
  const instructionsManager = useInstructions(existingRecipe?.instructions);

  // ... rest of your component
}
```

### 3. Use the Components in JSX

```tsx
{
  /* Ingredients Section */
}
<IngredientsList
  ingredients={ingredientsManager.ingredients}
  canAddMore={ingredientsManager.canAddIngredient()}
  onChange={ingredientsManager.handleIngredientChange}
  onRemove={ingredientsManager.removeIngredient}
  onAdd={ingredientsManager.addIngredient}
/>;

{
  /* Instructions Section */
}
<InstructionsList
  instructions={instructionsManager.instructions}
  canAddMore={instructionsManager.canAddInstruction()}
  onChange={ingredientsManager.handleInstructionChange}
  onRemove={instructionsManager.removeInstruction}
  onAdd={instructionsManager.addInstruction}
/>;
```

### 4. Validate Before Submission

```typescript
const isFormValid = (): boolean => {
  const validation = validateRecipeForm(
    {
      name: formData.recipeName,
      notes: formData.notes, // Optional for recipes
      hasValidIngredient: ingredientsManager.hasValidIngredient(),
      hasValidInstruction: instructionsManager.hasValidInstruction(),
    },
    {
      requireName: true,
      requireNotes: false, // Set to true for variants
      requireIngredients: true,
      requireInstructions: true,
    },
  );

  return validation.isValid;
};
```

### 5. Get Valid Data for Submission

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const newRecipe = {
    // ... other fields
    ingredients: ingredientsManager.getValidIngredients(),
    instructions: instructionsManager.getValidInstructions(),
  };

  // Submit to API
};
```

## Available Functions

### useIngredients Hook

```typescript
const {
  ingredients, // Current ingredients array
  setIngredients, // Directly set ingredients
  handleIngredientChange, // Update specific field
  addIngredient, // Add new empty ingredient
  removeIngredient, // Remove by index
  canAddIngredient, // Check if can add more
  hasValidIngredient, // Check if at least one valid
  getValidIngredients, // Get only complete ingredients
} = useIngredients(initialIngredients);
```

### useInstructions Hook

```typescript
const {
  instructions, // Current instructions array
  setInstructions, // Directly set instructions
  handleInstructionChange, // Update specific instruction
  addInstruction, // Add new empty instruction
  removeInstruction, // Remove by index
  canAddInstruction, // Check if can add more
  hasValidInstruction, // Check if at least one valid
  getValidInstructions, // Get only non-empty instructions
} = useInstructions(initialInstructions);
```

## Consistency Rules

All forms now follow these rules:

1. **Add Button Disabled**: Can't add more ingredients/instructions until all current ones are complete
2. **Minimum Items**: Must have at least 1 ingredient and 1 instruction
3. **Remove Button**: Only shows when there's more than 1 item
4. **Validation**: Same validation logic across all forms
5. **UI**: Consistent styling and layout

## Example: Converting an Existing Form

**Before:**

```typescript
// Lots of duplicate code in each form
const [ingredients, setIngredients] = useState([...]);
const handleIngredientChange = (index, field, value) => { /* ... */ };
const addIngredient = () => { /* ... */ };
// ... etc
```

**After:**

```typescript
// One line!
const ingredientsManager = useIngredients(recipe?.ingredients);
```

Then in JSX:

```tsx
<IngredientsList
  ingredients={ingredientsManager.ingredients}
  canAddMore={ingredientsManager.canAddIngredient()}
  onChange={ingredientsManager.handleIngredientChange}
  onRemove={ingredientsManager.removeIngredient}
  onAdd={ingredientsManager.addIngredient}
/>
```

## Files to Update

The following files should be refactored to use these utilities:

- [x] `/recipes/[id]/variant/[variantId]/edit/page.tsx` ✅ **DONE**
- [x] `/recipes/[id]/edit/page.tsx` ✅ **DONE**
- [x] `/recipes/create/page.tsx` ✅ **DONE**
- [x] `/recipes/[id]/variant/page.tsx` ✅ **DONE**

## Need Help?

Check the already refactored edit variant page as a reference:
`/src/app/(cookbook)/recipes/[id]/variant/[variantId]/edit/page.tsx`
