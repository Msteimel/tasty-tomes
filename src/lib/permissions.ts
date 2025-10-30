/**
 * Permission utilities for role-based access control
 * Centralizes all permission logic for cookbooks, recipes, and variants
 */

import { Cookbook, CookbookMember, Recipe } from "./types";

export type CookbookRole = "owner" | "admin" | "editor" | "contributor" | "viewer";

/**
 * Get the current user's role in a cookbook
 */
export function getUserRole(
  cookbook: Cookbook,
  userId: string
): CookbookRole | null {
  const member = cookbook.members.find((m) => m.userId === userId);
  return member?.role || null;
}

/**
 * Check if user is a member of the cookbook
 */
export function isMember(cookbook: Cookbook, userId: string): boolean {
  return cookbook.members.some((m) => m.userId === userId);
}

/**
 * Check if user is the owner of the cookbook
 */
export function isOwner(cookbook: Cookbook, userId: string): boolean {
  return getUserRole(cookbook, userId) === "owner";
}

/**
 * Check if user is an editor or owner
 */
export function isEditorOrOwner(cookbook: Cookbook, userId: string): boolean {
  const role = getUserRole(cookbook, userId);
  return role === "owner" || role === "editor";
}

/**
 * Check if user is an admin or owner
 */
export function isAdminOrOwner(cookbook: Cookbook, userId: string): boolean {
  const role = getUserRole(cookbook, userId);
  return role === "owner" || role === "admin";
}

/**
 * Check if user has elevated privileges (owner, admin, or editor)
 */
export function hasElevatedRole(cookbook: Cookbook, userId: string): boolean {
  const role = getUserRole(cookbook, userId);
  return role === "owner" || role === "admin" || role === "editor";
}

/**
 * Check if user can add notes to recipes (contributor or higher)
 */
export function canAddNotes(cookbook: Cookbook, userId: string): boolean {
  const role = getUserRole(cookbook, userId);
  return role === "owner" || role === "admin" || role === "editor" || role === "contributor";
}

/**
 * Check if user can view the cookbook
 */
export function canViewCookbook(cookbook: Cookbook, userId: string): boolean {
  // Public cookbooks can be viewed by anyone
  if (cookbook.isPublic) return true;
  // Private cookbooks can only be viewed by members
  return isMember(cookbook, userId);
}

/**
 * Check if user can edit cookbook settings (name, description, cover image, etc.)
 */
export function canEditCookbookSettings(
  cookbook: Cookbook,
  userId: string
): boolean {
  // Owners and admins can edit cookbook settings
  return isAdminOrOwner(cookbook, userId);
}

/**
 * Check if user can delete the cookbook entirely
 */
export function canDeleteCookbook(cookbook: Cookbook, userId: string): boolean {
  // Only owners can delete the cookbook
  return isOwner(cookbook, userId);
}

/**
 * Check if user can manage members (add/remove/change roles)
 */
export function canManageMembers(cookbook: Cookbook, userId: string): boolean {
  // Owners and admins can manage members
  return isAdminOrOwner(cookbook, userId);
}

/**
 * Check if user can add/remove recipes to/from the cookbook
 */
export function canManageRecipesInCookbook(
  cookbook: Cookbook,
  userId: string
): boolean {
  // Owners and admins can always manage recipes
  if (isAdminOrOwner(cookbook, userId)) return true;
  // Editors can manage recipes if the cookbook is collaborative
  if (cookbook.isCollaborative && isEditorOrOwner(cookbook, userId)) {
    return true;
  }
  return false;
}

/**
 * Check if user can create a new recipe in the cookbook context
 */
export function canCreateRecipe(cookbook: Cookbook, userId: string): boolean {
  // Owners and admins can always create recipes
  if (isAdminOrOwner(cookbook, userId)) return true;
  // Editors can create recipes if the cookbook is collaborative
  if (cookbook.isCollaborative && isEditorOrOwner(cookbook, userId)) {
    return true;
  }
  return false;
}

/**
 * Check if user can edit a specific recipe
 */
export function canEditRecipe(
  recipe: Recipe,
  userId: string,
  cookbook?: Cookbook
): boolean {
  // Recipe creator can always edit their recipe
  if (recipe.createdBy === userId) return true;
  
  // If cookbook context is provided and it's collaborative, editors can edit
  if (cookbook && cookbook.isCollaborative) {
    return isEditorOrOwner(cookbook, userId);
  }
  
  return false;
}

/**
 * Check if user can delete a recipe
 */
export function canDeleteRecipe(
  recipe: Recipe,
  userId: string,
  cookbook?: Cookbook
): boolean {
  // Recipe creator can delete their recipe
  if (recipe.createdBy === userId) return true;
  
  // Cookbook owners and admins can delete any recipe in their cookbook
  if (cookbook && isAdminOrOwner(cookbook, userId)) return true;
  
  return false;
}

/**
 * Check if user can create a variant of a recipe
 */
export function canCreateVariant(
  recipe: Recipe,
  userId: string,
  cookbook?: Cookbook
): boolean {
  // Same logic as creating a recipe
  if (cookbook) {
    return canCreateRecipe(cookbook, userId);
  }
  // If no cookbook context, only the recipe creator can create variants
  return recipe.createdBy === userId;
}

/**
 * Check if user can edit a variant
 */
export function canEditVariant(
  variantCreatorId: string,
  userId: string,
  cookbook?: Cookbook
): boolean {
  // Variant creator can edit their variant
  if (variantCreatorId === userId) return true;
  
  // If cookbook context is provided and it's collaborative, editors can edit
  if (cookbook && cookbook.isCollaborative) {
    return isEditorOrOwner(cookbook, userId);
  }
  
  return false;
}

/**
 * Check if user can delete a variant
 */
export function canDeleteVariant(
  variantCreatorId: string,
  userId: string,
  cookbook?: Cookbook
): boolean {
  // Variant creator can delete their variant
  if (variantCreatorId === userId) return true;
  
  // Cookbook owners and admins can delete any variant in their cookbook
  if (cookbook && isAdminOrOwner(cookbook, userId)) return true;
  
  return false;
}

/**
 * Get a human-readable description of what a role can do
 */
export function getRoleDescription(role: CookbookRole): string {
  switch (role) {
    case "owner":
      return "Full access - can manage all settings, members, recipes, and delete the cookbook";
    case "admin":
      return "Nearly full access - can manage settings, members, and recipes, but cannot delete the cookbook";
    case "editor":
      return "Can add and edit recipes in collaborative cookbooks";
    case "contributor":
      return "Can add notes and comments on recipes";
    case "viewer":
      return "Can view recipes but cannot make changes";
    default:
      return "Unknown role";
  }
}

/**
 * Get role badge color for UI
 */
export function getRoleBadgeColor(role: CookbookRole): string {
  switch (role) {
    case "owner":
      return "bg-blue-100 text-blue-800";
    case "admin":
      return "bg-purple-100 text-purple-800";
    case "editor":
      return "bg-green-100 text-green-800";
    case "contributor":
      return "bg-yellow-100 text-yellow-800";
    case "viewer":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

/**
 * Check if a member can be removed (can't remove last owner)
 */
export function canRemoveMember(
  cookbook: Cookbook,
  memberToRemove: CookbookMember
): boolean {
  // Can't remove if they're the only owner
  if (memberToRemove.role === "owner") {
    const ownerCount = cookbook.members.filter((m) => m.role === "owner").length;
    return ownerCount > 1;
  }
  return true;
}

/**
 * Check if a user can change a member's role
 * Owners can change anyone's role
 * Admins can change roles except for owners
 */
export function canChangeMemberRole(
  cookbook: Cookbook,
  userId: string,
  targetMember: CookbookMember,
  newRole: CookbookRole
): boolean {
  const userRole = getUserRole(cookbook, userId);
  
  // Only owners and admins can change roles
  if (userRole !== "owner" && userRole !== "admin") return false;
  
  // Owners can change anyone's role, including other owners
  if (userRole === "owner") return true;
  
  // Admins cannot change owner roles or promote to owner
  if (userRole === "admin") {
    if (targetMember.role === "owner") return false;
    if (newRole === "owner") return false;
    return true;
  }
  
  return false;
}
