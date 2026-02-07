import React from 'react';
import { FaTrophy } from 'react-icons/fa6';

const WinnerCard = ({ winner }) => {
    const { name, contest_name, prize_money, image_url } = winner
    return (
        <div className="card w-60 bg-base-100 shadow-sm">
            <div className="card-body">
                <div className="flex flex-col justify-between items-center">
                    <div className="avatar">
                        <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                            <img src={image_url} />
                        </div>
                    </div>
                    <h2 className="text-xl font-bold text-neutral">{name}</h2>
                    <p className="font-extralight">{contest_name}</p>
                </div>
                <p className="flex gap-2 items-center justify-center"><FaTrophy /> {prize_money}</p>
                
            </div>
        </div>
    );
};

export default WinnerCard;