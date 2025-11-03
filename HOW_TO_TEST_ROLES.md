# How to Test Role-Based Permissions

## Quick Start

1. **Open any recipe page** in your browser (e.g., `http://localhost:3000/recipes/recipe-001`)

2. **Look for the Role Switcher** - You should see a yellow "🔧 Role Switcher" panel in the bottom-right corner

3. **Switch Users**:
   - Click the dropdown to select different test users
   - The page will automatically reload with the new user's permissions
   - Buttons will appear/disappear based on permissions

## Test Users Available

| User | Role | What They Can Do |
|------|------|------------------|
| **Current User (user-001)** | Owner | ✅ Everything - Edit, Create Variant, Delete |
| **Sarah Johnson (user-002)** | Editor | ✅ Edit recipes & variants (collaborative only) |
| **Admin User (test-admin)** | Admin | ✅ Edit, Create Variant (cannot delete cookbook) |
| **Contributor User (test-contributor)** | Contributor | ✅ Add notes only |
| **Viewer User (test-viewer)** | Viewer | ❌ Read-only access |
| **Non-Member** | Not a member | ❌ Limited access |

## What to Test on Recipe Pages

### As Owner (user-001) - You should see:
- ✅ "Edit Recipe" button
- ✅ "Create Variant" button  
- ✅ "Delete Recipe" button (new!)
- ✅ All variant edit buttons

### As Editor (Sarah Johnson) - Collaborative Cookbook:
- ✅ "Edit Recipe" button
- ✅ "Create Variant" button
- ✅ "Edit Variant" button
- ❌ "Delete Recipe" button (hidden)

### As Editor - Non-Collaborative Cookbook:
- ❌ "Edit Recipe" button (hidden - not their recipe)
- ❌ "Create Variant" button (hidden)
- ✅ "Edit Variant" button (only for their own variants)

### As Contributor (test-contributor):
- ❌ All edit/create/delete buttons hidden
- ✅ Can add notes to recipes

### As Viewer (test-viewer):
- ❌ All action buttons hidden
- ✅ Can only view recipes

## Testing Variant Permissions

1. **Go to a recipe with variants**: `/recipes/recipe-001?variant=variant-001`

2. **As Owner**:
   - Click "Edit Variant" - should work
   - Go back, click "Edit Recipe" - should work

3. **Switch to Viewer** (test-viewer):
   - Notice both buttons disappear

4. **Try to access edit page directly**: 
   - Type `/recipes/recipe-001/variant/variant-001/edit` in the URL
   - Should see "Permission Denied" page with explanation

## Testing Create Variant

1. **Go to any recipe**: `/recipes/recipe-001`

2. **As Owner**: 
   - Click "Create Variant" - should work

3. **Switch to Contributor**:
   - "Create Variant" button disappears

4. **Try direct URL access**:
   - Type `/recipes/recipe-001/variant` in URL
   - Should see permission denied banner

## Color Coding

The Role Switcher shows role badges with colors:
- 🔵 **Blue** = Owner
- 🟣 **Purple** = Admin  
- 🟢 **Green** = Editor
- 🟡 **Yellow** = Contributor
- ⚪ **Gray** = Viewer
- 🔴 **Red** = Non-member

## Troubleshooting

**Q: The buttons aren't changing when I switch users?**
- Make sure the page reloads after switching (should happen automatically)
- Check the browser console for errors
- Try a hard refresh (Cmd+Shift+R on Mac)

**Q: I don't see the Role Switcher?**
- Make sure you're on a page after the dev server restarted
- Check that JavaScript is enabled
- Look in the bottom-right corner of the page

**Q: All buttons are showing even as Viewer?**
- The cookie might not be set correctly
- Try switching users again
- Check browser console to see what `dev-current-user` cookie value is

## Next Steps

Once you've verified permissions work:
1. Test cookbook deletion (only Owner should see "Delete Cookbook" button)
2. Test note system (Contributor should see "Add Note" but not edit buttons)
3. Test cookbook management (Owner/Admin should see "Manage Members")

---

**Remember**: This is a development tool! In production, users will be determined by real authentication, not the Role Switcher.
