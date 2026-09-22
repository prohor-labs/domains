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
              backgroundColor: "#252320",
              border: "1px solid #3d3d3a",
              padding: "6px 16px",
              borderRadius: "9999px",
              fontFamily: "sans-serif",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: "500",
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
              fontSize: "62px",
              fontWeight: "400",
              letterSpacing: "-0.03em",
              color: "#faf9f5",
              lineHeight: 1.1,
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
              fontWeight: "400",
              fontFamily: "sans-serif",
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
            fontFamily: "sans-serif",
          }}
        >
          <div style={{ display: "flex", gap: "28px" }}>
            <span>Instant Search</span>
            <span>-</span>
            <span>Free WHOIS Privacy</span>
            <span>-</span>
            <span>Dual USD & BDT Checkout</span>
          </div>
          <span style={{ fontWeight: "600", color: "#e8e0d2" }}>Prohor Domains</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
