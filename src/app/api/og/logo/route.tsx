import { ImageResponse } from '@vercel/og';

export async function GET() {
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
    }
  );
}
