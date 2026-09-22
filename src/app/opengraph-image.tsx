import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "Prohor Domains — Buy Domains with Ease";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function RootOGImage() {
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
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                backgroundColor: "#dc2626",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                fontWeight: "bold",
                color: "#ffffff",
              }}
            >
              P
            </div>
            <span
              style={{
                fontSize: "26px",
                fontWeight: "600",
                letterSpacing: "-0.02em",
                color: "#f5f5f4",
              }}
            >
              Prohor Domains
            </span>
          </div>

          <span
            style={{
              fontSize: "15px",
              fontWeight: "500",
              color: "#a8a29e",
              backgroundColor: "rgba(120, 113, 108, 0.2)",
              padding: "6px 16px",
              borderRadius: "9999px",
              border: "1px solid rgba(120, 113, 108, 0.4)",
            }}
          >
            Domain Intelligence Platform
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              fontWeight: "600",
              letterSpacing: "-0.03em",
              color: "#fafaf9",
              lineHeight: 1.1,
            }}
          >
            Buy domains with ease.
          </div>

          <div
            style={{
              fontSize: "28px",
              color: "#a8a29e",
              fontWeight: "400",
              maxWidth: "800px",
            }}
          >
            Pay & forget — your domain, our responsibility. Instant search, live availability, and dual USD & BDT checkout.
          </div>
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
            <span>Live Availability</span>
            <span>Free WHOIS Privacy</span>
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
