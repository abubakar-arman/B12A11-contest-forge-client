import React from 'react';
import { FaTrophy, FaUsers } from 'react-icons/fa6';

const PopularContents = ({ contests = [] }) => {
    console.log('hhhh', contests);

    //TopRatedMVs
    return (
        <div className='mt-10 mb-10 text-center' data-aos='zoom-in'>
            <h3 className='text-3xl font-bold text-accent-content mb-5'>Top Rated</h3>
            <div className="cards grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 lg:gap-8 space-y-8 lg:space-y-0 px-20">
                {
                    contests.map((contest, i) => (
                        <div key={i} className="card bg-base-100 shadow-sm">
                            <figure className='relative overflow-hidden rounded-lg group'>
                                <img
                                    src={'/posters/' + contest.banner_url}
                                    alt="contest Poster"
                                    className='h-72 w-full object-cover transition-transform duration-300 group-hover:scale-105'
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                <div className="absolute inset-0 flex flex-col justify-end p-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <h3 className="text-white text-lg font-semibold leading-tight">{contest.contest_name}</h3>
                                    <div className="mt-2 flex items-center justify-between text-sm text-gray-200">
                                        <div className="flex items-center gap-2">
                                            <FaUsers />
                                            <span>{contest.participants_count}</span>
                                        </div>
                                        <button className="btn btn-sm btn-primary">Details</button>
                                    </div>
                                </div>
                            </figure>
                            <div className="flex flex-col gap-2 mt-2 text-sm px-2">
                                <div className="flex justify-between">
                                    <p className="flex gap-2 items-center font-bold"><FaUsers />{contest.participants_count}</p>
                                    <p className="flex gap-2 items-center font-bold"><FaTrophy />{contest.prize_money}</p>
                                </div>
                                <h2 className="text-lg text-left">{contest.contest_name}</h2>
                                <div className="flex justify-between">
                                    <p className="p-0 m-0">{contest.description}</p>
                                </div>

                            </div>
                        </div>
                    ))
                }

            </div>
            <button className='btn btn-primary btn-lg mt-10'>Show All Contests</button>
        </div>
    );
};

export default PopularContents;