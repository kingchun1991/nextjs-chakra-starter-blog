import { z } from 'zod';

import { siteConfig } from '@/site.config';

const baseDirectoryItemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  featured: z.boolean().optional().default(false),
  publishedAt: z.string().optional(),
  draft: z.boolean().optional().default(false),
});

export type BaseDirectoryItem = z.infer<typeof baseDirectoryItemSchema>;

export function buildDirectoryItemSchema() {
  const config = siteConfig.directory;

  if (!(config?.enabled && config.fields)) {
    return baseDirectoryItemSchema;
  }

  const customFields: Record<string, z.ZodTypeAny> = {};

  for (const [fieldName, fieldConfig] of Object.entries(config.fields)) {
    let fieldSchema: z.ZodTypeAny;

    switch (fieldConfig.type) {
      case 'string':
        fieldSchema = z.string();
        break;
      case 'number':
        fieldSchema = z.number();
        break;
      case 'boolean':
        fieldSchema = z.boolean();
        break;
      case 'date':
        fieldSchema = z.string();
        break;
      case 'array':
        fieldSchema = z.array(z.string());
        break;
      default:
        fieldSchema = z.string();
    }

    if (fieldConfig.validation) {
      fieldSchema = fieldConfig.validation as z.ZodTypeAny;
    }

    if (!fieldConfig.required) {
      fieldSchema = fieldSchema.optional();
    }

    customFields[fieldName] = fieldSchema;
  }

  return baseDirectoryItemSchema.extend(customFields);
}

export const directoryItemSchema = buildDirectoryItemSchema();

export type DirectoryItem = z.infer<typeof directoryItemSchema>;

export function validateDirectoryItem(frontmatter: unknown): {
  success: boolean;
  data?: DirectoryItem;
  errors?: z.ZodError;
} {
  const result = directoryItemSchema.safeParse(frontmatter);

  if (result.success) {
    return { success: true, data: result.data };
  }

  return { success: false, errors: result.error };
}
