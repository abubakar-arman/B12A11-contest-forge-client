const globalCSS = `
  @keyframes shimmer {
    0%   { background-position: -800px 0; }
    100% { background-position:  800px 0; }
  }
  .sk {
    background: linear-gradient(90deg, #e2e8f0 25%, #f8fafc 50%, #e2e8f0 75%);
    background-size: 800px 100%;
    animation: shimmer 1.6s infinite linear;
    border-radius: 5px;
  }
  .sk-teal {
    background: linear-gradient(90deg, #2dd4a0 25%, #4eedb8 50%, #2dd4a0 75%);
    background-size: 800px 100%;
    animation: shimmer 1.6s infinite linear;
    border-radius: 8px;
  }
  .sk-dark {
    background: linear-gradient(90deg, #2d3748 25%, #4a5568 50%, #2d3748 75%);
    background-size: 800px 100%;
    animation: shimmer 1.6s infinite linear;
    border-radius: 8px;
  }
`;

function Bone({ className = "", variant = "default" }) {
    const cls =
        variant === "teal" ? "sk-teal" : variant === "dark" ? "sk-dark" : "sk";
    return <div className={`${cls} ${className}`} />;
}

/* ── Single meta row (icon + value) ── */
function MetaLine({ iconW = "w-4", valueW = "w-10" }) {
    return (
        <div className="flex items-center gap-2">
            <Bone className={`${iconW} h-4 rounded-full`} />
            <Bone className={`${valueW} h-3`} />
        </div>
    );
}

/* ── One contest row skeleton ── */
function ContestRowSkeleton() {
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-start gap-5 p-5">
                {/* Thumbnail */}
                <Bone className="w-36 h-28 rounded-lg flex-shrink-0" />

                {/* Content */}
                <div className="flex-1 flex flex-col gap-3 min-w-0">
                    {/* Title */}
                    <Bone className="w-56 h-6" />

                    {/* Meta lines */}
                    <div className="flex flex-col gap-2 mt-1">
                        <MetaLine iconW="w-4" valueW="w-6" />
                        <MetaLine iconW="w-4" valueW="w-14" />
                        <MetaLine iconW="w-4" valueW="w-24" />
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3 flex-shrink-0 self-center">
                    <Bone variant="dark" className="w-32 h-10" />
                    <Bone variant="teal" className="w-20 h-10" />
                </div>
            </div>

            {/* Description line — full width bottom strip */}
            <div className="px-5 pb-5 border-t border-gray-50 pt-4 flex flex-col gap-2">
                <Bone className="w-full h-3" />
                <Bone className="w-3/4 h-3" />
            </div>
        </div>
    );
}

/* ── Root component ── */
export default function DashboardSkeleton() {
    return (
        <>
            <style>{globalCSS}</style>

            <div className="min-h-screen bg-gray-50 px-6 py-12 font-sans">
                {/* Page title */}
                <div className="flex justify-center mb-10">
                    <Bone className="w-72 h-9" />
                </div>

                {/* Contest rows */}
                <div className="max-w-5xl mx-auto flex flex-col gap-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <ContestRowSkeleton key={i} />
                    ))}
                </div>
            </div>
        </>
    );
}