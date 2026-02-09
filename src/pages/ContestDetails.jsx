import React from 'react';
import { FaTrophy, FaUsers } from 'react-icons/fa6';
import {  useParams } from 'react-router';
import CountdownTimer from '../Components/CountdownTimer';
import Swal from 'sweetalert2'
import { useQuery } from '@tanstack/react-query';
import api from '../config/api';
import { FaDollarSign } from 'react-icons/fa';

const ContestDetails = () => {
    const { id } = useParams()

    const { data, isLoading, error} = useQuery({
        queryKey: ['contestDetails'],
        queryFn: () => api.get(`/api/contest/${id}`),
    })
    console.log('data:', data);
    const showSubmissionModal = () => {
        Swal.fire({
            title: "Write your solution here",
            html: `<textarea className="textarea" rows='8' columns='40' style="width: 100%; box-sizing: border-box;" placeholder="Solution..."></textarea>`,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Submit"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Submitted!",
                    text: "Your solution has been submitted.",
                    icon: "success"
                });
            }
        });
    }
    if (isLoading) return <div className="text-center p-10">Loading contest...</div>;
    if (error) return <p>Error: {error.message}</p>
    const contest = data.data.result
    // console.log('contestDetails', contest);

    return (
        <div className='mt-10 mb-10 px-20'>
            <div className="lg:flex lg:flex-row-reverse">
                <img src={contest.image} alt=""
                    className='w-3/12 object-cover hidden lg:block' />
                <div className="lg:w-8/12 flex flex-col gap-5">
                    <h2 className="text-6xl font-bold">{contest.contest_name}</h2>

                    <img src={contest.image} alt=""
                        className='w-11/12 object-cover lg:hidden' />
                    <div className="flex items-center gap-40">
                        <p className="font-bold size-10 flex items-center text-3xl"><FaTrophy />{contest.prize_money}</p>
                        <p className="border-l-3 border-primary pl-30 ml-4 font-bold flex items-center text-3xl"><FaUsers />{contest.participants_count}</p>
                        <p className="border-l-3 border-primary pl-30 ml-4 font-bold flex items-center text-3xl"><FaDollarSign />{contest.price}</p>
                    </div>
                    <p className="">{contest.description}</p>
                    {!!Object.keys(contest.winner).length && <div className='flex flex-col justify-center mt-14'>
                        <p className="font-bold text-3xl ml-8">Winner</p>
                        <div className="card bg-base-100 w-84 shadow-sm mt-14">

                            <div className='flex flex-col gap-5 mx-10'>
                                <div className="avatar size-20">
                                    <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                                        <img src={contest?.winner?.photo_url} />
                                    </div>
                                </div>
                                <div className='text-left'>
                                    <p className='font-bold'>{contest?.winner?.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                    <div className='counter mt-20 flex flex-col justify-center items-center'>
                        <p className='font-bold text-4xl mb-10'>Contest Ends In </p>
                        <CountdownTimer deadline={contest.deadline} />
                    </div>
                    <div className='flex flex-col items-center gap-2'>
                        <button className='btn btn-neutral w-50 py-8 btn-disabled'>Contest Ended</button>
                        <button className='btn btn-neutral w-50 py-8'>Register</button>
                        <button className="btn btn-neutral w-50 py-8" onClick={showSubmissionModal}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContestDetails;