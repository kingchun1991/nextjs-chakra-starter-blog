#!/usr/bin/env node

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs';
import { glob } from 'glob';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const CONTENT_DIR = path.join(rootDir, 'content', 'directory');

async function validateContent() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.log('✓ No directory content to validate');
    return true;
  }

  const files = await glob('**/*.mdx', { cwd: CONTENT_DIR });

  if (files.length === 0) {
    console.log('✓ No directory content files found');
    return true;
  }

  let hasErrors = false;
  const errors = [];

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    try {
      const { data: frontmatter } = matter(content);

      // Basic validation
      if (!frontmatter.title) {
        errors.push({
          file,
          field: 'title',
          message: 'Title is required',
        });
        hasErrors = true;
      }

      if (!frontmatter.slug) {
        errors.push({
          file,
          field: 'slug',
          message: 'Slug is required',
        });
        hasErrors = true;
      }
    } catch (error) {
      errors.push({
        file,
        message: `Failed to parse frontmatter: ${error.message}`,
      });
      hasErrors = true;
    }
  }

  if (hasErrors) {
    console.error('\n❌ Content validation failed:\n');
    for (const { file, field, message } of errors) {
      console.error(`  ${file}${field ? ` (${field})` : ''}: ${message}`);
    }
    console.error('');
    return false;
  }

  console.log(`✓ Validated ${files.length} directory content file(s)`);
  return true;
}

validateContent()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error('Validation error:', error);
    process.exit(1);
  });
