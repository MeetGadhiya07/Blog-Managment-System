import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #334155, #1e293b)',
      }}
    >
      <div
        style={{
          fontSize: 120,
          fontWeight: 'bold',
          color: 'white',
        }}
      >
        Blog CMS
      </div>
      <div
        style={{
          fontSize: 40,
          color: 'white',
          marginTop: 20,
          opacity: 0.9,
        }}
      >
        Complete Blog Management System
      </div>
    </div>,
    { ...size },
  );
}
