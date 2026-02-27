import React from 'react';

const Stats = () => {
    return (
        <div data-aos='zoom-out' className="bg-linear-to-br from-[#005461] to-[#00B7B5] text-white flex flex-col items-center justify-center py-16">
            <h3 className="text-4xl text-center font-bold w-9/12">Your Skills, Our Stage, Infinite Possibilities.</h3>
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-40 mt-5">
                <div className="flex flex-col items-center gap-5">
                    <p className="font-light">Active Competitors</p>
                    <h2 className="text-5xl font-extrabold">1.6M</h2>
                    <p className="font-light">18% more than last month</p>
                </div>
                <div className="flex flex-col items-center gap-5">
                    <p className="font-light">Prize Money Distributed</p>
                    <h2 className="text-5xl font-extrabold">$14.5M</h2>
                    <p className="font-light">32% more than last month</p>
                </div>
                <div className="flex flex-col items-center gap-5">
                    <p className="font-light">Completed Challenges</p>
                    <h2 className="text-5xl font-extrabold">4,800+</h2>
                    <p className="font-light">Completed Challenges</p>
                </div>
            </div>
        </div>
    );
};

export default Stats;