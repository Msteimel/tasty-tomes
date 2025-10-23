"use client";
import { useState } from "react";
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

export default function CreateRecipePage() {
  const [ingredients, setIngredients] = useState<Array<number>>([0]);

  const addIngredient = (i: number) => {
    const ingredientCount = i + 1;

    // Function to add more ingredient input fields dynamically
    return (
      <div>
        <Input
          type="text"
          name={`ingredient${ingredientCount}`}
          placeholder={`Ingredient ${ingredientCount}`}
        />
        <Select name={`measurement${ingredientCount}`}>
          <SelectTrigger>
            <SelectValue placeholder="select a measurement" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Measurements</SelectLabel>
              <SelectItem value="grams">Grams</SelectItem>
              <SelectItem value="cups">Cups</SelectItem>
              <SelectItem value="tablespoons">Tablespoons</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          type="number"
          name={`quantity${ingredientCount}`}
          placeholder="Quantity"
        />
      </div>
    );
  };

  const handleAddIngredientClick = () => {
    setIngredients([...ingredients, ingredients.length]);
  };

  return (
    <div>
      <div>Create Recipe Page</div>
      <p>will have a form to create a new recipe</p>
      <form>
        <label>
          Recipe Name:
          <Input type="text" name="recipeName" />
        </label>
        <fieldset>
          <legend>Ingredients</legend>
          {ingredients.map((_, i) => addIngredient(i))}
        </fieldset>
        <Button
          variant="default"
          size="sm"
          type="button"
          onClick={handleAddIngredientClick}>
          Add another Ingredient
        </Button>
      </form>
    </div>
  );
}
