import { ImageResponse } from "next/og";
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
  let priceBdt = 1500;
  let registrar = "Private / Proxy";

  try {
    const detail = await getDomainDetailsAction(cleanDomain);
    isAvailable = detail.available;
    priceUsd = detail.price ?? 11.99;
    priceBdt = toBdt(priceUsd);
    registrar = detail.whois?.registrar || "Private / Proxy";
  } catch {
  }

  const parts = cleanDomain.split(".");
  const sld = parts[0];
  const tld = parts.slice(1).join(".") || "com";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0c0a09",
          backgroundImage: "radial-gradient(circle at 50% 0%, #292524 0%, #0c0a09 70%)",
          color: "#fafaf9",
          padding: "60px 70px",
          fontFamily: "sans-serif",
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
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                backgroundColor: "#dc2626",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "bold",
                color: "#ffffff",
              }}
            >
              P
            </div>
            <span
              style={{
                fontSize: "24px",
                fontWeight: "600",
                letterSpacing: "-0.02em",
                color: "#f5f5f4",
              }}
            >
              Prohor Domains
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: isAvailable ? "rgba(16, 185, 129, 0.15)" : "rgba(120, 113, 108, 0.2)",
              border: `1px solid ${isAvailable ? "rgba(16, 185, 129, 0.4)" : "rgba(120, 113, 108, 0.4)"}`,
              padding: "8px 18px",
              borderRadius: "9999px",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "9999px",
                backgroundColor: isAvailable ? "#10b981" : "#a8a29e",
              }}
            />
            <span
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: isAvailable ? "#34d399" : "#d6d3d1",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {isAvailable ? "Available for Registration" : "Registered Domain"}
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              fontSize: "76px",
              fontWeight: "400",
              letterSpacing: "-0.03em",
              color: "#fafaf9",
              lineHeight: 1.1,
            }}
          >
            <span>{sld}</span>
            <span style={{ color: "#ea580c" }}>.{tld}</span>
          </div>

          {isAvailable ? (
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "12px",
                fontSize: "36px",
                fontWeight: "500",
                color: "#f5f5f4",
              }}
            >
              <span>${priceUsd.toFixed(2)} USD</span>
              <span style={{ fontSize: "24px", color: "#a8a29e" }}>
                (৳{priceBdt.toLocaleString()} BDT) / year
              </span>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                fontSize: "22px",
                color: "#a8a29e",
              }}
            >
              <span>Registrar: {registrar}</span>
              <span>-</span>
              <span>Live DNS & WHOIS Records</span>
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(120, 113, 108, 0.3)",
            paddingTop: "24px",
            fontSize: "16px",
            color: "#78716c",
          }}
        >
          <div style={{ display: "flex", gap: "24px" }}>
            <span>Free WHOIS Privacy</span>
            <span>Instant Setup</span>
            <span>Dual USD & BDT Checkout</span>
          </div>
          <span style={{ fontWeight: "600", color: "#a8a29e" }}>domains.prohor.dev</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
