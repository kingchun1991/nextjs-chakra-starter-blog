# Contributing to nextarter-chakra

Thank you for considering contributing! This guide helps you write code that aligns with the project's philosophy and structure.

## 🧠 Philosophy

1.  **Separation of Concerns**: We treat `src/app` strictly as the routing layer. Real UI implementation lives in `src/lib`.
2.  **Strict Typing**: No `any`. All props and state must be typed.
3.  **Modern Tooling**: We rely on Biome for speed and consistency.

## 🌿 Branching Strategy

-   **`main`**: The stable production branch.
-   **Feature Branches**: Create branches like `feat/my-feature` or `fix/issue-description` from `main`.

## 💻 Development Workflow

### 1. Adding a New Page

Do **NOT** put complex logic directly inside `src/app`.

1.  **Create the Component**:
    Create a new folder in `src/lib/pages`, e.g., `src/lib/pages/about/index.tsx`.
    ```tsx
    export const About = () => {
      return <Box>About Page</Box>;
    };
    ```

2.  **Create the Route**:
    Create the route in `src/app/about/page.tsx`.
    ```tsx
    import { About } from '@/lib/pages/about';
    
    // Define metadata here if needed
    export const metadata = { title: 'About' };
    
    export default About; // Re-export the component
    ```

### 2. Styling

-   **Responsive Design**: Always build with responsiveness in mind. Use Chakra's responsive array/object syntax (e.g., `<Box width={{ base: '100%', md: '50%' }} />`) to ensure layouts work on all device sizes.
-   **Chakra UI Components**: Use native components (`Box`, `Flex`, `Text`, etc.) for layout and styling.
-   **Avoid Custom ClassNames**: Do not use `className` or raw CSS (Tailwind, stylesheets) unless absolutely necessary. Leverage Chakra's props and the `theme` configuration for consistency and maintenance.
-   **Generated Components**: The components in `src/components/ui` are generated via the Chakra UI CLI. **Do NOT modify them** unless absolutely necessary. If you need a custom variation, compose it in a new component file rather than changing the generated base.

### 3. Code Quality

Before pushing, ensure your code is formatted and linted:

```bash
pnpm biome:fix
pnpm type:check
```

## 🧪 Testing

-   Write E2E tests in the `e2e` directory using Playwright if adding critical user flows.
-   Run tests locally: `pnpm test:e2e`

## 📝 Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

-   `feat: add dark mode toggle`
-   `fix: resolve layout shift on mobile`
-   `docs: update readme architecture`
-   `chore: upgrade dependencies`
