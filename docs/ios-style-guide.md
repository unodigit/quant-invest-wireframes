# iOS Style Guide

**Quant Invest Platform - Design System**  
**Version:** 1.0  
**Last Updated:** October 6, 2025

## Table of Contents

1. [Overview](#overview)
2. [Design Principles](#design-principles)
3. [Color System](#color-system)
4. [Typography](#typography)
5. [Components](#components)
6. [Layout & Spacing](#layout--spacing)
7. [Interactions](#interactions)
8. [Accessibility](#accessibility)
9. [Code Examples](#code-examples)

---

## Overview

This style guide documents the iOS-native design system used throughout the Quant Invest Platform. All components follow Apple's Human Interface Guidelines (HIG) 2024.

### Key Features

- ✅ Native iOS look and feel
- ✅ SF Pro font stack with Inter fallback
- ✅ iOS system colors and shadows
- ✅ Touch-optimized interactions
- ✅ WCAG 2.1 AA accessibility
- ✅ Dark mode support
- ✅ Responsive design

---

## Design Principles

### 1. **Clarity**
- Clear, legible text at every size
- Icons and buttons are clear and intuitive
- Sufficient contrast and negative space

### 2. **Deference**
- Content is the priority
- UI defers to content
- Subtle animations and transitions

### 3. **Depth**
- Visual layers create hierarchy
- Realistic motion provides vitality
- Elevation through shadows

---

## Color System

### iOS System Colors

```css
--ios-blue: #007AFF;      /* Primary actions */
--ios-green: #34C759;     /* Success, positive */
--ios-red: #FF3B30;       /* Errors, destructive */
--ios-yellow: #FFCC00;    /* Warnings */
--ios-orange: #FF9500;    /* Attention */
--ios-purple: #AF52DE;
--ios-pink: #FF2D55;
--ios-teal: #5AC8FA;
--ios-indigo: #5856D6;
```

### Semantic Colors

```css
--ios-primary: #007AFF;      /* Primary buttons, links */
--ios-accent: #34C759;       /* Accent actions */
--ios-destructive: #FF3B30;  /* Delete, remove */
```

### Background Colors

```css
--ios-background: #f2f2f7;           /* App background */
--ios-background-secondary: #ffffff; /* Secondary bg */
--ios-card: #ffffff;                 /* Card background */
```

### Label Colors

```css
--ios-label: #000000;                      /* Primary text */
--ios-label-secondary: rgba(60,60,67,0.6); /* Secondary text */
--ios-label-tertiary: rgba(60,60,67,0.3);  /* Tertiary text */
--ios-label-quaternary: rgba(60,60,67,0.18); /* Disabled text */
```

### Fill Colors (Backgrounds)

```css
--ios-fill: rgba(120,120,128,0.2);           /* Primary fill */
--ios-fill-secondary: rgba(120,120,128,0.16);
--ios-fill-tertiary: rgba(118,118,128,0.12);
--ios-fill-quaternary: rgba(116,116,128,0.08);
```

---

## Typography

### Font Stack

```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, 
             'Inter', 'SF Pro Text', 'SF Pro Display', 
             'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

### Type Scale

| Style | Size | Weight | Letter Spacing | Usage |
|-------|------|--------|----------------|-------|
| **Large Title** | 34px | 700 | 0.35px | Page titles |
| **Title 1** | 28px | 700 | 0.36px | Section headers |
| **Title 2** | 22px | 600 | 0.35px | Card headers |
| **Title 3** | 20px | 600 | 0.38px | Subsections |
| **Headline** | 17px | 600 | -0.43px | Emphasized text |
| **Body** | 17px | 400 | -0.43px | Body copy |
| **Callout** | 16px | 400 | -0.32px | Secondary info |
| **Subhead** | 15px | 400 | -0.24px | Labels |
| **Footnote** | 13px | 400 | -0.08px | Captions |
| **Caption 1** | 12px | 400 | 0 | Fine print |
| **Caption 2** | 11px | 400 | 0.06px | Smallest text |

### Usage Examples

```html
<h1 class="text-largetitle">Large Title</h1>
<h2 class="text-title1">Title 1</h2>
<h3 class="text-title2">Title 2</h3>
<p class="text-body">Body text content</p>
<span class="text-footnote">Footnote text</span>
```

---

## Components

### Buttons

#### Primary Button
```html
<button class="bg-primary text-white px-6 py-3 rounded-lg font-semibold">
  Primary Action
</button>
```

**Style:**
- Min height: 44px
- Background: `var(--ios-primary)`
- Border radius: 10px
- Active state: scale(0.96)

#### Accent Button
```html
<button class="bg-accent text-white px-6 py-3 rounded-lg font-semibold">
  Accent Action
</button>
```

#### Secondary Button
```html
<button class="bg-white text-primary border px-6 py-3 rounded-lg font-semibold">
  Secondary Action
</button>
```

#### Destructive Button
```html
<button class="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold">
  Delete
</button>
```

### Forms

#### Text Input
```html
<input 
  type="text" 
  class="w-full px-4 py-3 border rounded-lg"
  placeholder="Enter text"
/>
```

**Style:**
- Min height: 44px
- Border: 0.5px solid separator
- Background: fill-tertiary
- Focus: blue border + shadow

#### Checkbox (iOS Native)
```html
<label class="flex items-center cursor-pointer">
  <input type="checkbox" />
  <span>Remember me</span>
</label>
```

**Style:**
- Size: 22×22px
- Border radius: 6px
- Checked: blue background + white checkmark
- Animation: pop on check

#### Radio Button (iOS Native)
```html
<label class="flex items-center cursor-pointer">
  <input type="radio" name="option" />
  <span>Option 1</span>
</label>
```

**Style:**
- Size: 22×22px
- Border radius: 50%
- Checked: blue border (7px) for inner dot
- Animation: pop on select

### Cards

```html
<div class="bg-white rounded-lg shadow-sm border p-6">
  <h3 class="text-title3 mb-2">Card Title</h3>
  <p class="text-body text-gray-600">Card content</p>
</div>
```

**Style:**
- Background: white
- Border: 0.5px solid separator
- Border radius: 12px
- Shadow: medium elevation
- Padding: 24px

### Badges

```html
<span class="badge bg-green-100 text-green-800">Completed</span>
<span class="badge bg-yellow-100 text-yellow-800">Pending</span>
<span class="badge bg-red-100 text-red-800">Failed</span>
```

**Style:**
- Padding: 4px 8px
- Border radius: 6px
- Font size: 12px
- Font weight: 600

### Lists

```html
<div class="list-item">
  <div class="flex-1">
    <div class="font-semibold">Item Title</div>
    <div class="text-sm text-gray-600">Item description</div>
  </div>
  <svg><!-- chevron icon --></svg>
</div>
```

**Style:**
- Min height: 44px
- Padding: 12px 16px
- Border bottom: 0.5px separator
- Active: fill-quaternary background

### Tables

```html
<table>
  <thead>
    <tr>
      <th>Column 1</th>
      <th>Column 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
    </tr>
  </tbody>
</table>
```

**Style:**
- Border radius: 12px
- Border: 0.5px separator
- Header: fill-quaternary background
- Row separators: 0.5px lines
- Active row: fill-quaternary

---

## Layout & Spacing

### 8-Point Grid System

All spacing uses multiples of 8px:

```css
--ios-spacing-xs: 4px;   /* 0.5 × base */
--ios-spacing-sm: 8px;   /* 1 × base */
--ios-spacing-md: 16px;  /* 2 × base */
--ios-spacing-lg: 20px;  /* 2.5 × base */
--ios-spacing-xl: 24px;  /* 3 × base */
--ios-spacing-2xl: 32px; /* 4 × base */
```

### Padding Utilities

```html
<div class="p-2">8px all sides</div>
<div class="p-4">16px all sides</div>
<div class="p-6">24px all sides</div>
<div class="p-8">32px all sides</div>

<div class="px-4 py-2">16px horizontal, 8px vertical</div>
```

### Margin Utilities

```html
<div class="mb-2">8px bottom margin</div>
<div class="mb-4">16px bottom margin</div>
<div class="mb-6">24px bottom margin</div>
<div class="mt-8">32px top margin</div>
```

### Border Radius

```css
--ios-radius-small: 8px;   /* Small elements */
--ios-radius-medium: 10px; /* Inputs, buttons */
--ios-radius-large: 12px;  /* Cards */
--ios-radius-xlarge: 16px; /* Modals */
```

### Shadows

```css
--ios-shadow-small: 0 1px 2px rgba(0,0,0,0.06);
--ios-shadow-medium: 0 3px 8px rgba(0,0,0,0.12);
--ios-shadow-large: 0 8px 16px rgba(0,0,0,0.15);
--ios-shadow-xlarge: 0 12px 24px rgba(0,0,0,0.18);
```

---

## Interactions

### Touch Targets

All interactive elements must be **at least 44×44px** per iOS HIG.

```css
button,
a {
  min-height: var(--ios-touch-target); /* 44px */
}
```

### Animations

#### Button Press
```css
button:active {
  transform: scale(0.96);
  opacity: 0.85;
}
```

#### Checkbox Check
```css
@keyframes checkboxPop {
  0% { transform: scale(1); }
  50% { transform: scale(0.9); }
  100% { transform: scale(1); }
}
```

#### Toast Slide Down
```css
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Easing Curves

```css
--ios-easing-default: cubic-bezier(0.25, 0.1, 0.25, 1);
--ios-easing-in: cubic-bezier(0.42, 0, 1, 1);
--ios-easing-out: cubic-bezier(0, 0, 0.58, 1);
--ios-easing-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

### Transitions

```css
--ios-transition-fast: 0.2s;    /* Quick feedback */
--ios-transition-normal: 0.3s;  /* Standard */
--ios-transition-slow: 0.4s;    /* Modals */
```

---

## Accessibility

### Focus States

All interactive elements have visible focus indicators:

```css
*:focus-visible {
  outline: 2px solid var(--ios-primary);
  outline-offset: 2px;
}
```

### Screen Reader Only

```html
<span class="sr-only">Hidden from visual users</span>
```

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}
```

### Color Contrast

All text meets WCAG 2.1 AA standards:
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- UI components: 3:1 minimum

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Code Examples

### Complete Form Example

```html
<form class="space-y-6">
  <!-- Text Input -->
  <div>
    <label for="email" class="block text-sm font-medium mb-2">
      Email Address
    </label>
    <input
      type="email"
      id="email"
      class="w-full px-4 py-3 border rounded-lg"
      placeholder="you@example.com"
      required
    />
  </div>

  <!-- Checkbox -->
  <label class="flex items-center cursor-pointer">
    <input type="checkbox" id="remember" />
    <span>Remember me</span>
  </label>

  <!-- Button -->
  <button 
    type="submit"
    class="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold"
  >
    Log In
  </button>
</form>
```

### Card with Badge

```html
<div class="bg-white rounded-lg shadow-sm border p-6">
  <div class="flex items-start justify-between mb-2">
    <h3 class="text-title3">Strategy Name</h3>
    <span class="badge bg-green-100 text-green-800">Active</span>
  </div>
  <p class="text-body text-gray-600 mb-4">
    Strategy description goes here
  </p>
  <div class="text-sm text-gray-500">
    Updated 2 hours ago
  </div>
</div>
```

### List with Chevrons

```html
<div class="grouped-list">
  <div class="list-item">
    <div class="flex-1">
      <div class="font-semibold">Profile</div>
      <div class="text-sm text-gray-600">Name, email, phone</div>
    </div>
    <svg class="w-5 h-5 text-gray-400"><!-- chevron --></svg>
  </div>
  <div class="list-item">
    <div class="flex-1">
      <div class="font-semibold">Security</div>
      <div class="text-sm text-gray-600">Password, 2FA</div>
    </div>
    <svg class="w-5 h-5 text-gray-400"><!-- chevron --></svg>
  </div>
</div>
```

### Toast Notification (JavaScript)

```javascript
import { Toast } from './js/ios-enhancements.js';

// Success toast
Toast.success('Operation completed successfully');

// Error toast
Toast.error('Something went wrong');

// Warning toast
Toast.warning('Please review your input');
```

---

## Best Practices

### DO ✅

- Use system fonts (SF Pro via system-ui)
- Maintain 44px minimum touch targets
- Use semantic colors from design system
- Apply consistent spacing (8px grid)
- Animate interactions smoothly
- Provide focus indicators
- Support reduced motion
- Test on actual iOS devices

### DON'T ❌

- Use custom fonts for UI elements
- Create touch targets smaller than 44px
- Use arbitrary colors outside system
- Mix different spacing systems
- Overuse animations
- Remove focus indicators
- Ignore accessibility
- Rely only on desktop testing

---

## Resources

### Apple Documentation
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [SF Symbols](https://developer.apple.com/sf-symbols/)
- [iOS Design Resources](https://developer.apple.com/design/resources/)

### Web Standards
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Web Docs](https://developer.mozilla.org/)

### Internal Documentation
- [CSS Consolidation Guide](./css-consolidation.md)
- [Project README](../README.md)
- [Implementation Status](../IMPLEMENTATION_STATUS.md)

---

## Version History

**v1.0** - October 6, 2025
- Initial iOS style guide
- Complete component library
- Accessibility guidelines
- Code examples

---

**Questions or feedback?** Contact the development team or refer to the project documentation.