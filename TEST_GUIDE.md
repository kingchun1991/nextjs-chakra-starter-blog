# Testing the Directory System

## 1. Start the Development Server

```bash
pnpm dev
```

Then open your browser to: http://localhost:3000

## 2. Test Directory Features

### View Directory List
- Navigate to: http://localhost:3000/directory
- You should see 2 example items:
  - "Example Directory Item"
  - "Another Item"
- Try the search box - type "example"
- Try the sort dropdown - switch between Title and Date

### View Individual Items
- Click on "Example Directory Item"
- URL should be: http://localhost:3000/directory/example-item
- You should see:
  - Title: "Example Directory Item"
  - Tags: example, demo
  - Wiki-links in the content (blue underlined text)
  - Backlinks section at bottom showing "another-item"

### Test Wiki-Links
- Click on the wiki-link "Another Item" in the content
- Should navigate to: http://localhost:3000/directory/another-item
- Should see backlink showing "example-item"
- Click the backlink to return

### Test Graph Data
1. Open browser console (F12)
2. Go to Network tab
3. Navigate to a directory item
4. Look for request to: `/.json/directory-graph.json`
5. Click it and view the JSON:
   - Should show nodes, edges, backlinks
   - 2 nodes, 2 edges

## 3. Test Content Validation

### Add Invalid Content
```bash
# Create a file with missing title
cat > content/directory/invalid-item.mdx << 'MDXEOF'
---
slug: "invalid-item"
---
Some content without a title
MDXEOF

# Run validation
pnpm validate-content
```

Should show error: "Title is required"

### Add Valid Content
```bash
cat > content/directory/new-item.mdx << 'MDXEOF'
---
title: "My New Item"
slug: "new-item"
description: "Testing the directory system"
tags: ["test"]
publishedAt: "2024-01-22"
---

# My New Item

This item links to [[example-item|the example]].
MDXEOF

# Rebuild
pnpm build
```

Now check:
- http://localhost:3000/directory - should show 3 items
- http://localhost:3000/directory/new-item - new item page
- http://localhost:3000/directory/example-item - should show "new-item" in backlinks

## 4. Test Wiki-Link Features

### Test Fuzzy Matching
Create a link with different casing:
```markdown
[[Example-Item]]  # Should still match "example-item"
[[EXAMPLE_ITEM]]  # Should also match (underscores become hyphens)
```

### Test Display Text
```markdown
[[example-item|Click here]]  # Shows "Click here" but links to example-item
```

### Test Broken Links
```markdown
[[non-existent-item]]  # Should show in broken links during build
```

Run `pnpm build-graph` and check warnings for broken links.

## 5. Test Build & Deploy

### Production Build
```bash
pnpm build
```

Should see:
1. "✓ Validated X directory content file(s)"
2. "✓ Built directory graph: X nodes, Y edges, Z broken links"
3. Next.js build output
4. Sitemap generation

### Check Generated Files
```bash
# View graph data
cat .json/directory-graph.json

# Check static pages
ls -la out/directory/
```

## 6. Test Configuration

### Enable Directory in Navigation
Edit `src/site.config.ts`:

```typescript
navigation: [
  { title: 'Blog', url: '/blog' },
  { title: 'Directory', url: '/directory' }, // Add this
  { title: 'Tags', url: '/tags' },
  { title: 'About', url: '/about' },
],
directory: {
  enabled: true,  // Change to true
  type: 'generic',
  singular: 'Item',
  plural: 'Items',
  // ...
}
```

Restart dev server - "Directory" should appear in navigation.

### Customize Directory Type
Change directory config to "food":

```typescript
directory: {
  enabled: true,
  type: 'food',
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
  // ...
}
```

Now the directory page title will be "Restaurants"!

## 7. Expected Results

### Directory List Page
- ✅ Shows all non-draft items
- ✅ Search filters items
- ✅ Sort changes order
- ✅ Pagination works (if >10 items)
- ✅ Responsive layout

### Directory Item Page
- ✅ MDX content renders correctly
- ✅ Wiki-links are clickable
- ✅ Tags display properly
- ✅ Backlinks section appears if there are any
- ✅ Publish date shows

### Graph System
- ✅ Wiki-links extracted correctly
- ✅ Fuzzy matching works
- ✅ Bidirectional links tracked
- ✅ Broken links detected
- ✅ Graph JSON generated

## 8. Common Issues

### "Cannot find module 'zod'"
```bash
pnpm install
```

### "Directory item not found"
- Check slug matches filename
- Rebuild: `pnpm build`

### Wiki-links not working
- Check syntax: `[[slug]]` or `[[slug|text]]`
- Run: `pnpm build-graph` to see if links are detected

### Backlinks not showing
- Open browser console for errors
- Check if graph JSON loads: `/.json/directory-graph.json`
- Rebuild graph: `pnpm build-graph`

## Next Steps

Once testing is complete, you can:
1. Delete example items: `rm content/directory/*.mdx`
2. Create your own content
3. Customize the config for your use case (food, doctors, repos, etc.)
4. Deploy to Vercel/Netlify/Cloudflare Pages

Happy testing! 🚀
