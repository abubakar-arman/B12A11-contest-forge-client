import React from 'react';
import { FaTrophy, FaUsers } from 'react-icons/fa6';
import { Link } from 'react-router';

const ContestCard = ({ contest }) => {
    const MAX_DESC_LEN = 45
    return (
        <div className="card bg-base-100 shadow-sm py-5">
            <figure className='relative overflow-hidden rounded-lg group'>
                <img
                    src={contest.image}
                    alt="contest Poster"
                    className='h-72 w-full object-cover transition-transform duration-300 group-hover:scale-105'
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <Link to={`/contest-details/${contest._id}`} className="absolute inset-0 flex flex-col justify-end p-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="text-white text-lg font-semibold leading-tight">{contest.contest_name}</h3>
                    <div className="mt-2 flex items-center justify-between text-sm text-gray-200">
                        <div className="flex items-center gap-2">
                            <FaUsers />
                            <span>{contest.participants_count}</span>
                        </div>
                        <button className="btn btn-sm btn-primary">Details</button>
                    </div>
                </Link>
            </figure>
            <div className="flex flex-col gap-2 mt-2 text-sm px-2">
                <div className="flex justify-between">
                    <p className="flex gap-2 items-center font-bold"><FaUsers />{contest.participants_count}</p>
                    <p className="flex gap-2 items-center font-bold"><FaTrophy />{contest.prize_money}</p>
                </div>
                <h2 className="text-lg text-left">{contest.contest_name}</h2>
                <div className="flex justify-between">
                    <p className="p-0 m-0">{contest.description.length > MAX_DESC_LEN ? contest.description.slice(0, MAX_DESC_LEN) + '...' : contest.description}</p>
                </div>

            </div>
        </div>
    );
};

export default ContestCard;