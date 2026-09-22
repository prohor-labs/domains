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
  const [newsreaderNormal, newsreaderItalic, interNormal, interSemiBold] = await Promise.all([
    readFile(join(process.cwd(), "node_modules/@fontsource/newsreader/files/newsreader-latin-400-normal.woff")),
    readFile(join(process.cwd(), "node_modules/@fontsource/newsreader/files/newsreader-latin-400-italic.woff")),
    readFile(join(process.cwd(), "node_modules/@fontsource/inter/files/inter-latin-400-normal.woff")),
    readFile(join(process.cwd(), "node_modules/@fontsource/inter/files/inter-latin-600-normal.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#181715",
          backgroundImage: "radial-gradient(circle at 50% 0%, #252320 0%, #181715 75%)",
          color: "#faf9f5",
          padding: "60px 72px",
          fontFamily: "Newsreader",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <svg
              viewBox="0 0 1155 1000"
              width="32"
              height="28"
            >
              <polygon points="577.5,0 1155,1000 0,1000" fill="#cc785c" />
            </svg>
            <span
              style={{
                fontSize: "28px",
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
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#252320",
              border: "1px solid #3d3d3a",
              padding: "6px 16px",
              borderRadius: "9999px",
              fontFamily: "Inter",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#a09d96",
                letterSpacing: "0.02em",
              }}
            >
              domains.prohor.dev
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "64px",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              color: "#faf9f5",
              lineHeight: 1.1,
              fontFamily: "Newsreader",
            }}
          >
            <span>
              Buy domains with ease<span style={{ color: "#cc785c" }}>.</span>
            </span>
            <span style={{ color: "#e8e0d2" }}>
              <span style={{ fontStyle: "italic", color: "#cc785c" }}>Pay & forget</span>, your domain our responsibility.
            </span>
          </div>

          <div
            style={{
              fontSize: "22px",
              color: "#a09d96",
              fontWeight: 400,
              fontFamily: "Inter",
              lineHeight: 1.4,
              maxWidth: "880px",
            }}
          >
            Instant availability checks, transparent pricing in USD ($) and BDT (৳), free WHOIS privacy, and automatic DNS routing.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(230, 223, 216, 0.15)",
            paddingTop: "24px",
            fontSize: "15px",
            color: "#8e8b82",
            fontFamily: "Inter",
          }}
        >
          <div style={{ display: "flex", gap: "28px" }}>
            <span>Instant Search</span>
            <span>-</span>
            <span>Free WHOIS Privacy</span>
            <span>-</span>
            <span>Dual USD & BDT Checkout</span>
          </div>
          <span style={{ fontWeight: 600, color: "#e8e0d2" }}>Prohor Domains</span>
        </div>
      </div>
    ),
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
      ],
    }
  );
}
