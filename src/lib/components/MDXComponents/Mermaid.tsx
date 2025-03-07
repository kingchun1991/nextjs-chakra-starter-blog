'use client';

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

export const Mermaid = ({
  code,
  style,
}: {
  code: string;
  style?: React.CSSProperties;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      mermaid.initialize({ startOnLoad: false });
      try {
        mermaid.run({ querySelector: `#${ref.current.id}` });
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const containerId = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div
      id={containerId}
      ref={ref}
      className="mermaid"
      style={{
        fontSize: '18px', // Increase font size
        width: '100%', // Adjust width if needed
        ...style, // Allow overriding with a style prop
      }}
    >
      {code}
    </div>
  );
};
