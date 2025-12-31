# Agent Operational Guide

This document guides AI agents (Cursor, Antigravity, etc.) to understand and modify this codebase safely.

## 🧠 Mental Model

This is a **Next.js 16 + Chakra UI v3** application. The most unique architectural decision is the **separation of Routing (`src/app`) and View Logic (`src/lib/pages`)**.

-   **Routes** are defined in `src/app`.
-   **Page Content** is defined in `src/lib/pages`.
-   **Strict TypeScript** is enforced.
-   **Biome** is the linter/formatter.

## 🗺️ Responsibility Map

| Directory | Responsibility | AI Action |
| :--- | :--- | :--- |
| `src/app/**` | Routing & Metadata | **Read-Only** mostly. Only add `page.ts` here for new routes. |
| `src/lib/pages/**` | Feature Implementation | **Create/Edit**. This is where "pages" live. |
| `src/lib/layout/**` | Global Shell (Nav/Footer) | **Caution**. Changes here affect the entire app. |
| `src/components/ui/**` | Generated UI Primitives | **Restricted**. These are CLI-generated. Modify ONLY if required for bug fixes. Prefer Composition. |
| `package.json` | Dependencies | **Read/Edit**. Use `pnpm` for installs. |

## 🛡️ Safe Modification Guidelines

### 1. Adding a New Page
**Goal**: User asks for "A new settings page".
**Plan**:
1.  Create `src/lib/pages/settings/index.tsx`.
2.  Implement the UI using Chakra components.
3.  Create `src/app/settings/page.tsx` that exports the component from step 1.

### 2. Styling Components
**Goal**: "Make the button red".
**Action**:
-   **DO NOT** add CSS classes, `className="foo"`, or tailwind classes.
-   **DO** use Chakra props: `<Button colorPalette="red" />` or `<Box bg="red.500" />`.
-   **DO** ensure it is responsive: `<Box width={{ base: 'full', md: '50%' }} />`.
-   **DO NOT** modify files in `src/components/ui` to change styles. Override them via props or wrap them.

### 3. Refactoring
**Goal**: "Clean up the home page".
**Action**:
-   Edit `src/lib/pages/home/index.tsx`.
-   Extract parts into small components within `src/lib/pages/home/components/` if they are specific to Home.
-   Move to `src/components/ui/` ONLY if reusable across different pages.

## ⚠️ Pitfalls & Invariants

-   **Routing**: Next.js App Router rules apply. `layout.tsx` is strictly nested.
-   **Client vs Server**: The root `src/lib/layout/index.tsx` is a Client Component (`'use client'`). Be aware that children passed to it can still be Server Components (RSC), but context usage requires care.
-   **Linting**: Always check for Biome errors. If you write code that violates Biome rules, the build will fail.

## 🤖 AI Instructions/Prompts

**Context Injection**:
When asking to "Analyze the project", always start by reading `SPEC.md` and `src/app/layout.tsx`.

**Tool Selection**:
-   Use `grep_search` to find Chakra component usage examples.
-   Use `view_file` on `package.json` to verify dependency versions before importing new libraries.

**Validation**:
After making changes, if possible, mention: "I have followed the architecture by placing logic in `src/lib` and keeping `src/app` clean."
