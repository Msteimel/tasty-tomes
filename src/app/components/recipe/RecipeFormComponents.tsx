/**
 * Shared form components for recipe and variant forms
 * Ensures consistent UI and behavior across all recipe-related forms
 */

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
import { Ingredient } from "@/lib/types";

interface IngredientInputProps {
  index: number;
  ingredient: Ingredient;
  canRemove: boolean;
  onChange: (
    index: number,
    field: keyof Ingredient,
    value: string | number,
  ) => void;
  onRemove: (index: number) => void;
}

export function IngredientInput({
  index,
  ingredient,
  canRemove,
  onChange,
  onRemove,
}: IngredientInputProps) {
  const ingredientCount = index + 1;

  return (
    <div className="flex gap-2 mb-2">
      <Input
        type="text"
        name={`ingredient${ingredientCount}`}
        placeholder={`Ingredient ${ingredientCount}`}
        value={ingredient.name || ""}
        onChange={(e) => onChange(index, "name", e.target.value)}
        className="flex-1"
      />
      <Input
        type="number"
        name={`quantityWhole${ingredientCount}`}
        placeholder="Qty"
        min="0"
        value={ingredient.quantityWhole || ""}
        onChange={(e) =>
          onChange(index, "quantityWhole", parseInt(e.target.value) || 0)
        }
        className="w-20"
      />
      <Select
        name={`quantityFraction${ingredientCount}`}
        value={ingredient.quantityFraction || ""}
        onValueChange={(value) => onChange(index, "quantityFraction", value)}>
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
        value={ingredient.measurement || ""}
        onValueChange={(value) => onChange(index, "measurement", value)}>
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
      {canRemove && (
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={() => onRemove(index)}
          className="text-red-600 hover:text-red-800 hover:bg-red-50">
          Remove
        </Button>
      )}
    </div>
  );
}

interface InstructionInputProps {
  index: number;
  instruction: string;
  canRemove: boolean;
  onChange: (index: number, value: string) => void;
  onRemove: (index: number) => void;
}

export function InstructionInput({
  index,
  instruction,
  canRemove,
  onChange,
  onRemove,
}: InstructionInputProps) {
  const instructionCount = index + 1;

  return (
    <div className="mb-2 flex gap-2">
      <Textarea
        name={`instruction${instructionCount}`}
        placeholder={`Instruction ${instructionCount}`}
        value={instruction || ""}
        onChange={(e) => onChange(index, e.target.value)}
        className="flex-1"
        rows={3}
      />
      {canRemove && (
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={() => onRemove(index)}
          className="self-start text-red-600 hover:text-red-800 hover:bg-red-50">
          Remove
        </Button>
      )}
    </div>
  );
}

interface IngredientsListProps {
  ingredients: Ingredient[];
  canAddMore: boolean;
  onChange: (
    index: number,
    field: keyof Ingredient,
    value: string | number,
  ) => void;
  onRemove: (index: number) => void;
  onAdd: () => void;
}

export function IngredientsList({
  ingredients,
  canAddMore,
  onChange,
  onRemove,
  onAdd,
}: IngredientsListProps) {
  return (
    <div>
      {ingredients.map((ingredient, i) => (
        <IngredientInput
          key={i}
          index={i}
          ingredient={ingredient}
          canRemove={ingredients.length > 1}
          onChange={onChange}
          onRemove={onRemove}
        />
      ))}
      <Button
        variant="outline"
        size="sm"
        type="button"
        onClick={onAdd}
        disabled={!canAddMore}
        className="mt-2">
        + Add Ingredient
      </Button>
      {!canAddMore && (
        <p className="text-xs text-gray-500 mt-1">
          Complete all current ingredients before adding more
        </p>
      )}
    </div>
  );
}

interface InstructionsListProps {
  instructions: string[];
  canAddMore: boolean;
  onChange: (index: number, value: string) => void;
  onRemove: (index: number) => void;
  onAdd: () => void;
}

export function InstructionsList({
  instructions,
  canAddMore,
  onChange,
  onRemove,
  onAdd,
}: InstructionsListProps) {
  return (
    <div>
      {instructions.map((instruction, i) => (
        <InstructionInput
          key={i}
          index={i}
          instruction={instruction}
          canRemove={instructions.length > 1}
          onChange={onChange}
          onRemove={onRemove}
        />
      ))}
      <Button
        variant="outline"
        size="sm"
        type="button"
        onClick={onAdd}
        disabled={!canAddMore}
        className="mt-2">
        + Add Instruction
      </Button>
      {!canAddMore && (
        <p className="text-xs text-gray-500 mt-1">
          Complete all current instructions before adding more
        </p>
      )}
    </div>
  );
}
