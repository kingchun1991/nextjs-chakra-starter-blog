'use client';

import mermaid from 'mermaid';
import { useEffect, useRef } from 'react';

import { useColorMode } from '@/components/ui/color-mode';

export const Mermaid = ({
  code,
  style,
}: {
  code: string;
  style?: React.CSSProperties;
}) => {
  const { colorMode } = useColorMode();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      mermaid.initialize({
        startOnLoad: false,
        theme: colorMode === 'dark' ? 'dark' : 'default',
      });
      // Pass the node itself: a random id generated during render would differ
      // between the server HTML and the client and break hydration.
      mermaid.run({ nodes: [ref.current] }).catch((err: unknown) => {
        console.error(err);
      });
    }
  }, [colorMode]);

  return (
    <div
      className="mermaid"
      ref={ref}
      style={{
        fontSize: '18px',
        width: '100%',
        ...style,
      }}
    >
      {code}
    </div>
  );
};
