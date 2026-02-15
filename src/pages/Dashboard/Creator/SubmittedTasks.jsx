import React, { useState } from 'react';
import { FaCross, FaEdit, FaTrash, FaTrophy } from 'react-icons/fa';
import { IoIosOpen } from "react-icons/io";
import { MdCancel, MdSubject } from "react-icons/md";
import { TiTick } from 'react-icons/ti';
import { Link, useParams } from 'react-router';
import api from '../../../config/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner2 from '../../../Components/Spinner2';
import { toast } from 'react-toastify';
import { FaCircleMinus } from 'react-icons/fa6';

const SubmittedTasks = () => {
    const { id } = useParams()

    const { data: submissions, isLoading, error } = useQuery({
        queryKey: ['submissions'],
        queryFn: () => api.get(`/api/submissions`).then(res => res.data.result),
        select: (submissions) => id ? submissions.filter(s => s.contestId === id) : submissions
    })

    // Calculate winners on every render based on the data fetched
    const winnerSubmissionIds = submissions?.filter(s => s.is_winner).map(s => s._id) || [];
    const winnerContestIds = submissions?.filter(s => s.is_winner).map(s => s.contestId) || [];
    // console.log('submissions:', submissions);
    const { data: contests, contestsIsLoading } = useQuery({
        queryKey: ['contests'],
        queryFn: () => api.get(`/api/contests`).then(res => res.data.result),
    })

    const queryClient = useQueryClient()
    const mutationDeclareWinner = useMutation({
        mutationFn: (submission) => {
            return api.put(`/api/contest/declare-winner/${submission.contestId}`, submission)
        },
        onSuccess: (res) => {
            console.log('Server Response :', res.data);
            queryClient.invalidateQueries({ queryKey: ['submissions'] })
            toast.success('Winner Declared!')
        },
        onError: (err) => console.error('Mutation Failed :', err)
    })

    const mutationUndoWinner = useMutation({
        mutationFn: (submission) => {
            return api.put(`/api/contest/undo-winner/${submission.contestId}`, submission)
        },
        onSuccess: (res) => {
            console.log('Server Response :', res.data);
            queryClient.invalidateQueries({ queryKey: ['submissions'] })
            toast.success('Undo Winner Declaration Successful')
        },
        onError: (err) => console.error('Mutation Failed :', err)
    })

    const mutationDelete = useMutation({
        mutationFn: (_id) => api.delete(`/api/submissions/${_id}`),
        onSuccess: (res) => {
            console.log('Server Response :', res.data);
            queryClient.invalidateQueries({ queryKey: ['submissions'] })

            toast.success('Submission deleted')
        },
        onError: (err) => console.error('Mutation Failed :', err)
    })

    const [selectedSubmissionId, setSelectedSubmissionId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    // console.log('submissions', submissions);

    if (isLoading || contestsIsLoading) return <Spinner2 />
    if (error) return <p>Error: {error.message}</p>

    // pagination
    const totalPages = Math.ceil(submissions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = submissions.slice(startIndex, endIndex);

    const selectedSubmission = submissions?.find(s => s._id === selectedSubmissionId)

    return (
        <div>
            <h3 className='text-3xl font-bold text-accent-content mb-5 text-center'>Contest Submissions</h3>
            {!currentItems.length ? <h5 className='text-xl text-center font-bold text-neutral mb-5'>No items to show</h5> : ''}
            <h4 className='font-bold text-xl py-10'>Contest Name : {id ? contests?.filter(c => c._id === id)[0].contest_name : 'All Contests'}</h4>
            <div className="overflow-x-auto">
                {currentItems.length &&
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>Submission ID</th>
                                <th>Participant</th>
                                <th>Submitted At</th>
                                <th>Contest Name</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((submission, i) => (
                                <tr key={i}>
                                    <td>
                                        {submission._id}
                                    </td>
                                    <td>
                                        {submission.email}
                                    </td>
                                    <td>
                                        {submission.submission_date.split('.')[0]}
                                    </td>
                                    <td>
                                        {
                                            contests?.filter(c => c._id === submission.contestId)[0].contest_name
                                        }
                                    </td>
                                    <td>
                                        {submission?.status.toUpperCase()}
                                    </td>
                                    <th className='flex gap-1'>
                                        <button
                                            className="btn btn-primary btn-square tooltip"
                                            data-tip="Open Task"
                                            onClick={() => {
                                                setSelectedSubmissionId(submission._id);
                                                document.getElementById('submissionModal').showModal();
                                            }}
                                        ><IoIosOpen /></button>
                                        <button
                                            className={`btn btn-primary btn-square tooltip ${(winnerSubmissionIds.includes(submission._id)
                                                || winnerContestIds.includes(submission.contestId)) ? 'btn-disabled' : ''}`}
                                            data-tip="Declare Winner"
                                            onClick={() => {
                                                mutationDeclareWinner.mutate(submission)
                                                // setWinnerSubmissionId(submission?._id)
                                            }}
                                        ><TiTick /></button>

                                        <button
                                            className={`btn btn-error btn-square tooltip ${winnerSubmissionIds.includes(submission._id) ? '' : 'btn-disabled'}`}
                                            data-tip="Undo Winner"
                                            onClick={() => {
                                                mutationUndoWinner.mutate(submission)

                                            }}
                                        ><FaCircleMinus /></button>
                                        <button
                                            className="btn btn-primary btn-square tooltip"
                                            data-tip="Delete"
                                            onClick={() => mutationDelete.mutate(submission._id)}
                                        ><MdCancel /></button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Submission ID</th>
                                <th>Participant</th>
                                <th>Submitted At</th>
                                <th>Contest Name</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </tfoot>
                    </table>
                }
                {/* Pagination */}
                <div className="join flex justify-center mt-5">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            className={`join-item btn ${currentPage === page ? 'btn-active' : ''}`}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                {/* Open the modal using document.getElementById('ID').showModal() method */}

                <dialog id="submissionModal" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Submitted Task</h3>
                        <p>{selectedSubmission?.solution}</p>
                        <div className="modal-action">
                            <form method="dialog" className='flex gap-3'>
                                {/* <button
                                    className="btn bg-green-700 text-base-100"
                                    onClick={() => mutationSubmitTask.mutate(textareaRef?.current.value)}
                                >Submit</button> */}
                                <button className="btn bg-red-700 text-base-100">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default SubmittedTasks;