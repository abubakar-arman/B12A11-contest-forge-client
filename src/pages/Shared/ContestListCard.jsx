import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaTrophy, FaUsers } from 'react-icons/fa6';
import { Link } from 'react-router';
import { TiTick } from "react-icons/ti";

const ContestListCard = ({ contest }) => {
    return (
        <div className="card bg-base-100 shadow-sm flex flex-row">
            <Link to={`/contest-details/${contest.id}`}>
                <figure className='relative overflow-hidden rounded-lg group'>
                    <img
                        src={contest.banner_url}
                        alt="contest Poster"
                        className='size-30 object-cover transition-transform duration-300 group-hover:scale-105'
                    />
                    {/* <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
                </figure>
            </Link>
            <div className="flex flex-col gap-2 mt-2 ml-5 text-sm px-2">
                <h2 className="text-lg text-left">{contest.contest_name}</h2>
                <div className="flex flex-col justify-between">
                    <p className="flex gap-2 items-center font-bold"><FaUsers />{contest.participants_count}</p>
                    <p className="flex gap-2 items-center font-bold"><FaTrophy />{contest.prize_money}</p>
                    <p className='flex gap-2 items-center font-bold'><FaCalendarAlt />{contest.deadline.split('T')[0]}</p>
                </div>
                <div className="flex justify-between">
                    <p className="p-0 m-0">{contest.description}</p>
                </div>

            </div>
            <div className='ml-auto mr-10 flex items-center gap-10'>
                <Link to={`/contest-details/${contest.id}`} className='btn btn-neutral text-base-100'>Go to Contest</Link>
                <button className='btn btn-success text-base-100 pointer-events-none opacity-60'><TiTick /> Paid</button>
            </div>
        </div>
    );
};

export default ContestListCard;