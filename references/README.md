# References Index

These are the canonical reference files from a working Emulsify theme.
Claude reads them directly and uses them as templates, substituting only
the design token values extracted from the design archive.

**Never modify these files manually during a skill run.** They are
read-only reference material. All output goes to the target theme directory.

---

## File Map

### Token SCSS files
Each category follows the same pattern: a `_partial.scss` holding the Sass map,
and an entry-point file (no `_`) that generates the `:root {}` CSS vars.

| Reference file | Target path |
|---|---|
| `base/colors/_color-palette.scss` | `src/components/base/colors/_color-palette.scss` |
| `base/colors/color-variables.scss` | `src/components/base/colors/color-variables.scss` |
| `base/spacing/_spacing.scss` | `src/components/base/spacing/_spacing.scss` |
| `base/spacing/spacing-variables.scss` | `src/components/base/spacing/spacing-variables.scss` |
| `base/typography/_typography.scss` | `src/components/base/typography/_typography.scss` |
| `base/typography/_typography-mixins.scss` | `src/components/base/typography/_typography-mixins.scss` |
| `base/typography/typography-variables.scss` | `src/components/base/typography/typography-variables.scss` |
| `base/radii/_radii.scss` | `src/components/base/radii/_radii.scss` |
| `base/radii/radii-variables.scss` | `src/components/base/radii/radii-variables.scss` |
| `base/shadows/_shadows.scss` | `src/components/base/shadows/_shadows.scss` |
| `base/shadows/shadows-variables.scss` | `src/components/base/shadows/shadows-variables.scss` |
| `base/breakpoints/_breakpoints.scss` | `src/components/base/breakpoints/_breakpoints.scss` |
| `base/fonts/_fonts.scss` | `src/components/base/fonts/_fonts.scss` |
| `base/functions/_color.scss` | `src/components/base/functions/_color.scss` |
| `base/functions/_fonts.scss` | `src/components/base/functions/_fonts.scss` |
| `base/functions/_space.scss` | `src/components/base/functions/_space.scss` |
| `base/functions/_radius.scss` | `src/components/base/functions/_radius.scss` |
| `base/functions/_shadow.scss` | `src/components/base/functions/_shadow.scss` |
| `base/functions/_top-border.scss` | `src/components/base/functions/_top-border.scss` |
| `base/functions/_rem-calc.scss` | `src/components/base/functions/_rem-calc.scss` *(copy verbatim)* |
| `base/functions/_px2rem.scss` | `src/components/base/functions/_px2rem.scss` *(copy verbatim)* |
| `base/motion/_motion.scss` | `src/components/base/motion/_motion.scss` |
| `base/utility/_container.scss` | `src/components/base/utility/_container.scss` |
| `base/utility/_utility.scss` | `src/components/base/utility/_utility.scss` |
| `base/base.scss` | `src/components/base/base.scss` |

### Storybook story files
Each category's story set is a direct template. Replace only token values and
font family names — preserve all class names, Twig structure, and JS exports.

| Reference file | Target path |
|---|---|
| `base/colors/colors.stories.js` | `src/components/base/colors/colors.stories.js` |
| `base/colors/colors.twig` | `src/components/base/colors/colors.twig` |
| `base/colors/colors.yml` | `src/components/base/colors/colors.yml` |
| `base/spacing/spacing.stories.js` | `src/components/base/spacing/spacing.stories.js` |
| `base/spacing/spacing.twig` | `src/components/base/spacing/spacing.twig` |
| `base/spacing/spacing.yml` | `src/components/base/spacing/spacing.yml` |
| `base/radii/radii.stories.js` | `src/components/base/radii/radii.stories.js` |
| `base/radii/radii.twig` | `src/components/base/radii/radii.twig` |
| `base/radii/radii.yml` | `src/components/base/radii/radii.yml` |
| `base/shadows/shadows.stories.js` | `src/components/base/shadows/shadows.stories.js` |
| `base/shadows/shadows.twig` | `src/components/base/shadows/shadows.twig` |
| `base/shadows/shadows.yml` | `src/components/base/shadows/shadows.yml` |
| `base/breakpoints/breakpoints.stories.js` | `src/components/base/breakpoints/breakpoints.stories.js` |
| `base/breakpoints/breakpoints.twig` | `src/components/base/breakpoints/breakpoints.twig` |
| `base/breakpoints/breakpoints.yml` | `src/components/base/breakpoints/breakpoints.yml` |
| `base/typography/typography.stories.js` | `src/components/base/typography/typography.stories.js` |
| `base/typography/type-faces.twig` | `src/components/base/typography/type-faces.twig` |
| `base/typography/type-faces.yml` | `src/components/base/typography/type-faces.yml` |
| `base/typography/heading-styles.twig` | `src/components/base/typography/heading-styles.twig` |
| `base/typography/heading-styles.yml` | `src/components/base/typography/heading-styles.yml` |
| `base/typography/body-styles.twig` | `src/components/base/typography/body-styles.twig` |
| `base/typography/body-styles.yml` | `src/components/base/typography/body-styles.yml` |
| `base/icons/icons.stories.js` | `src/components/base/icons/icons.stories.js` |
| `base/icons/icons.twig` | `src/components/base/icons/icons.twig` |

### Storybook config templates
These are full file templates. Replace the `:root {}` token block and the Google
Fonts `<link>` only — leave all `.sb-*` class rules untouched.

| Reference file | Target path |
|---|---|
| `preview-head-template.css` | `config/emulsify-core/storybook/preview-head.css` |
| `preview-js-template.js` | `config/emulsify-core/storybook/preview.js` |