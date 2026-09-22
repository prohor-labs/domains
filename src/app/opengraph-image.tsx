import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";

export const alt = "Prohor Domains — Buy Domains with Ease";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function RootOGImage() {
  const [
    newsreaderNormal,
    newsreaderItalic,
    interNormal,
    interSemiBold,
    notoBengaliNormal,
  ] = await Promise.all([
    readFile(
      join(
        process.cwd(),
        "node_modules/@fontsource/newsreader/files/newsreader-latin-400-normal.woff",
      ),
    ),
    readFile(
      join(
        process.cwd(),
        "node_modules/@fontsource/newsreader/files/newsreader-latin-400-italic.woff",
      ),
    ),
    readFile(
      join(
        process.cwd(),
        "node_modules/@fontsource/inter/files/inter-latin-400-normal.woff",
      ),
    ),
    readFile(
      join(
        process.cwd(),
        "node_modules/@fontsource/inter/files/inter-latin-600-normal.woff",
      ),
    ),
    readFile(
      join(
        process.cwd(),
        "node_modules/@fontsource/noto-sans-bengali/files/noto-sans-bengali-bengali-400-normal.woff",
      ),
    ),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#181715",
        backgroundImage:
          "radial-gradient(circle at 50% 0%, #252320 0%, #181715 75%)",
        color: "#faf9f5",
        padding: "60px 80px",
        fontFamily: "Newsreader",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <svg viewBox="0 0 1155 1000" width="36" height="32">
          <polygon points="577.5,0 1155,1000 0,1000" fill="#cc785c" />
        </svg>
        <span
          style={{
            fontSize: "32px",
            color: "rgba(230, 223, 216, 0.5)",
            fontWeight: 300,
            fontFamily: "Inter",
            lineHeight: "1",
          }}
        >
          \
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "72px",
            fontWeight: 400,
            letterSpacing: "-0.03em",
            color: "#faf9f5",
            lineHeight: 1.2,
            fontFamily: "Newsreader",
          }}
        >
          <span>Buy domains with ease</span>
          <span style={{ color: "#cc785c" }}>.</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "58px",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            color: "#cc785c",
            fontStyle: "italic",
            lineHeight: 1.2,
            fontFamily: "Newsreader",
          }}
        >
          <span>Pay & forget,</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "58px",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            color: "#e8e0d2",
            lineHeight: 1.2,
            fontFamily: "Newsreader",
          }}
        >
          <span>your domain our responsibility</span>
          <span style={{ color: "#cc785c" }}>.</span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          borderTop: "1px solid rgba(230, 223, 216, 0.12)",
          paddingTop: "22px",
        }}
      >
        <span
          style={{
            fontSize: "16px",
            fontWeight: 500,
            color: "#a09d96",
            letterSpacing: "0.06em",
            fontFamily: "Inter",
          }}
        >
          domains.prohor.dev
        </span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Newsreader",
          data: newsreaderNormal,
          weight: 400,
          style: "normal",
        },
        {
          name: "Newsreader",
          data: newsreaderItalic,
          weight: 400,
          style: "italic",
        },
        {
          name: "Inter",
          data: interNormal,
          weight: 400,
          style: "normal",
        },
        {
          name: "Inter",
          data: interSemiBold,
          weight: 600,
          style: "normal",
        },
        {
          name: "Noto Sans Bengali",
          data: notoBengaliNormal,
          weight: 400,
          style: "normal",
        },
      ],
    },
  );
}
