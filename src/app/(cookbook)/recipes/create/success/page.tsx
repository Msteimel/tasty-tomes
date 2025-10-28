"use client";
import { LinkAsButton } from "@/app/components/ui/LinkAsButton";

export default function RecipeCreateSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="text-center space-y-6">
        <div className="text-6xl">🎉</div>
        <h1 className="text-3xl font-bold">Recipe Created Successfully!</h1>
        <p className="text-lg text-gray-600">
          Your recipe has been added to your cookbook.
        </p>

        <div className="flex gap-4 justify-center pt-6">
          <LinkAsButton href="/cookbook" variant="default" size="lg">
            View My Cookbook
          </LinkAsButton>
          <LinkAsButton href="/recipes/create" variant="outline" size="lg">
            Create Another Recipe
          </LinkAsButton>
        </div>
      </div>
    </div>
  );
}
