# Dummy Data Guide

This guide explains the dummy data setup for the Tasty Tomes recipe app.

## Files Created

### 1. `/src/lib/types.ts`
Contains TypeScript type definitions for:
- `Ingredient` - Individual recipe ingredient with quantity and measurement
- `Recipe` - Complete recipe with ingredients, instructions, metadata
- `Cookbook` - Collection of recipes

### 2. `/src/lib/dummyData.ts`
Contains:
- **5 Dummy Recipes:**
  1. Classic Spaghetti Carbonara (Italian)
  2. Chocolate Chip Cookies (American)
  3. Thai Green Curry (Thai)
  4. French Onion Soup (French)
  5. Chicken Tikka Masala (Indian)

- **4 Dummy Cookbooks:**
  1. Family Favorites
  2. International Cuisine
  3. Comfort Food Classics
  4. Quick Weeknight Dinners

- **Helper Functions:**
  - `getRecipeById(id)` - Get a single recipe
  - `getCookbookById(id)` - Get a single cookbook
  - `getRecipesByCookbookId(cookbookId)` - Get all recipes in a cookbook

## Updated Pages

### `/src/app/(cookbook)/cookbook/page.tsx`
Main cookbook page now displays:
- Grid of all cookbooks with cover images
- Grid of all recipes with recipe images
- Proper styling with hover effects
- Links to individual cookbook and recipe detail pages

### `/src/app/(cookbook)/recipes/[id]/page.tsx`
Recipe detail page now displays:
- Recipe image
- Full recipe information (prep time, cook time, servings)
- Ingredients list with proper formatting
- Step-by-step instructions
- Metadata (cuisine type, author, dates)
- Navigation buttons (Edit, Create Variant)

### `/src/app/(cookbook)/recipes/create/page.tsx`
Updated to use centralized `Ingredient` type from `/src/lib/types.ts`

## Next.js Configuration

Updated `next.config.ts` to allow external images from Unsplash:
```typescript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "images.unsplash.com",
    },
  ],
}
```

## How to Use

### Viewing Recipes
1. Navigate to `/cookbook` to see all cookbooks and recipes
2. Click on any recipe card to view full details at `/recipes/[id]`
3. Click on any cookbook card to view that cookbook (you'll need to create this page)

### Testing Recipe IDs
Valid recipe IDs for testing:
- `1` - Spaghetti Carbonara
- `2` - Chocolate Chip Cookies
- `3` - Thai Green Curry
- `4` - French Onion Soup
- `5` - Chicken Tikka Masala

Valid cookbook IDs for testing:
- `1` - Family Favorites
- `2` - International Cuisine
- `3` - Comfort Food Classics
- `4` - Quick Weeknight Dinners

### Adding More Dummy Data
Simply add new objects to the `dummyRecipes` or `dummyCookbooks` arrays in `/src/lib/dummyData.ts`.

## TODO: Pages to Create

1. **Cookbook Detail Page** (`/cookbook/[id]/page.tsx`)
   - Display cookbook info
   - Show all recipes in that cookbook
   - Allow adding/removing recipes

2. **Recipe Edit Page** (`/recipes/[id]/edit/page.tsx`)
   - Pre-populate form with existing recipe data
   - Allow editing and saving changes

3. **Recipe Variant Page** (`/recipes/[id]/variant/page.tsx`)
   - Clone existing recipe with modifications
   - Useful for recipe variations

4. **Cookbook Create Page** (`/cookbook/create/page.tsx`)
   - Form to create new cookbooks
   - Select recipes to include

## Future: Database Integration

When you're ready to add a database:
1. Replace dummy data imports with API calls or database queries
2. The type definitions in `/src/lib/types.ts` can be used for your database schema
3. Helper functions can be updated to query the database instead of the dummy data array
4. Consider adding user authentication and associating recipes/cookbooks with users
