import { useState, useEffect } from "react";

const shimmerStyle = {
    background: "linear-gradient(90deg, #e2e8f0 25%, #f8fafc 50%, #e2e8f0 75%)",
    backgroundSize: "800px 100%",
    animation: "shimmer 1.6s infinite linear",
    borderRadius: "6px",
};

const amberShimmer = {
    background: "linear-gradient(90deg, #d97706 25%, #fbbf24 50%, #d97706 75%)",
    backgroundSize: "800px 100%",
    animation: "shimmer 1.6s infinite linear",
    borderRadius: "6px",
};

const purpleShimmer = {
    background: "linear-gradient(90deg, #6d28d9 25%, #8b5cf6 50%, #6d28d9 75%)",
    backgroundSize: "800px 100%",
    animation: "shimmer 1.6s infinite linear",
    borderRadius: "9999px",
};

const heroShimmer = {
    background: "linear-gradient(90deg, #c7d2e8 25%, #dde6f5 50%, #c7d2e8 75%)",
    backgroundSize: "800px 100%",
    animation: "shimmer 1.6s infinite linear",
};

const globalCSS = `
  @keyframes shimmer {
    0%   { background-position: -800px 0; }
    100% { background-position:  800px 0; }
  }
  @keyframes pulse-dot {
    0%, 100% { opacity: 0.35; transform: scale(1); }
    50%       { opacity: 1;    transform: scale(1.3); }
  }
  .sk-dot { animation: pulse-dot 1.4s ease-in-out infinite; }
  .sk-dot:nth-child(1) { animation-delay: 0s; }
  .sk-dot:nth-child(2) { animation-delay: 0.18s; }
  .sk-dot:nth-child(3) { animation-delay: 0.36s; }
  .sk-dot:nth-child(4) { animation-delay: 0.54s; }
`;

/* ─── Primitive ─────────────────────────────────────────── */
function Bone({ width, height, style = {}, className = "", rounded = false }) {
    return (
        <div
            className={className}
            style={{
                ...shimmerStyle,
                width,
                height,
                borderRadius: rounded ? "9999px" : "6px",
                flexShrink: 0,
                ...style,
            }}
        />
    );
}

/* ─── Navbar ─────────────────────────────────────────────── */
function NavbarSkeleton() {
    return (
        <nav
            style={{
                width: "100%",
                height: "64px",
                background: "#fff",
                borderBottom: "1px solid #f1f5f9",
                display: "flex",
                alignItems: "center",
                padding: "0 32px",
                gap: "0",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                position: "relative",
                zIndex: 10,
            }}
        >
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginRight: "48px" }}>
                <Bone width={32} height={32} rounded />
                <Bone width={130} height={18} />
            </div>

            {/* Nav links */}
            <div style={{ display: "flex", alignItems: "center", gap: "32px", flex: 1 }}>
                {[48, 80, 80, 96].map((w, i) => (
                    <Bone key={i} width={w} height={14} />
                ))}
            </div>

            {/* Right controls */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <Bone width={20} height={20} rounded />
                <Bone width={48} height={24} style={{ borderRadius: "9999px" }} />
                <Bone width={20} height={20} rounded />
                <Bone width={40} height={40} rounded />
            </div>
        </nav>
    );
}

/* ─── Hero / Slider ──────────────────────────────────────── */
function HeroSkeleton() {
    return (
        <section
            style={{
                position: "relative",
                width: "100%",
                height: "560px",
                overflow: "hidden",
            }}
        >
            {/* BG */}
            <div style={{ ...heroShimmer, position: "absolute", inset: 0 }} />

            {/* Slide counter */}
            <div style={{ position: "absolute", top: 16, right: 24 }}>
                <Bone width={36} height={14} style={{ opacity: 0.6 }} />
            </div>

            {/* Left arrow */}
            <div
                style={{
                    position: "absolute",
                    left: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                }}
            >
                <Bone width={36} height={36} rounded style={{ opacity: 0.7 }} />
            </div>

            {/* Right arrow */}
            <div
                style={{
                    position: "absolute",
                    right: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                }}
            >
                <Bone width={36} height={36} rounded style={{ opacity: 0.7 }} />
            </div>

            {/* Centered content */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "20px",
                }}
            >
                {/* Headline */}
                <Bone width={380} height={40} style={{ opacity: 0.7 }} />

                {/* Sub-headline */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                    <Bone width={280} height={14} style={{ opacity: 0.55 }} />
                    <Bone width={220} height={14} style={{ opacity: 0.45 }} />
                </div>

                {/* Search row */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px" }}>
                    <Bone width={320} height={44} style={{ opacity: 0.8, borderRadius: "8px" }} />
                    <div
                        style={{
                            ...amberShimmer,
                            width: 96,
                            height: 44,
                            borderRadius: "8px",
                            opacity: 0.85,
                            flexShrink: 0,
                        }}
                    />
                </div>

                {/* CTA */}
                <div
                    style={{
                        ...purpleShimmer,
                        width: 176,
                        height: 44,
                        opacity: 0.85,
                    }}
                />
            </div>

            {/* Dots */}
            <div
                style={{
                    position: "absolute",
                    bottom: 20,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                }}
            >
                {[true, false, false, false].map((active, i) => (
                    <div
                        key={i}
                        className="sk-dot"
                        style={{
                            ...shimmerStyle,
                            width: active ? 10 : 8,
                            height: active ? 10 : 8,
                            borderRadius: "9999px",
                            opacity: active ? 0.9 : 0.45,
                        }}
                    />
                ))}
            </div>
        </section>
    );
}

/* ─── Card ───────────────────────────────────────────────── */
function CardSkeleton({ titleWidth = "75%", subWidth = "50%" }) {
    return (
        <div
            style={{
                border: "1px solid #f1f5f9",
                borderRadius: "14px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
                background: "#fff",
            }}
        >
            <Bone width="100%" height={160} style={{ borderRadius: "10px" }} />
            <Bone width={titleWidth} height={16} />
            <Bone width={subWidth} height={12} />
            <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                <Bone width={64} height={32} style={{ borderRadius: "9999px" }} />
                <Bone width={80} height={32} style={{ borderRadius: "9999px" }} />
            </div>
        </div>
    );
}

/* ─── Below-fold ─────────────────────────────────────────── */
function BelowFoldSkeleton() {
    const cards = [
        { titleWidth: "75%", subWidth: "50%" },
        { titleWidth: "83%", subWidth: "42%" },
        { titleWidth: "66%", subWidth: "38%" },
    ];

    return (
        <section
            style={{
                maxWidth: "1120px",
                margin: "0 auto",
                padding: "48px 32px",
            }}
        >
            <Bone width={192} height={24} style={{ marginBottom: "32px" }} />
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "24px",
                }}
            >
                {cards.map((c, i) => (
                    <CardSkeleton key={i} {...c} />
                ))}
            </div>
        </section>
    );
}

/* ─── Root ───────────────────────────────────────────────── */
export default function LandingSkelitonLoader() {
    const [loaded, setLoaded] = useState(false);

    /* Demo: flip to "loaded" after 3 s so you can see the transition */
    useEffect(() => {
        const t = setTimeout(() => setLoaded(true), 3000);
        return () => clearTimeout(t);
    }, []);

    return (
        <>
            <style>{globalCSS}</style>

            {!loaded ? (
                <div style={{ fontFamily: "sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
                    <NavbarSkeleton />
                    <HeroSkeleton />
                    <BelowFoldSkeleton />
                </div>
            ) : (
                /* ── Placeholder "real" content so you can see the swap ── */
                <div
                    style={{
                        minHeight: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "sans-serif",
                        fontSize: "1.25rem",
                        color: "#6d28d9",
                        fontWeight: 600,
                    }}
                >
                    🎉 Page loaded! Replace this with your real content.
                </div>
            )}
        </>
    );
}