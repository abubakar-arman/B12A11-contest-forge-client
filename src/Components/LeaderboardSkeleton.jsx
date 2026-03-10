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
`;

function Bone({ className = "" }) {
    return <div className={`sk ${className}`} />;
}

/* ── One table row skeleton ── */
function RowSkeleton({ i }) {
    return (
        <tr className={i % 2 === 0 ? "bg-white" : "bg-gray-50/60"}>
            {/* Rank */}
            <td className="px-6 py-4 w-24">
                <Bone className="w-8 h-8 rounded-full mx-auto" />
            </td>

            {/* User */}
            <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                    <Bone className="w-12 h-12 rounded-full flex-shrink-0" />
                    <div className="flex flex-col gap-2">
                        <Bone className="w-36 h-4" />
                        <Bone className="w-48 h-3" />
                    </div>
                </div>
            </td>

            {/* Rank Title */}
            <td className="px-6 py-4 w-48">
                <Bone className="w-20 h-7 rounded-full mx-auto" />
            </td>

            {/* Total Wins */}
            <td className="px-8 py-4 w-36 text-right">
                <Bone className="w-6 h-7 ml-auto rounded" />
            </td>
        </tr>
    );
}

/* ── Root component ── */
export default function LeaderboardSkeleton() {
    return (
        <>
            <style>{globalCSS}</style>

            <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 font-sans">

                {/* Header */}
                <div className="flex flex-col items-center gap-3 mb-10">
                    {/* Trophy icon + title */}
                    <div className="flex items-center gap-3">
                        <Bone className="w-10 h-10 rounded-full" />
                        <Bone className="w-44 h-9" />
                    </div>
                    {/* Subtitle */}
                    <Bone className="w-64 h-4" />
                </div>

                {/* Table card */}
                <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-white">

                    {/* Purple header row */}
                    <div
                        className="grid px-6 py-4"
                        style={{
                            gridTemplateColumns: "96px 1fr 192px 144px",
                            background: "linear-gradient(90deg,#6d28d9 25%,#7c3aed 50%,#6d28d9 75%)",
                            backgroundSize: "800px 100%",
                            animation: "shimmer 1.6s infinite linear",
                        }}
                    >
                        {["w-10", "w-10", "w-20", "w-20"].map((w, i) => (
                            <div
                                key={i}
                                className={`sk h-4 ${w} ${i === 3 ? "ml-auto" : ""}`}
                                style={{
                                    background:
                                        "linear-gradient(90deg,rgba(255,255,255,0.25) 25%,rgba(255,255,255,0.45) 50%,rgba(255,255,255,0.25) 75%)",
                                    backgroundSize: "800px 100%",
                                }}
                            />
                        ))}
                    </div>

                    {/* Rows */}
                    <table className="w-full border-collapse">
                        <tbody>
                            {Array.from({ length: 4 }).map((_, i) => (
                                <RowSkeleton key={i} i={i} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}