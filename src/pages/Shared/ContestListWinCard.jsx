import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaTrophy, FaUsers } from 'react-icons/fa6';
import { Link } from 'react-router';
import { TiTick } from "react-icons/ti";

const ContestListWinCard = ({ contest }) => {
    return (
        <div className="card bg-base-100 shadow-sm flex lg:flex-row pb-5">
            <Link to={`/contest-details/${contest._id}`}>
                <figure className='relative overflow-hidden rounded-lg group'>
                    <img
                        src={contest.image}
                        alt="contest Poster"
                        className='lg:size-30 object-cover transition-transform duration-300 group-hover:scale-105'
                    />
                    {/* <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
                </figure>
            </Link>
            <div className="flex flex-col gap-2 mt-2 lg:ml-5 gap-y-5 text-sm px-2">
                <h2 className="text-lg font-bold text-left">{contest.contest_name}</h2>
                <div className="flex lg:flex-col justify-between">
                    <p className="flex gap-2 items-center font-bold"><FaUsers />{contest.participants_count}</p>
                    <p className='flex gap-2 items-center font-bold'><FaCalendarAlt />{contest?.deadline.split('T')[0]}</p>
                </div>
                <div className="flex justify-between">
                    <p className="p-0 m-0">{contest.description}</p>
                </div>

            </div>
            <div className='ml-auto mr-auto lg:mr-10 mt-5 flex items-center gap-10'>
                <Link to={`/contest-details/${contest._id}`} className='btn btn-neutral text-base-100'>Go to Contest</Link>
                <button className='btn btn-primary text-base-100 pointer-events-none'><FaTrophy />{contest.prize_money}</button>
            </div>
        </div>
    );
};

export default ContestListWinCard;