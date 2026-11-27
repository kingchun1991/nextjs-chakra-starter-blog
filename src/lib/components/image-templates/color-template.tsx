import type { CSSProperties } from 'react';

import type { OgImageOption } from '@/lib/types/og-image-option';

type ColorTemplateProps = Omit<OgImageOption, 'template'>;

// Inline equivalents of the Tailwind classes previously passed to Satori's
// `tw` prop (`w-screen h-screen flex flex-col justify-center bg-gray-900 ...`).
const containerStyle: CSSProperties = {
  fontFamily: 'Inter',
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: '#111827',
};

const contentStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  padding: '8rem',
};

const centeredContentStyle: CSSProperties = {
  ...contentStyle,
  width: '100vw',
  alignItems: 'center',
  textAlign: 'center',
};

const headingStyle: CSSProperties = {
  fontSize: '3.75rem',
  fontWeight: 700,
  color: '#d1d5db',
  lineHeight: 1.25,
};

const textStyle: CSSProperties = {
  fontWeight: 500,
  fontSize: '1.875rem',
  lineHeight: '2.25rem',
  color: '#d1d5db',
};

export function ColorTemplate({
  heading,
  text,
  center,
  width,
  height,
}: ColorTemplateProps) {
  const aHeight = height ?? 0;
  const aWidth = width ?? 0;
  const blurSize = Math.min(aWidth, aHeight) / 3.2;

  return (
    <div style={containerStyle}>
      <div
        style={{
          position: 'absolute',
          height: `${aHeight.toString()}px`,
          width: `${aWidth.toString()}px`,
          filter: `blur(${blurSize}px) saturate(125%)`,
          backgroundImage:
            'linear-gradient(45deg, #231e26, #a34e11, #199f9d, #102532)',
          opacity: 0.92,
        }}
      />
      <div style={center ? centeredContentStyle : contentStyle}>
        {heading ? <h1 style={headingStyle}>{heading}</h1> : null}
        {text ? <p style={textStyle}>{text}</p> : null}
      </div>
    </div>
  );
}
