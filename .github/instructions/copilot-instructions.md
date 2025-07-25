# GitHub Copilot Instructions for Next.js Chakra Blog

## 🏗️ Architecture Overview

This is a **Next.js 15 + Chakra UI v3 + TypeScript + MDX** blog template with enhanced features. The architecture separates concerns across:

- **`/src/app/`** - Next.js 15 App Router pages
- **`/src/lib/`** - Core business logic, layouts, and utilities
- **`/src/components/`** - Reusable UI components and Chakra UI customizations
- **`/content/`** - MDX blog posts and static content
- **`/public/`** - Static assets and generated files

### Key Design Patterns

- **Client/Server Component Separation**: Always use `'use client'` for interactive components. Server components handle data fetching and static rendering.
- **MDX Component Mapping**: Custom components are mapped in `src/lib/components/MDXComponents.tsx` and available in all `.mdx` files.
- **Chakra UI v3 Conventions**: Use `@chakra-ui/react` components with the new v3 API (e.g., `Table.Root`, `Avatar.Root`, etc.).

## 🚀 Development Workflows

### Essential Commands

```bash
# Pre-build JSON generation is required before dev/build
pnpm dev          # Runs generate-json + next dev
pnpm build        # Runs generate-json + next build + sitemap generation
pnpm generate-json # Creates blog metadata JSON files (required step)
```

### Adding Blog Posts

1. Create `.mdx` files in `/content/blog/` with frontmatter:

```yaml
---
title: 'Post Title'
publishedAt: '2024-01-01'
summary: 'Post summary'
tags: ['tag1', 'tag2']
author: 'Author Name'
---
```

2. The `jsonGenerator.js` script automatically processes frontmatter into searchable JSON.

### Custom MDX Components

Add new components to `src/lib/components/MDXComponents.tsx`:

```tsx
const MDXComponents = {
  // Standard HTML elements
  h1: (props) => <CustomHeading as="h1" {...props} />,
  table: MDXTable,

  // Custom components available in MDX
  Alert,
  ProductCard,
  Timeline,
  TableOfContents,
};
```

## 🎨 Styling & UI Patterns

### Chakra UI v3 Migration

- Use **new component API**: `<Table.Root>`, `<Avatar.Root>`, `<Alert.Root>`
- **Color schemes**: `colorScheme="blue"` instead of `colorScheme="blue.500"`
- **Theme tokens**: Access via `_dark={{}}` prop for dark mode variants

### Common UI Patterns

```tsx
// Responsive design
<Box display={{ base: 'block', md: 'flex' }}>

// Dark mode support
<Box bg="white" _dark={{ bg: 'gray.800' }}>

// Chakra v3 components
<Table.Root variant="outline" size="md">
  <Table.Header>
    <Table.Row>
      <Table.ColumnHeader>Header</Table.ColumnHeader>
    </Table.Row>
  </Table.Header>
</Table.Root>
```

## 📝 MDX Content System

### Enhanced Table Support

Tables automatically inherit Chakra UI v3 styling via `remark-gfm`:

```markdown
| Feature | Status | Description |
| ------- | ------ | ----------- |
| Tables  | ✅     | Auto-styled |
```

### Available MDX Components

- `<TableOfContents>` - Auto-generates navigation from headings
- `<Timeline>` / `<TimelineItem>` - Visual timeline components
- `<Alert>` - Themed alert boxes with icons
- `<ProductCard>` - E-commerce style cards
- `<EnhancedTable>` - Advanced table component with custom features
- GitHub-style callouts: `> [!NOTE]`, `> [!WARNING]`, etc.

### Markdown Processing

- **remark-gfm**: GitHub Flavored Markdown (tables, strikethrough, etc.)
- **rehype-slug**: Auto-generates heading IDs for navigation
- **Custom formatting**: Enhanced code blocks with syntax highlighting

## 🔧 Client Component Patterns

### State Management in Interactive Components

```tsx
'use client';

export default function InteractiveComponent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    // Always check isMounted before setState
    fetchData().then((data) => {
      if (isMounted) setData(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);
}
```

### GitHub API Integration

- **Rate Limiting**: Use `next: { revalidate: 3600 }` for caching
- **Error Boundaries**: Implement proper fallbacks for API failures
- **Type Safety**: Use `GitHubRepo` and `GitHubReadme` interfaces from `src/lib/types/github.ts`

## 📱 Responsive & Accessibility

### Mobile-First Approach

```tsx
// Chakra responsive props
<Stack direction={{ base: 'column', md: 'row' }} gap={4}>
  <Box flex="1" minW={{ base: 'full', md: '300px' }}>
```

### Accessibility Requirements

- Always include `aria-label` for IconButtons
- Use semantic HTML elements (`as="nav"`, `as="article"`)
- Provide `alt` text for images
- Ensure keyboard navigation works for interactive elements

## ⚡ Performance Optimizations

### Next.js Features

- **Image Optimization**: Use `next/image` with proper sizing
- **Font Optimization**: Fonts are loaded via `/public/assets/fonts/`
- **Static Generation**: Blog posts are statically generated
- **Edge Runtime**: API routes use edge runtime where specified

### Build Process

- **Pre-build Step**: `generate-json` creates metadata for search/navigation
- **Sitemap Generation**: Automatic via `next-sitemap` in postbuild
- **Bundle Analysis**: Monitor bundle size with `@next/bundle-analyzer`

---

When working with this codebase, prioritize understanding the MDX → React component mapping and the client/server component boundaries. The blog's strength lies in its extensible MDX system and responsive Chakra UI implementation.
