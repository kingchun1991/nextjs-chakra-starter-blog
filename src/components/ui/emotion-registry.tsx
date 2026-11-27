'use client';

import type { EmotionCache } from '@emotion/cache';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';
import type { ReactNode } from 'react';
import { useState } from 'react';

type InsertedStyle = { name: string; isGlobal: boolean };

type Registry = {
  cache: EmotionCache;
  flush: () => Array<InsertedStyle>;
};

const createRegistry = (): Registry => {
  const cache = createCache({ key: 'css' });
  // Collect styles in the cache instead of rendering inline <style> tags
  // next to components, so they can be flushed into <head> below.
  cache.compat = true;

  const insert = cache.insert.bind(cache);
  let inserted: Array<InsertedStyle> = [];
  cache.insert = (...args) => {
    const [selector, serialized] = args;
    if (cache.inserted[serialized.name] === undefined) {
      // <Global> styles are inserted with an empty selector.
      inserted.push({ name: serialized.name, isGlobal: !selector });
    }
    return insert(...args);
  };

  const flush = () => {
    const flushed = inserted;
    inserted = [];
    return flushed;
  };

  return { cache, flush };
};

/**
 * Emotion SSR registry for the App Router.
 *
 * Without it, Emotion renders its <style> tags inline in <body> on the server
 * and moves them to <head> once `@emotion/react` loads in the browser. With
 * Turbopack that move can happen after React has started hydrating, which
 * makes hydration fail (e.g. next-themes' <script> is matched against an
 * Emotion <style>). Flushing the styles through `useServerInsertedHTML` keeps
 * them out of the React tree entirely.
 *
 * @see https://chakra-ui.com/docs/get-started/frameworks/next-app
 */
export function EmotionRegistry({ children }: { children: ReactNode }) {
  const [{ cache, flush }] = useState(createRegistry);

  useServerInsertedHTML(() => {
    const inserted = flush();
    if (inserted.length === 0) {
      return null;
    }

    let styles = '';
    let names = '';
    const globals: Array<{ name: string; style: string }> = [];
    for (const { name, isGlobal } of inserted) {
      const style = cache.inserted[name];
      if (typeof style !== 'string') {
        continue;
      }
      if (isGlobal) {
        globals.push({ name, style });
      } else {
        styles += style;
        names += ` ${name}`;
      }
    }

    // React writes a <style>'s text child as raw CSS (only `</style` is
    // escaped), so dangerouslySetInnerHTML is not needed here.
    return (
      <>
        {globals.map(({ name, style }) => (
          // <Global> looks up its server-rendered tag by this exact attribute.
          <style data-emotion={`${cache.key}-global ${name}`} key={name}>
            {style}
          </style>
        ))}
        {styles ? (
          <style data-emotion={`${cache.key}${names}`}>{styles}</style>
        ) : null}
      </>
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
