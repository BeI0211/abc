---
name: Precision Admin
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#434655'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#46566c'
  on-tertiary: '#ffffff'
  tertiary-container: '#5e6e85'
  on-tertiary-container: '#e9f0ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  title-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 28px
  body-base:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-uppercase:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  code-data:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
  gutter: 1rem
  sidebar-width: 260px
  max-container: 1440px
---

## Brand & Style

This design system is built for high-stakes e-commerce management where data density and operational speed are paramount. The brand personality is **reliable, efficient, and authoritative**, leaning into a sophisticated **SaaS-inspired Corporate Modernism**. 

The aesthetic prioritizes clarity over decoration, using a structured hierarchy to guide the user through complex workflows. Visual cues are purposeful; color is used sparingly to denote action or status, while whitespace is leveraged to prevent cognitive overload despite high information density. The goal is a "pro-tool" environment that feels like a powerful extension of the administrator's capabilities.

## Colors

The palette is anchored by a functional logic:
- **Primary (#2563EB):** A vibrant blue used for primary actions, active states, and focus indicators.
- **Secondary/Navy (#0F172A):** Reserved for high-level navigation containers (sidebar/top-bar) to provide a strong structural frame.
- **Neutral/Background (#F8FAFC):** A cool, light gray that reduces eye strain and provides a clean canvas for content cards.
- **Slate Grays:** Used for borders (#E2E8F0) and body text (#475569) to maintain a soft but legible contrast.
- **Semantic Colors:** Standardized red, green, and amber for immediate status recognition in data tables and dashboards.

## Typography

The design system utilizes **Inter** for its exceptional legibility in UI contexts, particularly at small sizes within data tables. 

- **Scale:** We utilize a slightly smaller base size (14px) to accommodate the required data density of an admin dashboard.
- **Hierarchy:** Use bold weights (600-700) for section headers and navy text colors for primary headings. Use slate gray for secondary body text.
- **Data Display:** For SKU numbers, transaction IDs, or price logs, a monospaced alternative like JetBrains Mono is recommended to ensure character alignment.
- **Labels:** Small, uppercase labels with increased letter spacing are used for table headers and categorizers to distinguish them from actionable content.

## Layout & Spacing

This design system follows a **12-column fluid grid** with fixed sidebars. 

- **Desktop:** A fixed 260px sidebar on the left with a fluid main content area. Content is housed in "white cards" that typically span 3, 4, 6, or 12 columns.
- **Density:** We utilize a "compact" spacing rhythm. Gutters are kept at 1rem (16px) to maximize the amount of information visible on a single screen.
- **Padding:** Internal card padding is standardized at 1.5rem (24px) to ensure content feels breathable despite the high-density grid.
- **Mobile:** The sidebar collapses into a hamburger menu; cards stack vertically and margins reduce to 1rem (16px).

## Elevation & Depth

To maintain a clean SaaS look, depth is communicated through **tonal layering and soft ambient shadows** rather than heavy gradients.

- **Level 0 (Background):** #F8FAFC.
- **Level 1 (Cards/Surface):** Pure #FFFFFF white. This level carries a subtle shadow: `0px 1px 3px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.03)`.
- **Level 2 (Dropdowns/Popovers):** Pure #FFFFFF white with a more pronounced shadow: `0px 10px 15px -3px rgba(0, 0, 0, 0.1)`.
- **Borders:** All Level 1 surfaces feature a 1px solid border in #E2E8F0 to ensure crisp definition against the light gray background.

## Shapes

The design system uses a **Rounded (8px)** geometric language. This radius is applied consistently to:
- Content cards and containers.
- Form inputs and text areas.
- Buttons and interactive components.
- Progress bars and status badges.

The 8px radius provides a modern, approachable feel while remaining professional and structured. Small components like checkboxes or tags may use a 4px (Soft) radius to maintain visual proportion.

## Components

### Buttons
- **Primary:** Solid #2563EB with white text. 8px radius. Subtle inner-glow top border for a "pressed" tactile feel.
- **Secondary:** White background with #E2E8F0 border and #475569 text.
- **Tertiary/Ghost:** No background or border; blue text. Used for less frequent actions.

### Form Inputs
- **Default State:** 1px #E2E8F0 border, 8px radius, white background.
- **Focus State:** 1px #2563EB border with a 3px soft blue focus ring (outline).
- **Labels:** Positioned above the input, 12px Semibold Inter in Slate #475569.

### Data Tables
- **Header:** Light gray background (#F1F5F9), uppercase bold text.
- **Rows:** 1px bottom border (#F1F5F9), hover state with a very subtle blue tint (#EFF6FF).
- **Cell Content:** Standardized alignment (Left for text, Right for currency/numbers).

### Cards
- **Structure:** White background, 8px radius, 1px slate border.
- **Header:** Separate the card header with a thin horizontal line if it contains complex actions or filtering.

### Status Badges/Chips
- Small, pill-shaped (full radius), using low-saturation background tints and high-saturation text of the same hue (e.g., Success: Light green bg, dark green text).

### Navigation (Sidebar)
- Dark background (#0F172A).
- Active state: Left-edge primary blue accent bar (4px) and a subtle highlight on the menu item background.