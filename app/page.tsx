"use client";

import { LaserFlow } from "@/components/ui/LaserFlow";
import { useRef } from "react";
import Image from "next/image";

export default function Page() {
  const revealImgRef = useRef<HTMLImageElement | null>(null);

  return (
    <div>
      {/* Image Example Interactive Reveal Effect */}
      <div
        style={{
          height: "1000px",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#050505ff",
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const el = revealImgRef.current;
          if (el) {
            el.style.setProperty("--mx", `${x}px`);
            el.style.setProperty("--my", `${y + rect.height * 0.5}px`);
          }
        }}
        onMouseLeave={() => {
          const el = revealImgRef.current;
          if (el) {
            el.style.setProperty("--mx", "-9999px");
            el.style.setProperty("--my", "-9999px");
          }
        }}
      >
        <LaserFlow
          horizontalBeamOffset={0.1}
          verticalBeamOffset={0.0}
          color="#fdfbfcff"
        />

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -2%)",
            width: "86%",
            height: "90%",
            backgroundColor: "#020202ff",
            borderRadius: "20px",
            border: "2px solid #fcf9fbff",
            overflow: "hidden", // important to clip image
            zIndex: 6,
          }}
        >
          <Image
            src="/image.png"
            alt="Logo"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        <img
          ref={revealImgRef}
          src="/path/to/image.jpg"
          alt="Reveal effect"
          style={{
            position: "absolute",
            width: "100%",
            top: "-50%",
            zIndex: 5,
            mixBlendMode: "lighten",
            opacity: 0.3,
            pointerEvents: "none",
            WebkitMaskImage:
              "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)",
            maskImage:
              "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            // ✅ TypeScript-safe fix for custom CSS variables:
          } as React.CSSProperties & Record<string, string>}
        />
      </div>
    </div>
  );
}
