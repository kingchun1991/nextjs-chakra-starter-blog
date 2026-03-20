#!/usr/bin/env node

/**
 * Setup routing structure based on i18n configuration
 *
 * When i18n is disabled (NEXT_PUBLIC_ENABLE_I18N !== 'true'):
 * - Copies page files from src/app/[locale] to src/app root
 * - Removes [locale] directory to prevent routing conflicts
 *
 * When i18n is enabled:
 * - Ensures [locale] directory exists with all routing files
 * - Removes root-level page files to prevent conflicts
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const appDir = path.join(rootDir, 'src', 'app');
const localeDir = path.join(appDir, '[locale]');
const backupDir = path.join(rootDir, '.locale-backup');

const i18nEnabled = process.env.NEXT_PUBLIC_ENABLE_I18N === 'true';

console.log(`🌐 Setting up routing for i18n: ${i18nEnabled ? 'ENABLED' : 'DISABLED'}`);

/**
 * Copy directory recursively with optional file transformation
 */
function copyDirRecursive(src, dest, transformFile = null) {
  if (!fs.existsSync(src)) {
    return;
  }

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath, transformFile);
    } else {
      if (transformFile) {
        const content = fs.readFileSync(srcPath, 'utf8');
        const transformed = transformFile(content, entry.name, srcPath);
        fs.writeFileSync(destPath, transformed, 'utf8');
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

/**
 * Remove directory recursively
 */
function removeDirRecursive(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      removeDirRecursive(fullPath);
    } else {
      fs.unlinkSync(fullPath);
    }
  }

  fs.rmdirSync(dir);
}

/**
 * Get list of route directories/files that should be at root when i18n is disabled
 */
function getRouteItems() {
  if (!fs.existsSync(localeDir)) {
    return [];
  }

  return fs.readdirSync(localeDir, { withFileTypes: true })
    .filter(entry => {
      // Include all directories and page/layout files
      return entry.isDirectory() ||
             entry.name === 'page.tsx' ||
             entry.name === 'not-found.ts';
    })
    .map(entry => entry.name);
}

/**
 * Transform file content to remove locale parameter when i18n is disabled
 */
function transformForSingleLanguage(content, filename) {
  // Transform page.tsx files to use default 'en' locale instead of params
  if (filename === 'page.tsx') {
    // Handle params with both slug and locale
    content = content.replace(
      /params: Promise<\{ slug: string; locale: string \}>;?/g,
      'params: Promise<{ slug: string }>;'
    );
    content = content.replace(
      /const \{ slug, locale \} = await params;/g,
      "const { slug } = await params;\n  const locale = 'en';"
    );

    // Handle params with only locale
    content = content.replace(
      /params: Promise<\{ locale: string \}>;?/g,
      'params?: never;'
    );
    content = content.replace(
      /const \{ locale \} = await params;/g,
      "const locale = 'en';"
    );

    // Fix function signature for pages without params
    content = content.replace(
      /async function (\w+)\(\{ params \}: Props\)/g,
      'async function $1(): Props'
    );
    content = content.replace(
      /export default async function (\w+)\(\{ params \}: Props\)/g,
      'export default async function $1(): Props'
    );

    // Update generateStaticParams to only return slug (not locale)
    content = content.replace(
      /const locales = \['en', 'zh-TW'\];[\s\S]*?const params: Array<\{ locale: string; slug: string \}> = \[\];[\s\S]*?for \(const locale of locales\) \{[\s\S]*?const posts = await getFiles\('blog', locale\);[\s\S]*?for \(const post of posts\) \{[\s\S]*?params\.push\(\{[\s\S]*?locale,[\s\S]*?slug: post\.replace\(MDX_EXTENSION_REGEX, ''\),[\s\S]*?\}\);[\s\S]*?\}[\s\S]*?\}[\s\S]*?return params;/g,
      "const locale = 'en';\n  const posts = await getFiles('blog', locale);\n  return posts.map(post => ({\n    slug: post.replace(MDX_EXTENSION_REGEX, ''),\n  }));"
    );
  }

  // Transform layout.tsx to not expect locale param
  if (filename === 'layout.tsx') {
    content = content.replace(
      /params: Promise<\{ locale: string \}>;?/g,
      'params?: never;'
    );
    content = content.replace(
      /const \{ locale \} = await params;/g,
      "const locale = 'en';"
    );
    content = content.replace(
      /\{ children, params \}/g,
      '{ children }'
    );
  }

  return content;
}

/**
 * Setup for when i18n is DISABLED
 * Copies files from [locale] to app root and backs up [locale]
 */
function setupSingleLanguage() {
  console.log('📝 Setting up single-language routing...');

  // First, backup [locale] directory if it exists and backup doesn't exist
  if (fs.existsSync(localeDir) && !fs.existsSync(backupDir)) {
    console.log('💾 Backing up [locale] directory...');
    copyDirRecursive(localeDir, backupDir);
  }

  // Copy routes from [locale] to app root with transformation
  const routes = getRouteItems();

  for (const route of routes) {
    const srcPath = path.join(localeDir, route);
    const destPath = path.join(appDir, route);

    if (fs.existsSync(srcPath)) {
      if (fs.statSync(srcPath).isDirectory()) {
        console.log(`  📁 Copying ${route}/ to root...`);
        copyDirRecursive(srcPath, destPath, transformForSingleLanguage);
      } else {
        console.log(`  📄 Copying ${route} to root...`);
        const content = fs.readFileSync(srcPath, 'utf8');
        const transformed = transformForSingleLanguage(content, route);
        fs.writeFileSync(destPath, transformed, 'utf8');
      }
    }
  }

  // Remove [locale] directory to avoid routing conflicts
  if (fs.existsSync(localeDir)) {
    console.log('🗑️  Removing [locale] directory...');
    removeDirRecursive(localeDir);
  }

  console.log('✅ Single-language routing setup complete!');
}

/**
 * Setup for when i18n is ENABLED
 * Restores [locale] directory and removes root-level routes
 */
function setupMultiLanguage() {
  console.log('📝 Setting up multi-language routing...');

  // Restore [locale] directory from backup if needed
  if (!fs.existsSync(localeDir) && fs.existsSync(backupDir)) {
    console.log('📦 Restoring [locale] directory from backup...');
    copyDirRecursive(backupDir, localeDir);
  }

  // Ensure [locale] exists
  if (!fs.existsSync(localeDir)) {
    console.error('❌ Error: [locale] directory not found and no backup available!');
    process.exit(1);
  }

  // Remove root-level routes that should only be in [locale]
  const routes = getRouteItems();

  for (const route of routes) {
    const rootPath = path.join(appDir, route);

    if (fs.existsSync(rootPath) && rootPath !== localeDir) {
      if (fs.statSync(rootPath).isDirectory()) {
        console.log(`  🗑️  Removing root ${route}/...`);
        removeDirRecursive(rootPath);
      } else {
        console.log(`  🗑️  Removing root ${route}...`);
        fs.unlinkSync(rootPath);
      }
    }
  }

  console.log('✅ Multi-language routing setup complete!');
}

// Main execution
try {
  if (i18nEnabled) {
    setupMultiLanguage();
  } else {
    setupSingleLanguage();
  }
} catch (error) {
  console.error('❌ Error setting up routing:', error);
  process.exit(1);
}
