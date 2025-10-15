## Tasty Tomes

Modern Next.js (App Router) project with a token-driven design system and lightweight ShadCN-style component layer.

### Stack

- Next.js 15
- React 19
- Tailwind CSS v4
- Collocated component styles (CSS Modules + Tailwind utility classes)
- Design tokens authored as plain CSS custom properties (HSL for color for alpha support)
- Variant-friendly utilities: `clsx` + `tailwind-merge`

### Getting Started

Run the dev server:

```bash
yarn dev
```

Visit http://localhost:3000.

### Project Structure

```
src/
	app/
		layout.tsx         # Root layout (fonts, global css)
		page.tsx           # Homepage composed of UI components
		globals.css        # Tailwind + token imports + base/styles layers
	styles/
		tokens/            # Design tokens split by domain
			colors.css
			typography.css
			spacing.css
			radii.css
	components/
		button/
			button.tsx
			button.module.css
		header/
			header.tsx
			header.module.css
		hero/
			hero.tsx
			hero.module.css
		featured-books/
			featured-books.tsx
			featured-books.module.css
		footer/
			footer.tsx
			footer.module.css
	lib/
		utils.ts          # cn() helper
```

### Design Tokens

Tokens live in `src/styles/tokens`. Each file defines CSS custom properties on `:root` (and `.dark` for color). Colors use HSL fragments (no hsl() wrapper) so Tailwind can inject `<alpha-value>` for opacity utilities.

Example (from `colors.css`):

```
:root {
	--color-primary: 262 83% 58%;
}
```

Used in Tailwind config as:

```
theme.extend.colors.primary = 'hsl(var(--color-primary) / <alpha-value>)'
```

### Components

Each component has:

- A `*.tsx` React file (may be client if interactive)
- A matching `*.module.css` for style encapsulation and tailwind composition

We lean on Tailwind utilities inside the CSS Module via `@apply` for readability and future extraction. This keeps page bundles small because unused utility classes are never generated (Tailwind JIT + content scan).

### Adding a New Component

1. Create a folder under `src/components/your-component`.
2. Add `your-component.module.css` with base + variant class names.
3. Add `your-component.tsx` exporting the React component.
4. Import and use it in a page or another component.

### Adding / Modifying Tokens

1. Add or edit variables in the relevant file under `src/styles/tokens`.
2. Reference via CSS (e.g. `var(--space-4)`) or Tailwind theme extensions if you need utilities.
3. For new semantic colors, extend Tailwind in `tailwind.config.ts` mapping to `hsl(var(--color-your-token) / <alpha-value>)`.

### The `Button` Component

Variants implemented with CSS module class namespaces: `variant-default`, `variant-outline`, `variant-ghost` plus size classes. For large-scale variant logic you could integrate `class-variance-authority`—the dependency is installed and ready.

### Dark Mode

Dark tokens supplied by adding `.dark` class to `<html>`. Toggle strategy can be implemented later (e.g., `next-themes`).

### Tree Shaking & Performance

- Tailwind v4 generates only utilities discovered in content paths (set in `tailwind.config.ts`).
- Collocated CSS Modules import only the classes you author; unused classes are dropped by build minification.
- `optimizePackageImports` in `next.config.ts` enables more granular imports for icon / radix packages.
- Keep token files declarative—no large global component style dumps.

### Scripts

```
yarn dev     # Start dev server
yarn build   # Production build
yarn start   # Start production server
yarn lint    # ESLint
```

### Next Steps / Ideas

- Add accessibility primitives (skip link, focus outline helpers)
- Introduce `next-themes` for persisted dark mode toggle
- Add `Card`, `Input`, `Dialog` components using Radix primitives
- Implement a data layer for real book content

---

Happy reading & building! 📚
