'use client';

import { useColorMode } from '@/components/ui/color-mode';
import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

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

  const containerId = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div
      id={containerId}
      ref={ref}
      className="mermaid"
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
