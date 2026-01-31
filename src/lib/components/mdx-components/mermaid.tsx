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
      try {
        mermaid.run({ querySelector: `#${ref.current.id}` });
      } catch (err) {
        console.error(err);
      }
    }
  }, [colorMode]);

  const containerId = `mermaid-${crypto.randomUUID()}`;

  return (
    <div
      className="mermaid"
      id={containerId}
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
