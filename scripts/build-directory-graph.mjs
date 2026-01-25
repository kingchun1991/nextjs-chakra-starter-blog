#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const CONTENT_DIR = path.join(rootDir, 'content', 'directory');
const OUTPUT_DIR = path.join(rootDir, '.json');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'directory-graph.json');

// Levenshtein distance for fuzzy matching
function levenshteinDistance(str1, str2) {
  const matrix = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}

function normalizeSlug(text) {
  return text
    .toLowerCase()
    .replace(/[_\s]+/g, '-')
    .replace(/[^\w-]/g, '');
}

function extractWikiLinks(content) {
  const wikiLinkRegex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
  const links = [];
  let match;

  while ((match = wikiLinkRegex.exec(content)) !== null) {
    links.push({
      target: match[1].trim(),
      displayText: match[2] ? match[2].trim() : match[1].trim(),
    });
  }

  return links;
}

function fuzzyMatch(linkTarget, slugMap) {
  const normalized = normalizeSlug(linkTarget);

  // Try exact match first
  if (slugMap[normalized]) {
    return slugMap[normalized];
  }

  // Try fuzzy matching with Levenshtein distance < 3
  const candidates = Object.keys(slugMap);
  for (const candidate of candidates) {
    if (levenshteinDistance(normalized, candidate) < 3) {
      return slugMap[candidate];
    }
  }

  return null;
}

async function buildGraph() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.log('✓ No directory content to process');
    return;
  }

  const files = await glob('**/*.mdx', { cwd: CONTENT_DIR });

  if (files.length === 0) {
    console.log('✓ No directory content files found');
    return;
  }

  // Build slug map
  const slugMap = {};
  const fileMap = {};

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter } = matter(content);

    if (frontmatter.slug) {
      const normalizedSlug = normalizeSlug(frontmatter.slug);
      slugMap[normalizedSlug] = frontmatter.slug;
      fileMap[frontmatter.slug] = {
        file,
        title: frontmatter.title || frontmatter.slug,
        tags: frontmatter.tags || [],
      };
    }
  }

  // Extract wiki links and build graph
  const nodes = [];
  const edges = [];
  const backlinks = {};
  const brokenLinks = [];
  const edgeWeights = {};

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content } = matter(fileContent);

    if (!frontmatter.slug) continue;

    const sourceSlug = frontmatter.slug;

    // Add node
    nodes.push({
      id: sourceSlug,
      label: frontmatter.title || sourceSlug,
      type: 'directory',
      tags: frontmatter.tags || [],
    });

    // Extract and process wiki links
    const wikiLinks = extractWikiLinks(content);

    for (const link of wikiLinks) {
      const targetSlug = fuzzyMatch(link.target, slugMap);

      if (targetSlug) {
        const edgeKey = `${sourceSlug}->${targetSlug}`;
        
        if (!edgeWeights[edgeKey]) {
          edgeWeights[edgeKey] = 0;
          edges.push({
            source: sourceSlug,
            target: targetSlug,
            weight: 1,
          });
        }
        
        edgeWeights[edgeKey]++;

        // Track backlinks
        if (!backlinks[targetSlug]) {
          backlinks[targetSlug] = [];
        }
        if (!backlinks[targetSlug].includes(sourceSlug)) {
          backlinks[targetSlug].push(sourceSlug);
        }
      } else {
        brokenLinks.push({
          file,
          link: link.target,
        });
      }
    }
  }

  // Update edge weights
  edges.forEach((edge) => {
    const edgeKey = `${edge.source}->${edge.target}`;
    edge.weight = edgeWeights[edgeKey];
  });

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Write graph data
  const graphData = {
    nodes,
    edges,
    backlinks,
    brokenLinks,
    metadata: {
      totalNodes: nodes.length,
      totalEdges: edges.length,
      generatedAt: new Date().toISOString(),
    },
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(graphData, null, 2));

  console.log(`✓ Built directory graph:`);
  console.log(`  - ${nodes.length} nodes`);
  console.log(`  - ${edges.length} edges`);
  console.log(`  - ${brokenLinks.length} broken links`);

  if (brokenLinks.length > 0) {
    console.warn('\n⚠️  Broken wiki-links found:');
    brokenLinks.forEach(({ file, link }) => {
      console.warn(`  ${file}: [[${link}]]`);
    });
    console.warn('');
  }
}

buildGraph()
  .then(() => {
    console.log('✓ Graph build complete');
  })
  .catch((error) => {
    console.error('Graph build error:', error);
    process.exit(1);
  });
