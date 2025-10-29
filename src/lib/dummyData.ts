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
    recipeImage:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800",
    ingredients: [
      {
        name: "Spaghetti",
        quantityWhole: 1,
        quantityFraction: "",
        measurement: "pounds",
      },
      {
        name: "Pancetta",
        quantityWhole: 6,
        quantityFraction: "",
        measurement: "ounces",
      },
      {
        name: "Eggs",
        quantityWhole: 4,
        quantityFraction: "",
        measurement: "pieces",
      },
      {
        name: "Parmesan Cheese (grated)",
        quantityWhole: 1,
        quantityFraction: "",
        measurement: "cups",
      },
      {
        name: "Black Pepper",
        quantityWhole: 0,
        quantityFraction: "",
        measurement: "to-taste",
      },
      {
        name: "Salt",
        quantityWhole: 0,
        quantityFraction: "",
        measurement: "to-taste",
      },
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
    recipeImage:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800",
    ingredients: [
      {
        name: "All-purpose flour",
        quantityWhole: 2,
        quantityFraction: "1/4",
        measurement: "cups",
      },
      {
        name: "Baking soda",
        quantityWhole: 1,
        quantityFraction: "",
        measurement: "teaspoons",
      },
      {
        name: "Salt",
        quantityWhole: 1,
        quantityFraction: "",
        measurement: "teaspoons",
      },
      {
        name: "Butter (softened)",
        quantityWhole: 1,
        quantityFraction: "",
        measurement: "cups",
      },
      {
        name: "Granulated sugar",
        quantityWhole: 0,
        quantityFraction: "3/4",
        measurement: "cups",
      },
      {
        name: "Brown sugar (packed)",
        quantityWhole: 0,
        quantityFraction: "3/4",
        measurement: "cups",
      },
      {
        name: "Eggs",
        quantityWhole: 2,
        quantityFraction: "",
        measurement: "pieces",
      },
      {
        name: "Vanilla extract",
        quantityWhole: 2,
        quantityFraction: "",
        measurement: "teaspoons",
      },
      {
        name: "Chocolate chips",
        quantityWhole: 2,
        quantityFraction: "",
        measurement: "cups",
      },
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
    variants: [
      {
        id: "2-1",
        variantName: "Double Chocolate Cookies",
        description: "Extra chocolatey version with cocoa powder and dark chocolate chunks.",
        parentRecipeId: "2",
        createdBy: "Current User",
        ingredients: [
          {
            name: "All-purpose flour",
            quantityWhole: 2,
            quantityFraction: "",
            measurement: "cups",
          },
          {
            name: "Cocoa powder",
            quantityWhole: 0,
            quantityFraction: "1/4",
            measurement: "cups",
          },
          {
            name: "Baking soda",
            quantityWhole: 1,
            quantityFraction: "",
            measurement: "teaspoons",
          },
          {
            name: "Salt",
            quantityWhole: 1,
            quantityFraction: "",
            measurement: "teaspoons",
          },
          {
            name: "Butter (softened)",
            quantityWhole: 1,
            quantityFraction: "",
            measurement: "cups",
          },
          {
            name: "Granulated sugar",
            quantityWhole: 0,
            quantityFraction: "3/4",
            measurement: "cups",
          },
          {
            name: "Brown sugar (packed)",
            quantityWhole: 0,
            quantityFraction: "3/4",
            measurement: "cups",
          },
          {
            name: "Eggs",
            quantityWhole: 2,
            quantityFraction: "",
            measurement: "pieces",
          },
          {
            name: "Vanilla extract",
            quantityWhole: 2,
            quantityFraction: "",
            measurement: "teaspoons",
          },
          {
            name: "Dark chocolate chunks",
            quantityWhole: 2,
            quantityFraction: "",
            measurement: "cups",
          },
        ],
        notes: "Uses cocoa powder in the dough and dark chocolate chunks instead of chips for an intense chocolate flavor.",
        createdAt: new Date("2024-03-15"),
        updatedAt: new Date("2024-03-15"),
      },
      {
        id: "2-2",
        variantName: "Oatmeal Chocolate Chip Cookies",
        description: "Heartier version with rolled oats for extra texture.",
        parentRecipeId: "2",
        createdBy: "Sarah Johnson",
        ingredients: [
          {
            name: "All-purpose flour",
            quantityWhole: 1,
            quantityFraction: "1/2",
            measurement: "cups",
          },
          {
            name: "Rolled oats",
            quantityWhole: 1,
            quantityFraction: "1/2",
            measurement: "cups",
          },
          {
            name: "Baking soda",
            quantityWhole: 1,
            quantityFraction: "",
            measurement: "teaspoons",
          },
          {
            name: "Cinnamon",
            quantityWhole: 1,
            quantityFraction: "",
            measurement: "teaspoons",
          },
          {
            name: "Salt",
            quantityWhole: 1,
            quantityFraction: "",
            measurement: "teaspoons",
          },
          {
            name: "Butter (softened)",
            quantityWhole: 1,
            quantityFraction: "",
            measurement: "cups",
          },
          {
            name: "Granulated sugar",
            quantityWhole: 0,
            quantityFraction: "3/4",
            measurement: "cups",
          },
          {
            name: "Brown sugar (packed)",
            quantityWhole: 0,
            quantityFraction: "3/4",
            measurement: "cups",
          },
          {
            name: "Eggs",
            quantityWhole: 2,
            quantityFraction: "",
            measurement: "pieces",
          },
          {
            name: "Vanilla extract",
            quantityWhole: 2,
            quantityFraction: "",
            measurement: "teaspoons",
          },
          {
            name: "Chocolate chips",
            quantityWhole: 2,
            quantityFraction: "",
            measurement: "cups",
          },
        ],
        instructions: [
          "Preheat oven to 375°F (190°C).",
          "In a small bowl, combine flour, oats, baking soda, cinnamon, and salt. Set aside.",
          "In a large bowl, beat softened butter with both sugars until creamy.",
          "Add eggs and vanilla extract to the butter mixture and beat well.",
          "Gradually blend in the flour and oat mixture.",
          "Stir in chocolate chips.",
          "Drop rounded tablespoons of dough onto ungreased cookie sheets.",
          "Bake for 10-12 minutes or until golden brown.",
          "Cool on baking sheet for 2 minutes, then remove to wire rack.",
        ],
        notes: "Replaces some flour with oats and adds cinnamon for a heartier, spiced cookie.",
        createdAt: new Date("2024-04-10"),
        updatedAt: new Date("2024-04-10"),
      },
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
    recipeImage:
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800",
    ingredients: [
      {
        name: "Green curry paste",
        quantityWhole: 3,
        quantityFraction: "",
        measurement: "tablespoons",
      },
      {
        name: "Coconut milk",
        quantityWhole: 14,
        quantityFraction: "",
        measurement: "ounces",
      },
      {
        name: "Chicken breast (sliced)",
        quantityWhole: 1,
        quantityFraction: "",
        measurement: "pounds",
      },
      {
        name: "Bell pepper (sliced)",
        quantityWhole: 1,
        quantityFraction: "",
        measurement: "pieces",
      },
      {
        name: "Bamboo shoots",
        quantityWhole: 1,
        quantityFraction: "",
        measurement: "cups",
      },
      {
        name: "Thai basil",
        quantityWhole: 0,
        quantityFraction: "1/2",
        measurement: "cups",
      },
      {
        name: "Fish sauce",
        quantityWhole: 2,
        quantityFraction: "",
        measurement: "tablespoons",
      },
      {
        name: "Palm sugar",
        quantityWhole: 1,
        quantityFraction: "",
        measurement: "tablespoons",
      },
      {
        name: "Vegetable oil",
        quantityWhole: 2,
        quantityFraction: "",
        measurement: "tablespoons",
      },
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
    recipeImage:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800",
    ingredients: [
      {
        name: "Yellow onions (sliced)",
        quantityWhole: 6,
        quantityFraction: "",
        measurement: "pieces",
      },
      {
        name: "Butter",
        quantityWhole: 4,
        quantityFraction: "",
        measurement: "tablespoons",
      },
      {
        name: "Beef broth",
        quantityWhole: 8,
        quantityFraction: "",
        measurement: "cups",
      },
      {
        name: "Dry white wine",
        quantityWhole: 1,
        quantityFraction: "1/2",
        measurement: "cups",
      },
      {
        name: "Bay leaves",
        quantityWhole: 2,
        quantityFraction: "",
        measurement: "pieces",
      },
      {
        name: "Fresh thyme",
        quantityWhole: 4,
        quantityFraction: "",
        measurement: "pieces",
      },
      {
        name: "French bread (sliced)",
        quantityWhole: 6,
        quantityFraction: "",
        measurement: "pieces",
      },
      {
        name: "Gruyère cheese (grated)",
        quantityWhole: 2,
        quantityFraction: "",
        measurement: "cups",
      },
      {
        name: "Salt",
        quantityWhole: 0,
        quantityFraction: "",
        measurement: "to-taste",
      },
      {
        name: "Black pepper",
        quantityWhole: 0,
        quantityFraction: "",
        measurement: "to-taste",
      },
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
    recipeImage:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800",
    ingredients: [
      {
        name: "Chicken breast (cubed)",
        quantityWhole: 2,
        quantityFraction: "",
        measurement: "pounds",
      },
      {
        name: "Plain yogurt",
        quantityWhole: 1,
        quantityFraction: "",
        measurement: "cups",
      },
      {
        name: "Lemon juice",
        quantityWhole: 2,
        quantityFraction: "",
        measurement: "tablespoons",
      },
      {
        name: "Garam masala",
        quantityWhole: 2,
        quantityFraction: "",
        measurement: "tablespoons",
      },
      {
        name: "Ground cumin",
        quantityWhole: 2,
        quantityFraction: "",
        measurement: "teaspoons",
      },
      {
        name: "Tomato sauce",
        quantityWhole: 2,
        quantityFraction: "",
        measurement: "cups",
      },
      {
        name: "Heavy cream",
        quantityWhole: 1,
        quantityFraction: "",
        measurement: "cups",
      },
      {
        name: "Garlic (minced)",
        quantityWhole: 4,
        quantityFraction: "",
        measurement: "pieces",
      },
      {
        name: "Ginger (grated)",
        quantityWhole: 2,
        quantityFraction: "",
        measurement: "tablespoons",
      },
      {
        name: "Butter",
        quantityWhole: 4,
        quantityFraction: "",
        measurement: "tablespoons",
      },
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
  {
    id: "6",
    recipeName: "Homemade Mac and Cheese",
    recipeDescription:
      "Creamy, indulgent macaroni and cheese made from scratch with a crispy breadcrumb topping. The ultimate comfort food.",
    preparationTime: 15,
    cookingTime: 30,
    servingSize: 8,
    cuisineType: "american",
    originalAuthor: "Aunt Carol",
    createdBy: "Sarah Johnson",
    recipeImage:
      "https://images.unsplash.com/photo-1559561853-08451507cbe7?w=800",
    ingredients: [
      {
        name: "Elbow macaroni",
        quantityWhole: 1,
        quantityFraction: "",
        measurement: "pounds",
      },
      {
        name: "Butter",
        quantityWhole: 6,
        quantityFraction: "",
        measurement: "tablespoons",
      },
      {
        name: "All-purpose flour",
        quantityWhole: 0,
        quantityFraction: "1/4",
        measurement: "cups",
      },
      {
        name: "Whole milk",
        quantityWhole: 3,
        quantityFraction: "",
        measurement: "cups",
      },
      {
        name: "Sharp cheddar cheese (shredded)",
        quantityWhole: 4,
        quantityFraction: "",
        measurement: "cups",
      },
      {
        name: "Gruyère cheese (shredded)",
        quantityWhole: 1,
        quantityFraction: "",
        measurement: "cups",
      },
      {
        name: "Salt",
        quantityWhole: 1,
        quantityFraction: "",
        measurement: "teaspoons",
      },
      {
        name: "Black pepper",
        quantityWhole: 0,
        quantityFraction: "1/2",
        measurement: "teaspoons",
      },
      {
        name: "Paprika",
        quantityWhole: 0,
        quantityFraction: "1/4",
        measurement: "teaspoons",
      },
      {
        name: "Breadcrumbs",
        quantityWhole: 1,
        quantityFraction: "",
        measurement: "cups",
      },
    ],
    instructions: [
      "Preheat oven to 350°F (175°C). Grease a 9x13 inch baking dish.",
      "Cook macaroni in salted boiling water according to package directions until al dente. Drain and set aside.",
      "In a large saucepan, melt 4 tablespoons butter over medium heat.",
      "Whisk in flour and cook for 1-2 minutes, stirring constantly, to create a roux.",
      "Gradually pour in milk while whisking continuously to prevent lumps.",
      "Cook, stirring frequently, until sauce thickens, about 5-7 minutes.",
      "Remove from heat and stir in cheddar and Gruyère cheese until melted and smooth.",
      "Season with salt, pepper, and paprika. Taste and adjust seasoning as needed.",
      "Add cooked macaroni to the cheese sauce and stir to coat evenly.",
      "Pour mixture into prepared baking dish.",
      "Melt remaining 2 tablespoons butter and mix with breadcrumbs. Sprinkle over the top.",
      "Bake for 25-30 minutes until bubbly and golden brown on top.",
      "Let rest for 5 minutes before serving.",
    ],
    createdAt: new Date("2024-06-08"),
    updatedAt: new Date("2024-06-08"),
  },
  {
    id: "7",
    recipeName: "Korean Beef Bulgogi",
    recipeDescription:
      "Tender, marinated beef with a sweet and savory flavor profile. A popular Korean dish that's perfect for grilling or pan-frying.",
    preparationTime: 20,
    cookingTime: 15,
    servingSize: 4,
    cuisineType: "korean",
    originalAuthor: "Chef Min-ji",
    createdBy: "Sarah Johnson",
    recipeImage:
      "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800",
    ingredients: [
      {
        name: "Ribeye steak (thinly sliced)",
        quantityWhole: 1,
        quantityFraction: "1/2",
        measurement: "pounds",
      },
      {
        name: "Soy sauce",
        quantityWhole: 0,
        quantityFraction: "1/3",
        measurement: "cups",
      },
      {
        name: "Brown sugar",
        quantityWhole: 3,
        quantityFraction: "",
        measurement: "tablespoons",
      },
      {
        name: "Sesame oil",
        quantityWhole: 2,
        quantityFraction: "",
        measurement: "tablespoons",
      },
      {
        name: "Garlic (minced)",
        quantityWhole: 5,
        quantityFraction: "",
        measurement: "pieces",
      },
      {
        name: "Fresh ginger (grated)",
        quantityWhole: 1,
        quantityFraction: "",
        measurement: "tablespoons",
      },
      {
        name: "Asian pear (grated)",
        quantityWhole: 0,
        quantityFraction: "1/2",
        measurement: "pieces",
      },
      {
        name: "Green onions (chopped)",
        quantityWhole: 4,
        quantityFraction: "",
        measurement: "pieces",
      },
      {
        name: "Sesame seeds",
        quantityWhole: 2,
        quantityFraction: "",
        measurement: "teaspoons",
      },
      {
        name: "Black pepper",
        quantityWhole: 0,
        quantityFraction: "1/4",
        measurement: "teaspoons",
      },
      {
        name: "Vegetable oil",
        quantityWhole: 1,
        quantityFraction: "",
        measurement: "tablespoons",
      },
    ],
    instructions: [
      "In a large bowl, combine soy sauce, brown sugar, sesame oil, garlic, ginger, and grated pear.",
      "Add sliced beef to the marinade and mix well to coat all pieces.",
      "Cover and refrigerate for at least 2 hours, or overnight for best results.",
      "When ready to cook, remove beef from refrigerator and let sit at room temperature for 15 minutes.",
      "Heat vegetable oil in a large skillet or grill pan over high heat.",
      "Working in batches to avoid overcrowding, cook beef for 2-3 minutes per side until caramelized.",
      "Transfer cooked beef to a serving plate.",
      "Garnish with chopped green onions, sesame seeds, and black pepper.",
      "Serve hot with steamed rice, lettuce wraps, and kimchi.",
    ],
    createdAt: new Date("2024-07-15"),
    updatedAt: new Date("2024-07-15"),
  },
  {
    id: "8",
    recipeName: "Lemon Bars",
    recipeDescription:
      "Tangy, sweet lemon bars with a buttery shortbread crust and smooth lemon custard filling, dusted with powdered sugar.",
    preparationTime: 20,
    cookingTime: 50,
    servingSize: 16,
    cuisineType: "american",
    originalAuthor: "Mom's Recipe Box",
    createdBy: "Sarah Johnson",
    recipeImage:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800",
    ingredients: [
      {
        name: "All-purpose flour",
        quantityWhole: 2,
        quantityFraction: "",
        measurement: "cups",
      },
      {
        name: "Butter (softened)",
        quantityWhole: 1,
        quantityFraction: "",
        measurement: "cups",
      },
      {
        name: "Powdered sugar",
        quantityWhole: 0,
        quantityFraction: "1/2",
        measurement: "cups",
      },
      {
        name: "Eggs",
        quantityWhole: 4,
        quantityFraction: "",
        measurement: "pieces",
      },
      {
        name: "Granulated sugar",
        quantityWhole: 2,
        quantityFraction: "",
        measurement: "cups",
      },
      {
        name: "Fresh lemon juice",
        quantityWhole: 0,
        quantityFraction: "2/3",
        measurement: "cups",
      },
      {
        name: "Lemon zest",
        quantityWhole: 2,
        quantityFraction: "",
        measurement: "tablespoons",
      },
      {
        name: "Baking powder",
        quantityWhole: 0,
        quantityFraction: "1/4",
        measurement: "teaspoons",
      },
      {
        name: "Salt",
        quantityWhole: 0,
        quantityFraction: "1/4",
        measurement: "teaspoons",
      },
      {
        name: "Powdered sugar (for dusting)",
        quantityWhole: 0,
        quantityFraction: "",
        measurement: "to-taste",
      },
    ],
    instructions: [
      "Preheat oven to 350°F (175°C). Line a 9x13 inch baking pan with parchment paper.",
      "For the crust: Mix 1 3/4 cups flour, softened butter, and 1/2 cup powdered sugar until combined.",
      "Press mixture evenly into the bottom of prepared pan.",
      "Bake crust for 18-20 minutes until lightly golden. Remove from oven.",
      "For the filling: In a bowl, whisk together eggs, granulated sugar, lemon juice, and lemon zest.",
      "In a separate small bowl, mix remaining 1/4 cup flour, baking powder, and salt.",
      "Add dry ingredients to the lemon mixture and whisk until smooth.",
      "Pour lemon filling over the warm crust.",
      "Bake for 25-30 minutes until filling is set and edges are lightly golden.",
      "Allow to cool completely at room temperature, then refrigerate for at least 2 hours.",
      "Cut into squares and dust generously with powdered sugar before serving.",
      "Store covered in the refrigerator for up to 5 days.",
    ],
    createdAt: new Date("2024-08-20"),
    updatedAt: new Date("2024-08-20"),
  },
];

// Dummy Cookbooks
export const dummyCookbooks: Cookbook[] = [
  {
    id: "1",
    name: "Family Favorites",
    description:
      "A collection of beloved recipes passed down through generations, perfect for bringing the family together.",
    coverImage:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800",
    recipes: [
      dummyRecipes[0],
      dummyRecipes[1],
      dummyRecipes[5],
      dummyRecipes[7],
    ], // Carbonara, Cookies, Mac and Cheese, Lemon Bars
    createdBy: "Current User",
    members: [
      { userId: "Current User", role: "owner", addedAt: new Date("2024-01-01") },
    ],
    isPublic: false,
    isCollaborative: false,
    tags: ["family", "comfort-food", "desserts"],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-08-20"),
  },
  {
    id: "2",
    name: "International Cuisine",
    description:
      "Explore flavors from around the world with this diverse collection of international recipes.",
    coverImage:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    recipes: [
      dummyRecipes[0],
      dummyRecipes[2],
      dummyRecipes[3],
      dummyRecipes[4],
      dummyRecipes[6],
    ], // Italian, Thai, French, Indian, Korean
    createdBy: "Current User",
    members: [
      { userId: "Current User", role: "owner", addedAt: new Date("2024-02-01") },
      { userId: "Sarah Johnson", role: "editor", addedAt: new Date("2024-03-15") },
    ],
    isPublic: true,
    isCollaborative: true,
    tags: ["international", "asian", "european"],
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-07-15"),
  },
  {
    id: "3",
    name: "Comfort Food Classics",
    description:
      "Warm, hearty dishes that bring comfort and joy. Perfect for cozy evenings and cold weather.",
    coverImage:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=800",
    recipes: [dummyRecipes[0], dummyRecipes[3], dummyRecipes[5]], // Carbonara, French Onion Soup, Mac and Cheese
    createdBy: "Current User",
    members: [
      { userId: "Current User", role: "owner", addedAt: new Date("2024-03-01") },
    ],
    isPublic: false,
    isCollaborative: false,
    tags: ["comfort-food", "winter", "hearty"],
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-06-08"),
  },
  {
    id: "4",
    name: "Quick Weeknight Dinners",
    description:
      "Delicious meals that can be prepared in 30 minutes or less, perfect for busy weeknights.",
    coverImage:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
    recipes: [dummyRecipes[2], dummyRecipes[6]], // Thai Green Curry, Korean Beef Bulgogi
    createdBy: "Current User",
    members: [
      { userId: "Current User", role: "owner", addedAt: new Date("2024-04-15") },
    ],
    isPublic: false,
    isCollaborative: false,
    tags: ["quick", "weeknight", "easy"],
    createdAt: new Date("2024-04-15"),
    updatedAt: new Date("2024-07-15"),
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

// Helper function to get a variant by ID
export function getVariantById(recipeId: string, variantId: string) {
  const recipe = getRecipeById(recipeId);
  return recipe?.variants?.find((variant) => variant.id === variantId);
}

// Helper function to merge variant with parent recipe
export function getMergedVariant(recipeId: string, variantId: string) {
  const recipe = getRecipeById(recipeId);
  const variant = getVariantById(recipeId, variantId);
  
  if (!recipe || !variant) return null;
  
  // Merge variant with parent recipe, using variant values when available
  return {
    ...recipe,
    recipeName: `${recipe.recipeName} - ${variant.variantName}`,
    recipeDescription: variant.description || recipe.recipeDescription,
    ingredients: variant.ingredients || recipe.ingredients,
    instructions: variant.instructions || recipe.instructions,
    preparationTime: variant.preparationTime ?? recipe.preparationTime,
    cookingTime: variant.cookingTime ?? recipe.cookingTime,
    servingSize: variant.servingSize ?? recipe.servingSize,
    recipeImage: variant.recipeImage || recipe.recipeImage,
    createdBy: variant.createdBy,
    variantNotes: variant.notes,
    isVariant: true,
    variantId: variant.id,
  };
}
