import { Recipe, Cookbook } from "./types";

// Dummy Recipes
export const dummyRecipes: Recipe[] = [
  {
    id: "1",
    recipeName: "Classic Spaghetti Carbonara",
    recipeDescription:
      "A traditional Italian pasta dish with eggs, cheese, pancetta, and pepper.",
    preparationTime: 10,
    cookingTime: 20,
    servingSize: 4,
    cuisineType: "italian",
    originalAuthor: "Nonna Maria",
    createdBy: "Current User",
    recipeImage: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800",
    ingredients: [
      { name: "Spaghetti", quantityWhole: 1, quantityFraction: "", measurement: "pounds" },
      { name: "Pancetta", quantityWhole: 6, quantityFraction: "", measurement: "ounces" },
      { name: "Eggs", quantityWhole: 4, quantityFraction: "", measurement: "pieces" },
      { name: "Parmesan Cheese (grated)", quantityWhole: 1, quantityFraction: "", measurement: "cups" },
      { name: "Black Pepper", quantityWhole: 0, quantityFraction: "", measurement: "to-taste" },
      { name: "Salt", quantityWhole: 0, quantityFraction: "", measurement: "to-taste" },
    ],
    instructions: [
      "Bring a large pot of salted water to boil. Cook spaghetti according to package directions until al dente.",
      "While pasta cooks, dice the pancetta into small cubes and cook in a large skillet over medium heat until crispy.",
      "In a bowl, whisk together eggs and grated Parmesan cheese.",
      "Reserve 1 cup of pasta water, then drain the pasta.",
      "Remove the skillet from heat. Add the hot pasta to the pancetta and toss to combine.",
      "Quickly stir in the egg and cheese mixture, adding reserved pasta water as needed to create a creamy sauce.",
      "Season generously with black pepper and serve immediately.",
    ],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    recipeName: "Chocolate Chip Cookies",
    recipeDescription:
      "Soft and chewy chocolate chip cookies with the perfect balance of crispy edges and gooey centers.",
    preparationTime: 15,
    cookingTime: 12,
    servingSize: 24,
    cuisineType: "american",
    originalAuthor: "Grandma Betty",
    createdBy: "Current User",
    recipeImage: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800",
    ingredients: [
      { name: "All-purpose flour", quantityWhole: 2, quantityFraction: "1/4", measurement: "cups" },
      { name: "Baking soda", quantityWhole: 1, quantityFraction: "", measurement: "teaspoons" },
      { name: "Salt", quantityWhole: 1, quantityFraction: "", measurement: "teaspoons" },
      { name: "Butter (softened)", quantityWhole: 1, quantityFraction: "", measurement: "cups" },
      { name: "Granulated sugar", quantityWhole: 0, quantityFraction: "3/4", measurement: "cups" },
      { name: "Brown sugar (packed)", quantityWhole: 0, quantityFraction: "3/4", measurement: "cups" },
      { name: "Eggs", quantityWhole: 2, quantityFraction: "", measurement: "pieces" },
      { name: "Vanilla extract", quantityWhole: 2, quantityFraction: "", measurement: "teaspoons" },
      { name: "Chocolate chips", quantityWhole: 2, quantityFraction: "", measurement: "cups" },
    ],
    instructions: [
      "Preheat oven to 375°F (190°C).",
      "In a small bowl, combine flour, baking soda, and salt. Set aside.",
      "In a large bowl, beat softened butter with both sugars until creamy.",
      "Add eggs and vanilla extract to the butter mixture and beat well.",
      "Gradually blend in the flour mixture.",
      "Stir in chocolate chips.",
      "Drop rounded tablespoons of dough onto ungreased cookie sheets.",
      "Bake for 9-11 minutes or until golden brown.",
      "Cool on baking sheet for 2 minutes, then remove to wire rack.",
    ],
    createdAt: new Date("2024-02-20"),
    updatedAt: new Date("2024-02-20"),
  },
  {
    id: "3",
    recipeName: "Thai Green Curry",
    recipeDescription:
      "A fragrant and spicy Thai curry with coconut milk, vegetables, and your choice of protein.",
    preparationTime: 20,
    cookingTime: 25,
    servingSize: 4,
    cuisineType: "thai",
    originalAuthor: "Chef Somchai",
    createdBy: "Current User",
    recipeImage: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800",
    ingredients: [
      { name: "Green curry paste", quantityWhole: 3, quantityFraction: "", measurement: "tablespoons" },
      { name: "Coconut milk", quantityWhole: 14, quantityFraction: "", measurement: "ounces" },
      { name: "Chicken breast (sliced)", quantityWhole: 1, quantityFraction: "", measurement: "pounds" },
      { name: "Bell pepper (sliced)", quantityWhole: 1, quantityFraction: "", measurement: "pieces" },
      { name: "Bamboo shoots", quantityWhole: 1, quantityFraction: "", measurement: "cups" },
      { name: "Thai basil", quantityWhole: 0, quantityFraction: "1/2", measurement: "cups" },
      { name: "Fish sauce", quantityWhole: 2, quantityFraction: "", measurement: "tablespoons" },
      { name: "Palm sugar", quantityWhole: 1, quantityFraction: "", measurement: "tablespoons" },
      { name: "Vegetable oil", quantityWhole: 2, quantityFraction: "", measurement: "tablespoons" },
    ],
    instructions: [
      "Heat oil in a large pan or wok over medium-high heat.",
      "Add green curry paste and fry for 1-2 minutes until fragrant.",
      "Pour in half of the coconut milk and stir to combine with the paste.",
      "Add the sliced chicken and cook until it starts to turn white.",
      "Pour in the remaining coconut milk and bring to a simmer.",
      "Add bell pepper and bamboo shoots. Simmer for 10-15 minutes.",
      "Season with fish sauce and palm sugar to taste.",
      "Stir in Thai basil just before serving.",
      "Serve hot over jasmine rice.",
    ],
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-03-10"),
  },
  {
    id: "4",
    recipeName: "French Onion Soup",
    recipeDescription:
      "A classic French soup with caramelized onions, rich beef broth, and melted Gruyère cheese.",
    preparationTime: 15,
    cookingTime: 90,
    servingSize: 6,
    cuisineType: "french",
    originalAuthor: "Chef Pierre",
    createdBy: "Current User",
    recipeImage: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800",
    ingredients: [
      { name: "Yellow onions (sliced)", quantityWhole: 6, quantityFraction: "", measurement: "pieces" },
      { name: "Butter", quantityWhole: 4, quantityFraction: "", measurement: "tablespoons" },
      { name: "Beef broth", quantityWhole: 8, quantityFraction: "", measurement: "cups" },
      { name: "Dry white wine", quantityWhole: 1, quantityFraction: "1/2", measurement: "cups" },
      { name: "Bay leaves", quantityWhole: 2, quantityFraction: "", measurement: "pieces" },
      { name: "Fresh thyme", quantityWhole: 4, quantityFraction: "", measurement: "pieces" },
      { name: "French bread (sliced)", quantityWhole: 6, quantityFraction: "", measurement: "pieces" },
      { name: "Gruyère cheese (grated)", quantityWhole: 2, quantityFraction: "", measurement: "cups" },
      { name: "Salt", quantityWhole: 0, quantityFraction: "", measurement: "to-taste" },
      { name: "Black pepper", quantityWhole: 0, quantityFraction: "", measurement: "to-taste" },
    ],
    instructions: [
      "Melt butter in a large pot over medium heat.",
      "Add sliced onions and cook, stirring frequently, for 45-60 minutes until deeply caramelized.",
      "Add white wine and stir, scraping up any browned bits from the bottom of the pot.",
      "Add beef broth, bay leaves, and thyme sprigs. Bring to a boil.",
      "Reduce heat and simmer for 30 minutes. Season with salt and pepper.",
      "Meanwhile, toast bread slices until golden and crispy.",
      "Preheat broiler. Ladle soup into oven-safe bowls.",
      "Top each bowl with a slice of toasted bread and generous amount of grated Gruyère.",
      "Place bowls on a baking sheet and broil until cheese is melted and bubbly.",
      "Serve immediately, being careful as bowls will be very hot.",
    ],
    createdAt: new Date("2024-04-05"),
    updatedAt: new Date("2024-04-05"),
  },
  {
    id: "5",
    recipeName: "Chicken Tikka Masala",
    recipeDescription:
      "Tender chicken pieces in a creamy, spiced tomato sauce. A beloved Indian-British fusion dish.",
    preparationTime: 30,
    cookingTime: 40,
    servingSize: 6,
    cuisineType: "indian",
    originalAuthor: "Chef Rajesh",
    createdBy: "Current User",
    recipeImage: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800",
    ingredients: [
      { name: "Chicken breast (cubed)", quantityWhole: 2, quantityFraction: "", measurement: "pounds" },
      { name: "Plain yogurt", quantityWhole: 1, quantityFraction: "", measurement: "cups" },
      { name: "Lemon juice", quantityWhole: 2, quantityFraction: "", measurement: "tablespoons" },
      { name: "Garam masala", quantityWhole: 2, quantityFraction: "", measurement: "tablespoons" },
      { name: "Ground cumin", quantityWhole: 2, quantityFraction: "", measurement: "teaspoons" },
      { name: "Tomato sauce", quantityWhole: 2, quantityFraction: "", measurement: "cups" },
      { name: "Heavy cream", quantityWhole: 1, quantityFraction: "", measurement: "cups" },
      { name: "Garlic (minced)", quantityWhole: 4, quantityFraction: "", measurement: "pieces" },
      { name: "Ginger (grated)", quantityWhole: 2, quantityFraction: "", measurement: "tablespoons" },
      { name: "Butter", quantityWhole: 4, quantityFraction: "", measurement: "tablespoons" },
    ],
    instructions: [
      "Mix chicken with yogurt, lemon juice, 1 tbsp garam masala, and cumin. Marinate for at least 1 hour.",
      "Preheat oven to 450°F. Thread chicken onto skewers and bake for 15-20 minutes.",
      "Meanwhile, melt butter in a large pan over medium heat.",
      "Add garlic and ginger, cook for 1 minute until fragrant.",
      "Add remaining garam masala and cook for another minute.",
      "Pour in tomato sauce and bring to a simmer. Cook for 10 minutes.",
      "Stir in heavy cream and simmer for another 5 minutes.",
      "Add the cooked chicken pieces to the sauce.",
      "Simmer together for 5-10 minutes to allow flavors to meld.",
      "Serve hot with basmati rice and naan bread.",
    ],
    createdAt: new Date("2024-05-12"),
    updatedAt: new Date("2024-05-12"),
  },
];

// Dummy Cookbooks
export const dummyCookbooks: Cookbook[] = [
  {
    id: "1",
    name: "Family Favorites",
    description:
      "A collection of beloved recipes passed down through generations, perfect for bringing the family together.",
    coverImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800",
    recipes: [dummyRecipes[0], dummyRecipes[1]], // Carbonara & Cookies
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-02-20"),
  },
  {
    id: "2",
    name: "International Cuisine",
    description:
      "Explore flavors from around the world with this diverse collection of international recipes.",
    coverImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    recipes: [dummyRecipes[0], dummyRecipes[2], dummyRecipes[3], dummyRecipes[4]], // Italian, Thai, French, Indian
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-05-12"),
  },
  {
    id: "3",
    name: "Comfort Food Classics",
    description:
      "Warm, hearty dishes that bring comfort and joy. Perfect for cozy evenings and cold weather.",
    coverImage: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800",
    recipes: [dummyRecipes[0], dummyRecipes[3]], // Carbonara & French Onion Soup
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-04-05"),
  },
  {
    id: "4",
    name: "Quick Weeknight Dinners",
    description:
      "Delicious meals that can be prepared in 30 minutes or less, perfect for busy weeknights.",
    coverImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
    recipes: [dummyRecipes[2]], // Thai Green Curry
    createdAt: new Date("2024-04-15"),
    updatedAt: new Date("2024-04-15"),
  },
];

// Helper function to get a recipe by ID
export function getRecipeById(id: string): Recipe | undefined {
  return dummyRecipes.find((recipe) => recipe.id === id);
}

// Helper function to get a cookbook by ID
export function getCookbookById(id: string): Cookbook | undefined {
  return dummyCookbooks.find((cookbook) => cookbook.id === id);
}

// Helper function to get all recipes for a cookbook
export function getRecipesByCookbookId(cookbookId: string): Recipe[] {
  const cookbook = getCookbookById(cookbookId);
  return cookbook?.recipes || [];
}
