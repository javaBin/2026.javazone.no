# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

JavaZone 2026 conference website built with React 19, TypeScript, and Vite. Uses Tailwind CSS for styling with GSAP for complex animations.

## Commands

```bash
# Development
npm run dev          # Start Vite dev server with HMR

# Build
npm run build        # TypeScript check + Vite production build
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # ESLint with auto-fix
npm run format       # Check Prettier formatting
npm run format:fix   # Auto-format with Prettier
```

Pre-commit hooks (Husky + lint-staged) automatically run ESLint and Prettier on staged files.

## Architecture

### Directory Structure

- `src/pages/` - Top-level page components mapped to routes
- `src/components/` - Reusable components (animated/, layout/, partners/)
- `src/routes/` - React Router configuration (AppRoutes.tsx, SpeakerRoutes.tsx)
- `src/assets/` - SVG graphics (graphics/) and icons (icons/)
- `src/lib/` - Utility functions

### Key Patterns

- **Path alias**: Use `@/` to import from `src/` (e.g., `import { Card } from '@/components'`)
- **Asset management**: All assets referenced in `src/Assets.ts` with licensing info
- **Styling**: Tailwind CSS utilities + DaisyUI color system (base-100, primary, tertiary)
- **Animations**: GSAP for complex animations, CSS for simpler effects (submarine.css, bubbles.css)
- **Component exports**: Barrel exports through index.ts files

### TypeScript Configuration

- Strict mode enabled
- No unused variables/parameters allowed
- Type-checked ESLint rules enforced
