# Internationalization Guide

This project uses [next-intl](https://next-intl-docs.vercel.app/) for i18n support.

i18n is **disabled by default**. Enable it with the environment variable:

```bash
NEXT_PUBLIC_ENABLE_I18N=true
```

---

## Single Source of Truth: `src/i18n/locales.ts`

All locale configuration lives in one file:

```ts
export const locales = ['en', 'zh-TW'] as const;

export const defaultLocale = 'en';

export const localeLabels: Record<string, string> = {
  en: 'English',
  'zh-TW': '繁體中文',
};
```

- **`locales`** — the list of supported locale codes. Consumed by `routing.ts` and `request.ts`.
- **`defaultLocale`** — the fallback locale when none is detected.
- **`localeLabels`** — human-readable display names used by the language switcher in the header.

> Do **not** define locale codes or labels anywhere else. `routing.ts` and `language-switcher.tsx` both import from this file.

---

## Adding a New Locale

1. **`src/i18n/locales.ts`** — add the code to `locales` and the label to `localeLabels`:

   ```ts
   export const locales = ['en', 'zh-TW', 'es'] as const;

   export const localeLabels: Record<string, string> = {
     en: 'English',
     'zh-TW': '繁體中文',
     es: 'Español',
   };
   ```

2. **`messages/<locale>.json`** — create a translation file:

   ```bash
   cp messages/en.json messages/es.json
   # then translate the values inside
   ```

That's it. The language switcher and routing pick up the new locale automatically.

---

## Removing a Locale

1. Remove the code from `locales` in `src/i18n/locales.ts`.
2. Remove its entry from `localeLabels`.
3. Optionally delete `messages/<locale>.json`.

---

## File Structure

```
src/i18n/
├── locales.ts   # ← edit here to add/remove locales and labels
├── routing.ts   # consumes locales + defaultLocale from locales.ts
└── request.ts   # loads messages/<locale>.json at request time

messages/
├── en.json
└── zh-TW.json

src/lib/layout/
└── language-switcher.tsx  # imports localeLabels from src/i18n/locales.ts
```

---

## Locale Prefix

The routing is configured with `localePrefix: 'as-needed'` in `src/i18n/routing.ts`.  
This means the default locale (`en`) has no URL prefix (`/about`), while other locales do (`/zh-TW/about`).
