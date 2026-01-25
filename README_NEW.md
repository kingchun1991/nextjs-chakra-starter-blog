# Next.js Chakra Starter Blog + Directory Template

A powerful, feature-rich blog and directory template built with Next.js 15, Chakra UI v3, and TypeScript. Perfect for creating content-rich sites with interconnected knowledge bases.

## ✨ Features

### Core Features
- 📝 **Blog System** - Full-featured blog with MDX support
- 📁 **Directory System** - Flexible directory for any content type (restaurants, doctors, repos, etc.)
- 🔗 **Wiki-Links** - Create connections between items with `[[slug]]` syntax
- 🕸️ **Graph System** - Automatic relationship tracking and backlinks
- 🔍 **Pagefind Search** - Fast static search across all content
- 🎨 **Chakra UI v3** - Modern, accessible component library
- 🌓 **Dark Mode** - Built-in dark mode support
- ⚡ **Next.js 15** - Latest Next.js with App Router
- 📱 **Responsive** - Mobile-first responsive design
- 🚀 **SEO Optimized** - Built-in SEO and OG image generation

### Directory System Features
- **Flexible Content Types** - Configure for food, doctors, repos, or any custom type
- **Custom Fields** - Add type-specific fields with validation
- **Wiki-Link Processing** - Fuzzy matching with Levenshtein distance
- **Bidirectional Backlinks** - Automatic tracking of incoming references
- **Tag System** - Organize with tags and filtering
- **Search & Sort** - Client-side filtering and sorting
- **Validation** - Zod-based frontmatter validation
- **Graph Generation** - Build-time graph data generation

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/your-repo/nextjs-chakra-starter-blog.git
cd nextjs-chakra-starter-blog

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit http://localhost:3000

## 📁 Project Structure

```
├── content/
│   ├── blog/              # Blog posts (.mdx)
│   ├── directory/         # Directory items (.mdx)
│   └── about/             # About page content
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── blog/          # Blog routes
│   │   └── directory/     # Directory routes
│   ├── lib/
│   │   ├── components/    # Reusable components
│   │   │   └── directory/ # Directory-specific components
│   │   ├── pages/         # Page components
│   │   │   ├── directory-list/
│   │   │   └── directory-item/
│   │   ├── layout/        # Layout components
│   │   ├── schemas/       # Zod validation schemas
│   │   └── utils/         # Utility functions
│   ├── components/ui/     # Chakra UI components
│   └── site.config.ts     # Site configuration
├── scripts/
│   ├── validate-content.mjs       # Content validation
│   └── build-directory-graph.mjs  # Graph builder
└── public/                # Static assets
```

## 🎯 Configuration

### Site Configuration (`src/site.config.ts`)

```typescript
export const siteConfig = {
  title: 'Your Site Name',
  url: 'https://yoursite.com',
  
  // Enable and configure directory
  directory: {
    enabled: true,
    type: 'food',  // 'food', 'doctor', 'github', or custom
    singular: 'Restaurant',
    plural: 'Restaurants',
    fields: {
      address: {
        type: 'string',
        required: false,
        label: 'Address',
      },
      rating: {
        type: 'number',
        required: false,
        label: 'Rating',
      },
    },
    graph: {
      maxNodes: 1000,
      itemDepth: 2,
      globalDepth: 3,
      minEdgeWeight: 1,
    },
  },
  
  // Search configuration
  search: {
    provider: 'pagefind',
    maxResults: 50,
    debounceMs: 300,
  },
};
```

## 📝 Creating Content

### Blog Posts

Create `content/blog/my-post.mdx`:

```markdown
---
title: "My Blog Post"
slug: "my-post"
summary: "A brief summary"
publishedAt: "2024-01-24"
tags: ["tutorial"]
author: "Your Name"
---

# My Blog Post

Your content here...
```

### Directory Items

Create `content/directory/my-item.mdx`:

```markdown
---
title: "My Directory Item"
slug: "my-item"
description: "Brief description"
tags: ["example"]
publishedAt: "2024-01-24"
---

# My Directory Item

Link to other items: [[another-item]]

Or with custom text: [[another-item|Another Item]]
```

## 🔗 Wiki-Links

Wiki-links create bidirectional connections between directory items:

```markdown
[[slug]]                    # Basic link
[[slug|Display Text]]       # Custom display text
[[Example-Item]]            # Case insensitive
[[EXAMPLE_ITEM]]            # Underscores → hyphens
```

### Features
- **Fuzzy Matching** - Handles case, spaces, underscores
- **Bidirectional** - Backlinks automatically tracked
- **Broken Link Detection** - Build-time warnings
- **Graph Visualization** - Relationship mapping

## 🔍 Search

Powered by [Pagefind](https://pagefind.app/) for fast static search:

- **Zero JavaScript** - Works with JS disabled
- **Instant Results** - Client-side indexing
- **Highlighting** - Search term highlighting
- **Filters** - Filter by content type

## 🛠️ Development

```bash
# Development
pnpm dev

# Build
pnpm build

# Start production server
pnpm start

# Type checking
pnpm type:check

# Linting
pnpm biome:check
pnpm biome:fix

# Content validation
pnpm validate-content

# Build graph
pnpm build-graph
```

## 📦 Build Process

```bash
pnpm build
```

Steps:
1. Generate search JSON
2. Next.js build (static export)
3. Validate directory content
4. Build wiki-link graph
5. Generate sitemap
6. Index with Pagefind

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

Or connect your GitHub repo in the Vercel dashboard.

### Netlify

Add `netlify.toml`:

```toml
[build]
  command = "pnpm build"
  publish = "out"
```

### Cloudflare Pages

1. Connect GitHub repository
2. Build command: `pnpm build`
3. Output directory: `out`

## 🎨 Customization

### Directory Types

#### Food/Restaurant Directory
```typescript
directory: {
  type: 'food',
  fields: {
    address: { type: 'string', label: 'Address' },
    cuisine: { type: 'string', label: 'Cuisine' },
    rating: { type: 'number', label: 'Rating' },
  },
}
```

#### Doctor/Healthcare Directory
```typescript
directory: {
  type: 'doctor',
  fields: {
    specialty: { type: 'string', required: true, label: 'Specialty' },
    hospital: { type: 'string', label: 'Hospital' },
  },
}
```

#### GitHub Repository Directory
```typescript
directory: {
  type: 'github',
  fields: {
    stars: { type: 'number', label: 'Stars' },
    language: { type: 'string', label: 'Language' },
  },
}
```

### Custom Fields with Validation

```typescript
import { z } from 'zod';

fields: {
  email: {
    type: 'string',
    required: true,
    label: 'Email',
    validation: z.string().email(),
  },
}
```

## 📚 Documentation

- [Usage Guide](content/blog/using-this-template.mdx) - Comprehensive guide
- [Testing Guide](TEST_GUIDE.md) - How to test features
- [Specification](SPEC.md) - Architecture details
- [Contributing](CONTRIBUTING.md) - How to contribute

## 🧪 Testing

```bash
# Run E2E tests
pnpm test:e2e

# Type checking
pnpm type:check

# Lint checking
pnpm biome:check
```

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Chakra UI](https://chakra-ui.com/)
- [Pagefind](https://pagefind.app/)
- [MDX](https://mdxjs.com/)
- [Zod](https://zod.dev/)

## 🌟 Star History

If you find this template useful, please consider giving it a star! ⭐

## 📞 Support

- [GitHub Issues](https://github.com/your-repo/issues)
- [Discussions](https://github.com/your-repo/discussions)

---

Built with ❤️ using Next.js and Chakra UI
