# Quick Reference: Cookbook Roles

## 5 Role System Overview

### 👑 Owner (Blue Badge)
**Full control of the cookbook**
- ✅ Edit cookbook settings
- ✅ Manage all members (add, remove, change any role)
- ✅ Add/remove/edit/delete recipes
- ✅ Create/edit/delete variants
- ✅ Add notes
- ✅ **DELETE THE COOKBOOK**
- ✅ Transfer ownership to another member

**Use Case**: The cookbook creator or primary maintainer

---

### 🛡️ Admin (Purple Badge)
**Nearly full control, but cannot delete the cookbook**
- ✅ Edit cookbook settings
- ✅ Manage members (except cannot change/remove owners or promote to owner)
- ✅ Add/remove/edit/delete recipes
- ✅ Create/edit/delete variants
- ✅ Add notes
- ❌ **Cannot delete the cookbook**
- ❌ Cannot demote or remove owners
- ❌ Cannot promote members to owner

**Use Case**: Trusted co-maintainer who should help manage everything except permanent deletion

**Why This Role**: Prevents accidental deletion while allowing full management capabilities. Useful for shared family cookbooks or collaborative projects where you want multiple managers but only one person with "nuclear" option.

---

### ✏️ Editor (Green Badge)
**Can contribute recipes when cookbook is collaborative**
- ✅ View all recipes
- ✅ Create recipes (if `isCollaborative` is true)
- ✅ Edit own recipes
- ✅ Edit other recipes (if `isCollaborative` is true)
- ✅ Create variants (if `isCollaborative` is true)
- ✅ Add notes
- ❌ Cannot change cookbook settings
- ❌ Cannot manage members
- ❌ Cannot remove recipes from cookbook

**Use Case**: Active contributors who create and modify recipes

**Note**: In non-collaborative cookbooks, editors can only edit their own recipes

---

### 📝 Contributor (Yellow Badge)
**Can add notes and comments, but not edit recipes**
- ✅ View all recipes
- ✅ Add notes to any recipe
- ✅ Edit/delete own notes
- ❌ Cannot create recipes
- ❌ Cannot edit recipes
- ❌ Cannot create variants
- ❌ Cannot change cookbook settings

**Use Case**: Family members or friends who want to add cooking tips, substitutions, or personal experiences without editing the actual recipes

**Why This Role**: Perfect for people who want to contribute feedback ("I added extra garlic and it was great!") or cooking notes ("Works well in an air fryer at 375°F") without accidentally changing the base recipe.

---

### 👀 Viewer (Gray Badge)
**Read-only access**
- ✅ View all recipes
- ✅ View variants
- ❌ Cannot add notes
- ❌ Cannot create or edit anything
- ❌ Cannot change settings

**Use Case**: Someone you want to share recipes with but without any editing capability

---

## Permission Matrix

| Action | Owner | Admin | Editor | Contributor | Viewer |
|--------|-------|-------|--------|-------------|--------|
| **Cookbook Management** |
| View cookbook | ✅ | ✅ | ✅ | ✅ | ✅ |
| Edit cookbook settings | ✅ | ✅ | ❌ | ❌ | ❌ |
| Delete cookbook | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Member Management** |
| Add members | ✅ | ✅ | ❌ | ❌ | ❌ |
| Remove members | ✅ | ✅* | ❌ | ❌ | ❌ |
| Change roles | ✅ | ✅* | ❌ | ❌ | ❌ |
| Promote to owner | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Recipe Management** |
| View recipes | ✅ | ✅ | ✅ | ✅ | ✅ |
| Create recipes | ✅ | ✅ | ✅** | ❌ | ❌ |
| Edit own recipes | ✅ | ✅ | ✅ | ❌ | ❌ |
| Edit others' recipes | ✅ | ✅ | ✅** | ❌ | ❌ |
| Delete recipes | ✅ | ✅ | Own only | ❌ | ❌ |
| **Variants** |
| Create variants | ✅ | ✅ | ✅** | ❌ | ❌ |
| Edit own variants | ✅ | ✅ | ✅ | ❌ | ❌ |
| Edit others' variants | ✅ | ✅ | ✅** | ❌ | ❌ |
| Delete variants | ✅ | ✅ | Own only | ❌ | ❌ |
| **Notes** |
| Add notes | ✅ | ✅ | ✅ | ✅ | ❌ |
| Edit own notes | ✅ | ✅ | ✅ | ✅ | ❌ |
| Delete own notes | ✅ | ✅ | ✅ | ✅ | ❌ |
| Delete others' notes | ✅ | ✅ | ❌ | ❌ | ❌ |

\* Admins cannot remove/change owner roles  
\*\* Only if cookbook `isCollaborative` is true

---

## Collaborative Mode

The `isCollaborative` flag on a cookbook affects Editor permissions:

### Collaborative Cookbook (isCollaborative = true)
- Editors can create new recipes
- Editors can edit any recipe
- Editors can create variants of any recipe
- Editors can add/remove recipes from cookbook

### Non-Collaborative Cookbook (isCollaborative = false)
- Editors can only edit their own recipes
- Editors cannot create new recipes
- Editors cannot create variants
- Only Owner/Admin can add/remove recipes

**Other roles** (Owner, Admin, Contributor, Viewer) are **not affected** by collaborative mode.

---

## Common Scenarios

### Family Recipe Collection
- **Owner**: The family member who started the cookbook
- **Admin**: Spouse or adult child who helps maintain
- **Editors**: Family members who contribute recipes
- **Contributors**: Extended family who add notes like "Grandma always used butter instead"
- **Viewers**: Young family members who just want to follow recipes

### Restaurant Recipe Book (Non-Collaborative)
- **Owner**: Head chef or owner
- **Admin**: Sous chef
- **Editors**: Line cooks (can only edit recipes they created)
- **Contributors**: Kitchen staff who add prep notes
- **Viewers**: Front-of-house staff who need to know ingredients

### Community Cookbook (Collaborative)
- **Owner**: Community leader
- **Admins**: Moderators
- **Editors**: Active community members (can create and edit freely)
- **Contributors**: Members who share cooking tips
- **Viewers**: Public viewers

---

## Role Assignment Best Practices

1. **Start with Viewer**: When inviting someone new, default to Viewer and upgrade as needed
2. **Contributor for Feedback**: Use Contributor role for people who have valuable cooking experience but shouldn't edit base recipes
3. **Admin for Co-Management**: Promote trusted helpers to Admin rather than Owner to prevent accidental deletion
4. **One Owner Minimum**: System prevents removing the last owner
5. **Multiple Owners OK**: You can have multiple owners for shared responsibility

---

## Visual Indicators

Each role has a distinct color-coded badge in the UI:

- 🔵 **Owner** - Blue badge (`bg-blue-100 text-blue-800`)
- 🟣 **Admin** - Purple badge (`bg-purple-100 text-purple-800`)
- 🟢 **Editor** - Green badge (`bg-green-100 text-green-800`)
- 🟡 **Contributor** - Yellow badge (`bg-yellow-100 text-yellow-800`)
- ⚪ **Viewer** - Gray badge (`bg-gray-100 text-gray-800`)

These colors are consistent throughout the application for easy identification.
