---
name: Zero-Friction Minimalist
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
  on-surface-variant: '#464555'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#7e3000'
  on-tertiary: '#ffffff'
  tertiary-container: '#a44100'
  on-tertiary-container: '#ffd2be'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb695'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#7b2f00'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 32px
  stack-gap: 16px
  section-gap: 48px
  gutter: 24px
---

## Brand & Style

The core philosophy of the design system is "Zero-Friction." It is built to reduce cognitive load by removing all non-essential visual elements, allowing the user's tasks to remain the sole focus. 

The style is **Ultra-Minimalist**, leaning into a sophisticated, professional aesthetic. It prioritizes clarity over decoration, using purposeful whitespace and subtle depth to guide the eye. The emotional response should be one of immediate calm and heightened efficiency—an digital "empty desk" environment where work can begin without distraction.

## Colors

This design system utilizes a high-clarity, limited palette to enforce focus. 

- **Primary (Electric Indigo):** Reserved exclusively for active states, primary actions, and focus indicators. 
- **Neutral Base:** A foundation of Deep Charcoal (#0F172A) for typography and Soft Whites/Off-whites for surfaces to prevent harsh eye strain.
- **Functional Grays:** Used sparingly for secondary text and subtle UI divisions.

Color is used as a functional tool rather than decoration. If an element is colored, it is actionable or signifies the current "Focus" state.

## Typography

The design system employs **Geist** for its technical precision and "developer-focused" clarity. The hierarchy is strictly enforced through weight and scale rather than color.

- **Headlines:** Use tighter letter-spacing and medium-to-semibold weights to create a strong anchor for sections.
- **Body:** Generous line-height (1.5x) is required to maintain the "calm" vibe and improve readability during long sessions.
- **Labels:** Used for metadata (tags, dates); these utilize slightly increased letter-spacing and uppercase styling for quick scanning.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid** with generous, fixed safe-margins. 

- **Desktop:** A 12-column grid with 24px gutters. Content is centered with a max-width of 1200px to prevent eye-travel fatigue.
- **Mobile:** A single-column flow with 16px horizontal margins.
- **Whitespace:** Spacing is used as a separator in lieu of lines. Increase vertical margins between unrelated tasks to create a "breathable" list.

Interaction areas (like drag handles) must maintain a minimum 44px hit-target, regardless of their visual size, to ensure zero-friction input.

## Elevation & Depth

To maintain a minimalist look, the design system avoids heavy drop shadows and instead uses **Tonal Layers** and **Ambient Depth**.

- **Base Layer:** Pure White (#FFFFFF) for the workspace.
- **Intermediate Layer:** Soft White (#F8FAFC) for secondary panels or sidebars.
- **Floating State:** Used only for items being dragged or active modals. This state utilizes a very soft, highly-diffused indigo-tinted shadow (e.g., `box-shadow: 0 10px 30px -10px rgba(79, 70, 229, 0.1)`).
- **Interactive State:** Elements should "lift" slightly on hover through a subtle increase in shadow diffusion, rather than a color change.

## Shapes

The design system uses a **Rounded** language (12px to 16px) to soften the professional aesthetic and make the UI feel approachable.

- **Small Components (Buttons, Inputs):** 12px radius.
- **Large Containers (Cards, Modals):** 16px radius.
- **Selection Indicators:** Subtle vertical pills (height of the text line) positioned at the far left of an active list item.

## Components

### Buttons
Primary buttons use the Electric Indigo background with white text. Secondary buttons are "Ghost" style—no border, only a subtle light gray background appearing on hover.

### Task Items (Lists)
Task items have no borders. They are separated by whitespace. On hover, the entire row gains a #F1F5F9 background. Drag-and-drop handles appear only on hover to reduce visual noise.

### Inputs
Search and task entry fields have no permanent borders. They use a light gray bottom-stroke that transforms into a 2px Indigo stroke only when focused.

### Chips & Tags
Small, 12px rounded containers. Use a very low-opacity tint of the accent color for the background and the full-saturation accent for the text.

### Progress Indicators
Thin, 4px height horizontal bars. Use a desaturated gray for the track and Electric Indigo for the progress fill.

### Drag-and-Drop Feedback
When an item is picked up, the source location stays empty (placeholder ghost), and the active item scales up by 2% with a soft ambient shadow to indicate it is "above" the interface.