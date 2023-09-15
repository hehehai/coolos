import { ImageResponse } from "next/server"

// App router includes @vercel/og.
// No need to install it.

export const runtime = "edge"

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 50,
          color: "black",
          background: "white",
          width: "100%",
          height: "100%",
          padding: "50px 200px",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        👋, 🌎
      </div>
    ),
    {
      width: 600,
      height: 430,
      // Supported options: 'twemoji', 'blobmoji', 'noto', 'openmoji', 'fluent' and 'fluentFlat'
      // Default to 'twemoji'
      emoji: "twemoji",
    }
  )
}
