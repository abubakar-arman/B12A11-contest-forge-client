import { FaTrophy, FaUsers } from 'react-icons/fa6';
import { useParams } from 'react-router';
import CountdownTimer from '../Components/CountdownTimer';
import Swal from 'sweetalert2'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../config/api';
import { FaDollarSign } from 'react-icons/fa';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';


const ContestDetails = () => {
    const { id } = useParams()
    const { user } = useAuth()

    const { data: contest, isLoading, error } = useQuery({
        queryKey: ['contestDetails', id],
        queryFn: () => api.get(`/api/contest/${id}`).then(res => res.data.result),
    })
    
    const queryClient = useQueryClient()
    const mutationRegister = useMutation({
        mutationFn: (_id) => api.put(`/api/contest/register/${_id}`, user),
        onSuccess: (res) => {
            console.log('Server response:', res.data)
            queryClient.invalidateQueries({ queryKey: ['contestDetails', id]})
            toast.success('Contest registration successful')
        },
        onError: (err) => console.error('Mutation Failed:', err)
    })

    const [isContestEnded, setIsContestEnded] = useState(false)

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

    return (
        <div className='mt-10 mb-10 px-20'>
            <div className="lg:flex lg:flex-row-reverse">
                <img src={contest.image} alt=""
                    className='w-1/2 rounded-tl-4xl rounded-bl-4xl object-cover hidden lg:block' />
                <div className="lg:w-8/12 flex flex-col gap-5">
                    <h2 className="text-2xl lg:text-4xl font-bold">{contest.contest_name}</h2>

                    <img src={contest.image} alt=""
                        className='w-11/12 object-cover lg:hidden rounded-xl' />
                    <div className="flex items-center lg:gap-40">
                        <p className="border-l-3 border-primary pl-2 ml-5 lg:ml-2 font-bold flex items-center text-2xl gap-1"><FaTrophy className='size-6' />{contest.prize_money}</p>
                        <p className="border-l-3 border-primary pl-2 ml-5 lg:ml-2 gap-1 font-bold flex items-center text-3xl"><FaDollarSign className='size-6' />{contest.price}</p>
                        <p className="border-l-3 border-primary pl-2 ml-5 lg:ml-2 gap-1 font-bold flex items-center text-3xl"><FaUsers className='size-6' />{contest.participants_count}</p>
                    </div>
                    <p>
                        <span className='block font-bold text-neutral-700'>Contest Description:</span>
                        {contest.description}
                    </p>
                    <p>
                        <span className='block font-bold text-neutral-700'>Task Instructions:</span>
                        {contest.task_instruction}
                    </p>
                    {!!Object.keys(contest.winner).length && isContestEnded && <div className='flex flex-col justify-center lg:mt-14'>
                        <div className="card bg-base-100 w-84 py-10 border-b-amber-600 border-2 shadow-sm lg:mt-14 flex flex-col justify-center items-center">
                            <p className="font-bold text-3xl mb-10">Winner</p>

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
                    {!isContestEnded &&
                        <div className='counter mt-20 flex flex-col justify-center items-center'>
                            <p className='font-bold text-4xl mb-10'>Contest Ends In </p>
                            <CountdownTimer deadline={contest.deadline} setIsContestEnded={setIsContestEnded} />
                        </div>
                    }
                    <div className='flex flex-col items-center gap-2'>
                        {isContestEnded ?
                            <button className='btn btn-neutral w-50 py-8 btn-disabled'>Contest Ended</button>
                            :
                            <>{contest.participated_users.includes(user.email) ?
                                <button className="btn btn-neutral w-50 py-8" onClick={showSubmissionModal}>Submit</button>
                                :
                                <button 
                                className='btn btn-neutral w-50 py-8'
                                onClick={() => mutationRegister.mutate(contest._id)}
                                >Register</button>
                            }
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContestDetails;