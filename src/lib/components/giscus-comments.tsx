'use client';

import { Box } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

import { giscusConfig } from '@/site.config';

const GISCUS_SCRIPT_SRC = 'https://giscus.app/client.js';

const GISCUS_ATTRIBUTES: Record<string, string> = {
  'data-category': 'General',
  'data-category-id': 'DIC_kwDOJ2sHH84CfEZU',
  'data-emit-metadata': '0',
  'data-input-position': 'bottom',
  'data-lang': 'en',
  'data-mapping': 'title',
  'data-reactions-enabled': '1',
  'data-repo': giscusConfig.repo,
  'data-repo-id': giscusConfig.repo_id,
  'data-strict': '0',
  'data-theme': 'preferred_color_scheme',
};

/**
 * Loads the Giscus comments widget after hydration.
 *
 * Giscus' client.js inserts its <iframe> as soon as it runs. Rendered as a
 * <script> in JSX it ran before React hydrated, and the extra iframe broke
 * hydration. The script is now added from an effect into a container that
 * React renders empty and never updates.
 */
export function GiscusComments() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const script = document.createElement('script');
    script.src = GISCUS_SCRIPT_SRC;
    script.async = true;
    script.crossOrigin = 'anonymous';
    for (const [name, value] of Object.entries(GISCUS_ATTRIBUTES)) {
      script.setAttribute(name, value);
    }
    container.append(script);

    return () => {
      container.replaceChildren();
    };
  }, []);

  return <Box className="giscus" ref={containerRef} />;
}
