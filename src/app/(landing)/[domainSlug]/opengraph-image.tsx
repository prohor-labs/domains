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
          backgroundColor: "#181715",
          backgroundImage: "radial-gradient(circle at 50% 0%, #252320 0%, #181715 75%)",
          color: "#faf9f5",
          padding: "60px 72px",
          fontFamily: "serif",
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
              gap: "10px",
            }}
          >
            <svg
              viewBox="0 0 1155 1000"
              width="28"
              height="24"
              fill="#cc785c"
            >
              <path d="m577.3 0 577.4 1000H0z" />
            </svg>
            <span
              style={{
                fontSize: "24px",
                color: "rgba(230, 223, 216, 0.4)",
                fontWeight: "300",
                fontFamily: "sans-serif",
              }}
            >
              \
            </span>
            <span
              style={{
                fontSize: "26px",
                fontWeight: "500",
                color: "#faf9f5",
                letterSpacing: "-0.02em",
              }}
            >
              .dev
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: isAvailable ? "rgba(93, 184, 114, 0.15)" : "#252320",
              border: `1px solid ${isAvailable ? "rgba(93, 184, 114, 0.4)" : "#3d3d3a"}`,
              padding: "8px 18px",
              borderRadius: "9999px",
              fontFamily: "sans-serif",
            }}
          >
            <div
              style={{
                width: "9px",
                height: "9px",
                borderRadius: "9999px",
                backgroundColor: isAvailable ? "#5db872" : "#8e8b82",
              }}
            />
            <span
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: isAvailable ? "#5db872" : "#a09d96",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {isAvailable ? "Available for Registration" : "Currently Registered"}
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
              fontSize: "80px",
              fontWeight: "400",
              letterSpacing: "-0.03em",
              color: "#faf9f5",
              lineHeight: 1.05,
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
                gap: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "14px",
                  fontSize: "38px",
                  fontWeight: "400",
                  color: "#faf9f5",
                }}
              >
                <span>${priceUsd.toFixed(2)} USD</span>
                <span style={{ fontSize: "24px", color: "#a09d96", fontFamily: "sans-serif" }}>
                  (৳{priceBdt.toLocaleString()} BDT) / yr
                </span>
              </div>
              <div
                style={{
                  fontSize: "18px",
                  color: "#a09d96",
                  fontFamily: "sans-serif",
                }}
              >
                Pay & forget — your domain, our responsibility.
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
                fontFamily: "sans-serif",
              }}
            >
              <span>Registrar: {registrar}</span>
              <span>-</span>
              <span>Live WHOIS & DNS Intelligence</span>
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
            fontFamily: "sans-serif",
          }}
        >
          <div style={{ display: "flex", gap: "28px" }}>
            <span>Free WHOIS Privacy</span>
            <span>-</span>
            <span>Managed DNS</span>
            <span>-</span>
            <span>Dual USD & BDT Checkout</span>
          </div>
          <span style={{ fontWeight: "600", color: "#e8e0d2" }}>domains.prohor.dev</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
