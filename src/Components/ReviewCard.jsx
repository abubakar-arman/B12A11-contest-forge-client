import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa6';

const ReviewCard = ({ review }) => {
    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <div className="card-body border-b-4 border-b-cyan-800 border-dashed w-88 mx-auto mb-5">
                <FaQuoteLeft className='size-10' />
                <p>{review.review}</p>
            </div>
            <div className='flex gap-5 mx-10'>
                <div className="avatar size-10">
                    <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                        <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                    </div>
                </div>
                <div className='text-left'>
                    <p className='font-bold'>{review.name}</p>
                    <p className=''>{review.email}</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;