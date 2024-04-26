import { ImageResponse } from '@vercel/og';

import { outfitBold, outfitMedium } from 'lib/utils/font/outfit';

export async function GET() {
  const outfitMediumFontData = await outfitMedium;
  const outfitBoldFontData = await outfitBold;
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 50,
          color: 'teal',
          background: 'transparent',
          width: '100%',
          height: '100%',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        N.
      </div>
    ),
    {
      width: 100,
      height: 100,
      fonts: [
        {
          name: 'Outfit',
          data: outfitMediumFontData,
          weight: 500,
        },
        {
          name: 'Outfit',
          data: outfitBoldFontData,
          weight: 700,
        },
      ],
    }
  );
}
