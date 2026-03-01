const ContestDetailsSkeleton = () => {
    return (
        <div className="mt-10 mb-10 px-5 lg:px-20 animate-pulse">
            <div className="lg:flex lg:flex-row-reverse gap-6">

                <div className="w-1/2 rounded-tl-4xl rounded-bl-4xl bg-base-300 hidden lg:block min-h-[500px]" />

                <div className="lg:w-8/12 flex flex-col gap-5">

                    <div className="h-10 w-3/4 rounded-lg bg-base-300" />

                    <div className="w-full h-52 rounded-xl bg-base-300 lg:hidden" />

                    <div className="flex items-center gap-6 lg:gap-40">
                        {[80, 80, 60].map((w, i) => (
                            <div key={i} className="flex items-center gap-2 border-l-4 border-base-300 pl-2 ml-2">
                                <div className="w-6 h-6 rounded bg-base-300" />
                                <div className="h-6 rounded bg-base-300" style={{ width: w }} />
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="h-4 w-40 rounded bg-base-300" />
                        <div className="h-3 w-full rounded bg-base-300" />
                        <div className="h-3 w-5/6 rounded bg-base-300" />
                        <div className="h-3 w-4/6 rounded bg-base-300" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="h-4 w-36 rounded bg-base-300" />
                        <div className="h-3 w-full rounded bg-base-300" />
                        <div className="h-3 w-3/4 rounded bg-base-300" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="h-4 w-32 rounded bg-base-300" />
                        <div className="h-3 w-48 rounded bg-base-300" />
                    </div>

                    <div className="flex flex-col justify-center lg:mt-14">
                        <div className="card bg-base-100 w-84 py-10 border-2 border-base-300 shadow-sm lg:mt-14 flex flex-col justify-center items-center gap-5">
                            <div className="h-8 w-24 rounded bg-base-300" />
                            <div className="w-20 h-20 rounded-full bg-base-300" />
                            <div className="h-4 w-32 rounded bg-base-300" />
                        </div>
                    </div>

                    <div className="mt-20 flex flex-col justify-center items-center gap-10">
                        <div className="h-10 w-56 rounded bg-base-300" />
                        <div className="flex gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                    <div className="w-16 h-16 rounded-xl bg-base-300" />
                                    <div className="w-12 h-3 rounded bg-base-300" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col items-center mt-4">
                        <div className="w-50 h-16 rounded-xl bg-base-300" />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ContestDetailsSkeleton;