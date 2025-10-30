# Permissions and Roles Implementation Guide

## Overview
This document outlines the role-based permission system for the Tasty Tomes cookbook application, what has been implemented, and what remains to be done for a complete MVP.

## Role Definitions

### Owner
- **Full Access**: Can manage all aspects of the cookbook
- Can edit cookbook settings (name, description, cover image, tags, privacy)
- Can manage members (add, remove, change roles, including promoting to admin/owner)
- Can add/remove recipes to/from cookbook
- Can create, edit, and delete recipes
- Can create, edit, and delete variants
- Can delete other members' contributions in their cookbook
- **Can delete the cookbook entirely**
- Can transfer ownership to another member

### Admin
- **Nearly Full Access**: Same as Owner except cannot delete the cookbook
- Can edit cookbook settings (name, description, cover image, tags, privacy)
- Can manage members (add, remove, change roles for non-owners)
- **Cannot**: Change owner roles, promote members to owner, or delete the cookbook
- Can add/remove recipes to/from cookbook
- Can create, edit, and delete recipes
- Can create, edit, and delete variants
- Can delete other members' contributions in their cookbook

### Editor
- **Collaborative Access**: Can contribute content when `isCollaborative` is true
- Can view all recipes in the cookbook
- Can create new recipes (if cookbook is collaborative)
- Can edit recipes they created
- Can edit other recipes (if cookbook is collaborative)
- Can create variants (if cookbook is collaborative)
- Can edit variants they created
- **Cannot**: Change cookbook settings, manage members, or remove recipes from cookbook

### Contributor
- **Note-Taking Access**: Can add notes and comments to recipes
- Can view all recipes in the cookbook
- Can add personal notes to any recipe
- Can edit/delete their own notes
- **Cannot**: Create recipes, edit recipes, create variants, or change cookbook settings

### Viewer
- **Read-Only Access**: Can only view content
- Can view all recipes in the cookbook
- Can view variants
- **Cannot**: Create, edit, delete, or add notes to anything

## What Has Been Implemented

### ✅ Core Infrastructure
1. **Permission Utility (`/src/lib/permissions.ts`)**
   - Centralized permission logic for all actions
   - Functions for checking roles and capabilities:
     - `getUserRole()` - Get user's role in a cookbook
     - `isOwner()`, `isAdminOrOwner()`, `isEditorOrOwner()`, `hasElevatedRole()`, `isMember()`
     - `canViewCookbook()` - Check public/private access
     - `canEditCookbookSettings()` - Owner & Admin settings access
     - `canDeleteCookbook()` - Owner-only cookbook deletion
     - `canManageMembers()` - Member management permissions (Owner & Admin)
     - `canManageRecipesInCookbook()` - Add/remove recipes (Owner, Admin, Editor in collaborative)
     - `canCreateRecipe()` - Create new recipes (Owner, Admin, Editor in collaborative)
     - `canEditRecipe()` - Edit existing recipes
     - `canDeleteRecipe()` - Delete recipes (Owner, Admin, Creator)
     - `canCreateVariant()`, `canEditVariant()`, `canDeleteVariant()`
     - `canAddNotes()` - Add notes to recipes (Contributor and above)
   - Helper functions:
     - `getRoleDescription()` - User-friendly role descriptions for all 5 roles
     - `getRoleBadgeColor()` - UI styling for role badges (5 different colors)
     - `canRemoveMember()` - Prevent removing last owner
     - `canChangeMemberRole()` - Permission checks for role changes (admins can't promote to owner)

### ✅ Member Management
1. **Dedicated Members Page (`/src/app/(cookbook)/cookbook/[id]/members/page.tsx`)**
   - Owner and Admin access to manage cookbook members
   - Invite new members with email
   - Assign roles (Owner, Admin, Editor, Contributor, Viewer)
   - Change member roles with proper permission checks:
     - Owners can change any role
     - Admins can change any role except Owner (cannot promote to Owner or demote Owners)
   - Remove members (with protection for last owner)
   - Transfer ownership capability (owners only, becomes admin after transfer)
   - Role permission descriptions for all 5 roles
   - Members grouped by role (Owners, Admins, Editors, Contributors, Viewers)
   - Visual distinction with color-coded badges

2. **Members Display on Cookbook Page**
   - Shows all cookbook members with role badges
   - Link to member management (for owners only)
   - Role indicators with color coding

### ✅ Permission Enforcement
1. **Cookbook Detail Page** (`/src/app/(cookbook)/cookbook/[id]/page.tsx`)
   - Conditional rendering based on permissions:
     - "Edit Cookbook" button (owners and admins only)
     - "Add New Recipe" button (owners, admins, and editors in collaborative cookbooks)
     - "Manage Recipes" button (owners, admins, and editors with manage rights)
     - "Manage Members" button (owners and admins only)
   - Displays user's current role with color-coded badge
   - Shows member count and list with all roles

2. **Cookbook Edit Page** (`/src/app/(cookbook)/cookbook/[id]/edit/page.tsx`)
   - Owner and Admin access to edit cookbook settings
   - Prevents non-owners/admins from accessing
   - ✅ Cookbook deletion only accessible to Owners (triple confirmation required)
   - Uses `canDeleteCookbook()` permission check
   - "Danger Zone" section only visible to owners

3. **Manage Recipes Page** (`/src/app/(cookbook)/cookbook/[id]/manage/page.tsx`)
   - Added permission check using `canManageRecipesInCookbook()`
   - Redirects unauthorized users

4. **Recipe Edit Page** (`/src/app/(cookbook)/recipes/[id]/edit/page.tsx`)
   - Updated to use `canEditRecipe()` permission utility
   - Checks both creator and cookbook context (when implemented)

## What's Still Missing for MVP

### ⚠️ High Priority (Required for MVP)

1. **Cookbook Edit Page - Delete Restriction** ✅ COMPLETE
   - [x] Update cookbook edit page to only show delete button to owners
   - [x] Use `canDeleteCookbook()` permission check
   - [x] Hide or disable delete functionality for admins
   - **Implementation**: Added "Danger Zone" section with triple confirmation (confirm dialog, second confirm, type "DELETE" prompt)

2. **Recipe Creation Context**
   - [ ] Pass cookbook ID when creating recipes from a cookbook
   - [ ] Store cookbook association with recipes (add `cookbookId` field to Recipe type)
   - [ ] Update recipe creation flow to respect cookbook permissions
   - [ ] Disable "Add New Recipe" for non-members or viewers/contributors

3. **Note System for Contributors**
   - [ ] Update recipe detail page to show "Add Note" button for contributors and above
   - [ ] Use `canAddNotes()` permission check
   - [ ] Allow contributors to add/edit/delete their own notes
   - [ ] Show note author with each note

4. **Variant Permission Checks**
   - [ ] Update variant creation page (`/src/app/(cookbook)/recipes/[id]/variant/page.tsx`)
   - [ ] Update variant edit page (`/src/app/(cookbook)/recipes/[id]/variant/[variantId]/edit/page.tsx`)
   - [ ] Add permission checks using the variant utility functions
   - [ ] Conditional rendering for variant creation buttons

5. **Recipe View Page Permissions**
   - [ ] Update `/src/app/(cookbook)/recipes/[id]/page.tsx`
   - [ ] Conditionally show "Edit Recipe" button based on `canEditRecipe()`
   - [ ] Conditionally show "Delete Recipe" button based on `canDeleteRecipe()`
   - [ ] Conditionally show "Create Variant" button based on `canCreateVariant()`
   - [ ] Show permission warnings for non-collaborative cookbooks

6. **Cookbook List Permissions**
   - [ ] Filter cookbooks on `/src/app/(cookbook)/cookbook/page.tsx`
   - [ ] Show only public cookbooks + user's cookbooks
   - [ ] Add visual indicators for user's role in each cookbook

7. **User Profile Integration**
   - [ ] Update profile page to show user's cookbooks with their roles
   - [ ] Show permissions summary for each cookbook

### 🔧 Medium Priority (Nice to Have)

1. **Permission Feedback**
   - [ ] Add tooltip explanations for disabled buttons
   - [ ] Show permission error messages when users try unauthorized actions
   - [ ] Add banners explaining collaborative mode benefits

2. **Audit Trail**
   - [ ] Track who added/edited/deleted recipes
   - [ ] Show "Last edited by [user]" on recipes
   - [ ] Member activity log

3. **Enhanced Member Management**
   - [ ] Email invitations (requires email service)
   - [ ] Pending invitations system
   - [ ] Member search/filter
   - [ ] Bulk role changes

4. **Recipe Ownership Transfer**
   - [ ] Allow recipe creators to transfer ownership
   - [ ] Handle orphaned recipes when members are removed

### 📋 Low Priority (Future Enhancements)

1. **Advanced Permissions**
   - [ ] Custom permission templates
   - [ ] Granular permissions (e.g., "can edit ingredients but not instructions")
   - [ ] Permission presets for different cookbook types

2. **Collaboration Features**
   - [ ] Comment/suggestion system for editors
   - [ ] Approval workflow for recipe changes
   - [ ] Version history

3. **Public/Private Recipes**
   - [ ] Make individual recipes public/private
   - [ ] Share individual recipes outside cookbook

## Implementation Checklist for MVP

To complete the MVP, focus on these tasks in order:

### Phase 1: Cookbook Delete Restriction ✅ COMPLETE
- [x] Update cookbook edit page with `canDeleteCookbook()` check
- [x] Show delete button only to owners
- [x] Test admin cannot delete cookbook
- [x] Add triple confirmation for safety (2 confirms + type "DELETE")

### Phase 2: Note System for Contributors ✅ COMPLETE
- [x] Update `RecipeNotesWithAdd` component to check `canAddNotes()` permission
- [x] Add `cookbook` and `currentUserId` props to component
- [x] Update `AddNoteForm` to accept and use current user's info
- [x] Add `username` field to `CookbookMember` type
- [x] Update dummy data with usernames for all members
- [x] Implement permission-based "Add Your Note" button display
- [x] Notes now properly track author via userId and username

**Note**: Full authentication system needed for production to get real user IDs

### Phase 3: Recipe Context (Critical) ✅ COMPLETE
- [x] Add `cookbookIds?: string[]` to Recipe type (array-based for multiple cookbooks)
- [x] Update recipe creation to accept cookbook context from URL params
- [x] Pass cookbook ID from "Add New Recipe" button as query parameter
- [x] Store cookbook associations in dummy data for all recipes
- [x] Display cookbook name in visual indicator when creating in cookbook context
- [x] Support many-to-many relationship (recipes can belong to multiple cookbooks)

**Implementation Details:**
- Recipe type now includes `cookbookIds` array for multiple cookbook associations
- "Add New Recipe" button on cookbook pages passes `?cookbookId={id}` 
- Recipe creation page reads cookbookId from searchParams and creates array `[cookbookId]`
- All dummy recipes updated with cookbook associations (some in multiple cookbooks)
- Blue info banner shows: "This recipe will be associated with '[Cookbook Name]'"
- Recipes can now appear in multiple cookbooks (e.g., Carbonara in both "Family Favorites" and "International Cuisine")

### Phase 4: Recipe View Permissions
- [ ] Update recipe detail page with permission checks
- [ ] Conditionally render edit/delete/variant buttons
   - [ ] Test with different roles

### Phase 5: Variant Permissions
- [ ] Add permission checks to variant creation
- [ ] Add permission checks to variant editing
   - [ ] Update variant display to show creator

### Phase 6: Cookbook List & Discovery
- [ ] Filter cookbooks by visibility and membership
- [ ] Add role indicators to cookbook cards
   - [ ] Show permission status

### Phase 7: Testing & Polish
- [ ] Test all permission combinations
- [ ] Add error messages for unauthorized actions
- [ ] Add loading states
- [ ] Add permission tooltips

## Key Files Reference

- **Types**: `/src/lib/types.ts` - Data models
- **Permissions**: `/src/lib/permissions.ts` - Permission logic
- **Dummy Data**: `/src/lib/dummyData.ts` - Test data with members

### Pages to Update
- Recipe detail: `/src/app/(cookbook)/recipes/[id]/page.tsx`
- Variant create: `/src/app/(cookbook)/recipes/[id]/variant/page.tsx`
- Variant edit: `/src/app/(cookbook)/recipes/[id]/variant/[variantId]/edit/page.tsx`
- Cookbook list: `/src/app/(cookbook)/cookbook/page.tsx`
- Profile: `/src/app/(user-profiles)/profile/page.tsx`

## Testing Strategy

### Test Scenarios
1. **Owner**:
   - Can access all management pages
   - Can edit all settings
   - Can manage all members (including promoting to owner)
   - Can add/edit/delete all recipes
   - Can delete the cookbook

2. **Admin**:
   - Can access management pages
   - Can edit cookbook settings
   - Can manage members (except cannot change/remove owners or promote to owner)
   - Can add/edit/delete all recipes
   - Cannot delete the cookbook

3. **Editor in Collaborative Cookbook**:
   - Can create recipes
   - Can edit own recipes
   - Can edit others' recipes
   - Cannot change cookbook settings
   - Cannot manage members

4. **Editor in Non-Collaborative Cookbook**:
   - Cannot create recipes
   - Can only edit own recipes
   - Cannot edit others' recipes

5. **Contributor**:
   - Can view all recipes
   - Can add notes to recipes
   - Can edit/delete own notes
   - Cannot create or edit recipes
   - Cannot create variants

6. **Viewer**:
   - Can only view recipes
   - All edit buttons hidden
   - Cannot add notes
   - Redirected from management pages

7. **Non-Member**:
   - Can view public cookbooks
   - Cannot view private cookbooks
   - Cannot perform any actions

## Notes for Database Implementation

When moving from dummy data to a real database:

1. **User Authentication**: Replace `"Current User"` with actual user IDs from auth system
2. **Member Lookups**: Use email→user ID resolution for invitations
3. **Cascade Deletes**: Handle recipe deletion when members leave
4. **Indexes**: Add indexes on `cookbookId`, `createdBy`, `userId` for performance
5. **Transactions**: Wrap member/recipe changes in transactions
6. **Validation**: Add server-side permission validation (don't trust client)

## Security Considerations

⚠️ **Important**: Current implementation is client-side only. Before production:

1. Add server-side permission checks on all API routes
2. Validate user permissions on database operations
3. Use proper authentication (replace `"Current User"`)
4. Add rate limiting for invitations
5. Validate email addresses server-side
6. Implement CSRF protection
7. Add audit logging for permission changes

## Summary

**What's Complete**:
- ✅ Permission utility system
- ✅ Member management UI
- ✅ Basic permission enforcement on cookbook pages
- ✅ Role-based UI rendering

**What's Missing**:
- ⚠️ Recipe-cookbook association
- ⚠️ Variant permission checks
- ⚠️ Recipe view page permissions
- ⚠️ Cookbook list filtering
- ⚠️ Complete testing of all permission scenarios

With the infrastructure in place, implementing the remaining features should be straightforward - mostly connecting the existing permission functions to the UI components.
