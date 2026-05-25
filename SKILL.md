---
name: emulsify-design-base
description: >
  Builds a complete Emulsify design system base from an Anthropic Design API URL.
  Use this skill any time the user provides a design URL of the form
  `https://api.anthropic.com/v1/design/h/{ID}` and wants to scaffold or refresh
  the `src/components/base/` layer of an Emulsify Drupal theme — including SCSS
  token files, Sass functions, Storybook documentation stories, and Storybook
  config files (`preview-head.css`, `preview.js`). Also trigger when the user
  says things like "apply this design to Emulsify", "update the design tokens",
  "rebuild the base component layer", or "sync Storybook with the design system".
  This skill handles the full end-to-end workflow: download → extract → parse
  tokens → generate files → verify build.
---

# Emulsify Design Base Skill

## Overview

This skill scaffolds or fully rebuilds the `src/components/base/` layer of an
Emulsify Drupal theme from a live Anthropic Design API endpoint.

**How reference files are used:** The `references/` directory contains real,
working files from a canonical Emulsify theme. Read each reference file in full
before writing its counterpart in the target theme. Substitute only the token
values — preserve all Sass structure, Twig markup, JS export names, and class
names exactly as they appear in the reference.

See `references/README.md` for the complete file map (reference path →
target path for every file in this skill).

---

## Step 0 — Gather inputs

Before writing any files, confirm:

| Input | How to get it |
|---|---|
| **Design URL** | Provided by the user — `https://api.anthropic.com/v1/design/h/{ID}` |
| **Theme root** | Path to `web/themes/custom/{theme-name}/` in the repo |
| **Theme machine name** | Derived from the theme directory name (e.g., `my_theme`) |

If the theme root is ambiguous, list candidate directories and ask.

---

## Step 1 — Fetch and extract the design archive

```bash
# 1a. Download the archive
curl -L "{DESIGN_URL}" -o /tmp/design-archive.tar.gz

# 1b. Extract
mkdir -p /tmp/design-extracted
tar -xzf /tmp/design-archive.tar.gz -C /tmp/design-extracted

# 1c. Inspect
find /tmp/design-extracted -type f | sort
```

Identify the canonical token CSS file. Look for (in priority order):
1. `colors_and_type.css`
2. Any file matching `*tokens*.css` or `*variables*.css`
3. The root-level `*.css` file with the most `:root` custom properties

Read that file in full — it is the single source of truth for all token values.

---

## Step 2 — Parse and inventory the design tokens

Extract every CSS custom property from the `:root {}` block. Group by prefix:

| Category | Typical CSS var prefixes |
|---|---|
| Colors | `--color-*`, `--palette-*`, `--primary-*`, `--neutral-*` |
| Spacing | `--space-*`, `--spacing-*` |
| Typography | `--ff-*`, `--fw-*`, `--fs-*`, `--tracking-*`, `--lh-*` |
| Radii | `--radius-*`, `--rounded-*` |
| Shadows | `--shadow-*`, `--elevation-*` |
| Breakpoints | `--bp-*`, `--screen-*` |

Output a brief inventory table before generating any files:

```
Colors:      primary (50–900), neutral (50–950), semantic (surface, on-surface…)
Spacing:     0–24 (8pt scale)
Fonts:       Inter (body), Fraunces (display)
Radii:       none, sm, md, lg, xl, 2xl, full
Shadows:     sm, md, lg, xl, inner, none
Breakpoints: sm, md, lg, xl, 2xl
```

> **Critical:** Use the design's exact var names. Never apply legacy theme
> prefixes like `--c-*` or `--s-bcj-*`.

---

## Step 3 — Read reference files, then generate output

Read `references/README.md` first for the complete reference → target path map.

**Rule for every file:** read the reference file → identify token values →
replace with new design values → write to target path. Never write a file
without reading its reference first.

### Token SCSS files

Each category follows the same two-file pattern:
- `_{category}.scss` — Sass map (partial, not an entry point)
- `{category}-variables.scss` — entry point; `@use`s the map, emits `:root {}`

Read and mirror each category:

| Read from `references/base/` | Write to `src/components/base/` |
|---|---|
| `colors/` | `colors/` |
| `spacing/` | `spacing/` |
| `typography/` | `typography/` |
| `radii/` | `radii/` |
| `shadows/` | `shadows/` |
| `breakpoints/` | `breakpoints/` |
| `fonts/` | `fonts/` |
| `motion/` | `motion/` |
| `utility/` | `utility/` |

### Sass function partials

Read each file in `references/base/functions/` before writing its counterpart.

- `_rem-calc.scss` and `_px2rem.scss` — **copy verbatim**, no token values
- All others (`_color.scss`, `_fonts.scss`, `_space.scss`, `_radius.scss`,
  `_shadow.scss`, `_top-border.scss`) — update `@use` path and fallback values
  to match the new design's Sass maps

### `base.scss`

Read `references/base/base.scss`. Preserve the exact `@use` order. Only adjust
if the new design adds or removes a category.

### Storybook story files

Each category: `.stories.js`, `.twig`, `.yml` (except `icons/` — no `.yml`).

Read the reference story files before writing each category. Typography uses
hyphenated filenames — `type-faces`, `heading-styles`, `body-styles` — not
camelCase.

What to update per file type:
- **`.yml`** — replace every token name/value pair with the new design's tokens.
  Preserve YAML structure exactly.
- **`.twig`** — preserve all markup and class names. Rarely needs changes.
- **`.stories.js`** — preserve `title` values and export names exactly.
  Storybook's `/index.json` story IDs depend on these.

### `icons/` directory

Copy `references/base/icons/icons.stories.js` and `icons.twig` verbatim.
Create `icons/.gitkeep` so the directory is tracked in git when empty.

---

## Step 4 — Update Storybook config files

### `preview-head.css`

Read `references/preview-head-template.css` in full.

Replace the **entire** `:root {}` block with inlined plain CSS values from the
design token file. No `@use`, no `@import`, no Sass of any kind — the
sass-loader will throw `"An importer must have either canonicalize and load
methods"` if any Sass syntax appears here.

Required aliases to keep (`.sb-*` utility classes depend on these):

```css
--spacing-xl:  var(--space-6, 1.5rem);
--spacing-xxl: var(--space-8, 2rem);
--spacing-lg:  var(--space-5, 1.25rem);
--spacing-md:  var(--space-4, 1rem);
--fs-small:    var(--fs-sm, 0.875rem);
--fs-caption:  var(--fs-xs, 0.75rem);
```

Update `[data-component-theme='dark']` to use the design's darkest surface token.

Leave all `.sb-*` class rules **unchanged**.

Write result to `config/emulsify-core/storybook/preview-head.css`.

### `preview.js`

Read `references/preview-js-template.js` in full.

Update the Google Fonts `<link>` string to load only the font families present
in the design's `--ff-*` tokens. Font loading must happen via `<link>` injected
into the document head — never via `@import` in SCSS or JS.

Write result to `config/emulsify-core/storybook/preview.js`.

---

## Step 5 — Verify the build

```bash
cd {THEME_ROOT}
npm run develop &
sleep 20
curl -s http://localhost:6006/index.json | python3 -c "
import sys, json
data = json.load(sys.stdin)
stories = list(data.get('entries', data.get('stories', {})).keys())
expected = [
  'Base/Colors', 'Base/Spacing', 'Base/Radii', 'Base/Shadows',
  'Base/Breakpoints', 'Base/TypeFaces', 'Base/HeadingStyles',
  'Base/BodyStyles', 'Base/Icons'
]
missing = [e for e in expected if not any(e in s for s in stories)]
print('MISSING:', missing if missing else 'none — all stories found ✓')
print('TOTAL stories:', len(stories))
"
```

Common failure modes:

| Error | Fix |
|---|---|
| `An importer must have either canonicalize and load methods` | Remove any Sass from `preview-head.css`; inline all values as plain CSS |
| Story missing from `/index.json` | Check `.stories.js` `title` + export name matches the reference exactly |
| Font not loading | Ensure font `<link>` is in `preview.js`, not `@import` in CSS |
| Wrong CSS var name | Re-read the token file; use the design's exact property names |
| Dark theme not applying | Update `[data-component-theme='dark']` in `preview-head.css` |

---

## Output checklist

- [ ] Token inventory documented before any files written
- [ ] Every reference file read before its counterpart was generated
- [ ] All `_`-prefixed files are Sass partials (not entry points)
- [ ] All entry-point files have no `_` prefix
- [ ] `base.scss` uses `@use` for every category (not `@import`)
- [ ] `preview-head.css` `:root` block is plain CSS (no Sass)
- [ ] `.sb-*` spacing and font-size aliases present in `preview-head.css`
- [ ] `[data-component-theme='dark']` uses design's darkest surface token
- [ ] `preview.js` Google Fonts `<link>` updated to design's fonts only
- [ ] `icons/.gitkeep` present
- [ ] Storybook started, `/index.json` verified
- [ ] Zero webpack errors
- [ ] All 9 expected stories present