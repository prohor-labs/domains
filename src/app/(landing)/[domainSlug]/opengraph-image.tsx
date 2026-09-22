import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getDomainDetailsAction } from "@/lib/actions/domains";
import { toBdt } from "@/lib/utils/pricing";

export const runtime = "nodejs";

export const alt = "Domain Availability & Intelligence";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ domainSlug: string }>;
}) {
  const { domainSlug } = await params;
  const cleanDomain = decodeURIComponent(domainSlug).toLowerCase().trim();

  let isAvailable = false;
  let priceUsd = 11.99;
  let priceBdt = 1559;
  let registrar = "Private / Proxy";

  try {
    const detail = await getDomainDetailsAction(cleanDomain);
    isAvailable = detail.available;
    priceUsd = detail.price ?? 11.99;
    priceBdt = toBdt(priceUsd);
    registrar = detail.whois?.registrar || "Private / Proxy";
  } catch {}

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

  const parts = cleanDomain.split(".");
  const sld = parts[0];
  const tld = parts.slice(1).join(".") || "com";

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
          <svg viewBox="0 0 1155 1000" width="32" height="28">
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
            gap: "10px",
            backgroundColor: isAvailable
              ? "rgba(93, 184, 114, 0.12)"
              : "#252320",
            border: `1px solid ${isAvailable ? "rgba(93, 184, 114, 0.35)" : "#3d3d3a"}`,
            padding: "8px 20px",
            borderRadius: "9999px",
            fontFamily: "Inter",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "9999px",
              backgroundColor: isAvailable ? "#5db872" : "#8e8b82",
            }}
          />
          <span
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: isAvailable ? "#5db872" : "#a09d96",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {isAvailable ? "Available for Registration" : "Registered"}
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
            alignItems: "baseline",
            fontSize: "88px",
            fontWeight: 400,
            letterSpacing: "-0.03em",
            color: "#faf9f5",
            lineHeight: 1.05,
            fontFamily: "Newsreader",
          }}
        >
          <span>{sld}</span>
          <span style={{ color: "#cc785c" }}>.{tld}</span>
        </div>

        {isAvailable ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "14px",
              }}
            >
              <span
                style={{
                  fontSize: "44px",
                  fontWeight: 400,
                  color: "#faf9f5",
                  fontFamily: "Newsreader",
                }}
              >
                ${priceUsd.toFixed(2)} USD
              </span>
              <span
                style={{
                  fontSize: "26px",
                  fontWeight: 400,
                  color: "#a09d96",
                  fontFamily: "Inter",
                }}
              >
                (৳{priceBdt.toLocaleString()} BDT) / yr
              </span>
            </div>
            <div
              style={{
                fontSize: "19px",
                color: "#a09d96",
                fontFamily: "Inter",
              }}
            >
              <span style={{ color: "#cc785c", fontStyle: "italic" }}>
                Pay & forget
              </span>{" "}
              — your domain, our responsibility.
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              fontSize: "22px",
              color: "#a09d96",
              fontFamily: "Inter",
            }}
          >
            <span>Registrar: {registrar}</span>
            <span>-</span>
            <span>Live WHOIS & DNS Records</span>
          </div>
        )}
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
        <span style={{ fontWeight: 600, color: "#e8e0d2" }}>
          Prohor Domains
        </span>
        <span style={{ color: "#a09d96" }}>domains.prohor.dev</span>
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
