const shimmerClass =
    "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:800px_100%] animate-shimmer rounded";

const globalCSS = `
  @keyframes shimmer {
    0%   { background-position: -800px 0; }
    100% { background-position:  800px 0; }
  }
  .animate-shimmer {
    animation: shimmer 1.6s infinite linear;
  }
`;

/* ── Reusable bone ── */
function Bone({ className = "" }) {
    return <div className={`${shimmerClass} ${className}`} />;
}

/* ── Single card skeleton ── */
function CardSkeleton() {
    return (
        <div className="flex flex-col rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white">
            {/* Image area */}
            <Bone className="w-full h-56" />

            {/* Meta row */}
            <div className="flex items-center justify-between px-4 pt-4 pb-1">
                <div className="flex items-center gap-2">
                    <Bone className="w-4 h-4 rounded-full" />
                    <Bone className="w-6 h-3" />
                </div>
                <div className="flex items-center gap-2">
                    <Bone className="w-4 h-4 rounded-full" />
                    <Bone className="w-10 h-3" />
                </div>
            </div>

            {/* Title */}
            <div className="px-4 pt-3 pb-1">
                <Bone className="w-3/4 h-5" />
            </div>

            {/* Description lines */}
            <div className="px-4 pb-5 pt-2 flex flex-col gap-2">
                <Bone className="w-full h-3" />
                <Bone className="w-2/3 h-3" />
            </div>
        </div>
    );
}

/* ── Root component ── */
export default function AllContestsSkeleton() {
    const tabs = ["All Contests", "Apps", "Logo", "Art"];

    return (
        <>
            <style>{globalCSS}</style>

            <div className="min-h-screen bg-white px-8 py-10 font-sans">
                {/* Page title */}
                <div className="flex justify-center mb-6">
                    <Bone className="w-48 h-9" />
                </div>

                {/* Tabs */}
                <div className="flex justify-center gap-8 border-b border-gray-200 pb-0 mb-8">
                    {tabs.map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 pb-3">
                            <Bone
                                className={`h-4 ${i === 0 ? "w-24" : i === 1 || i === 3 ? "w-10" : "w-12"}`}
                            />
                            {/* Active underline on first tab */}
                            {i === 0 && (
                                <div
                                    className="animate-shimmer rounded-full bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700 bg-[length:800px_100%]"
                                    style={{ width: "100%", height: "2px" }}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* 4-column card grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <CardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </>
    );
}