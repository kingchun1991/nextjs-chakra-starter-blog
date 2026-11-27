import type { CSSProperties } from 'react';

import type { OgImageOption } from '@/lib/types/og-image-option';

type BaseTemplateProps = Omit<OgImageOption, 'template'>;

// Inline equivalents of the Tailwind classes previously passed to Satori's
// `tw` prop (`w-screen h-screen p-32 flex flex-col justify-center ...`).
const containerStyle: CSSProperties = {
  fontFamily: 'Inter',
  width: '100vw',
  height: '100vh',
  padding: '8rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: '#121212',
};

const contentStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const centeredContentStyle: CSSProperties = {
  ...contentStyle,
  width: '100%',
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
  color: '#6b7280',
};

export function BaseTemplate({ heading, text, center }: BaseTemplateProps) {
  return (
    <div style={containerStyle}>
      <div style={center ? centeredContentStyle : contentStyle}>
        {heading ? <h1 style={headingStyle}>{heading}</h1> : null}
        {text ? <p style={textStyle}>{text}</p> : null}
      </div>
    </div>
  );
}
