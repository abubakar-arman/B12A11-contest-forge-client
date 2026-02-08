import React, { useEffect, useState } from 'react';
import { FaCross, FaEdit, FaTrash, FaTrophy } from 'react-icons/fa';
import { IoIosOpen } from "react-icons/io";
import { MdCancel, MdSubject } from "react-icons/md";
import { TiTick } from 'react-icons/ti';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const SubmittedTasks = () => {
    const [submissions, setSubmissions] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/submissions.json')
            const data = await res.json()
            setSubmissions(data)
        }
        fetchData()
    }, [setSubmissions])
    console.log('submissions', submissions);

    const handleOpenSubmission = (name, description, url) => {
        Swal.fire({
            title: "<strong>Submitted Task</strong>",
            html: `
            <div style="text-align: left">
    <p><strong>Task Name :</strong> ${name}</p>
    <p><strong>Description :</strong> ${description}</p>
    <p><strong>File URL :</strong> ${url};</p>
    </div>
  `,
            showCloseButton: true,
            customClass: {htmlContainer: 'content'}
        });
    }

    return (
        <div>
            <h3 className='text-3xl font-bold text-accent-content mb-5 text-center'>Contest Submissions</h3>
            <h4 className='font-bold text-xl py-10'>Contest Name : Art Day</h4>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Submission ID</th>
                            <th>Participant</th>
                            <th>Submitted At</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((submission, i) => (
                            <tr key={i}>
                                <td>
                                    {submission.id}
                                </td>
                                <td>
                                    {submission.participant_name}
                                </td>
                                <td>
                                    {submission.submission_date}
                                </td>
                                <td>
                                    Pending
                                </td>
                                <th className='flex gap-1'>
                                    <button
                                        className="btn btn-primary btn-square tooltip"
                                        data-tip="Open Task"
                                        onClick={() => handleOpenSubmission(
                                            submission.submitted_task_info.title,
                                            submission.submitted_task_info.description,
                                            submission.submitted_task_info.file_url
                                        )}
                                    ><IoIosOpen /></button>
                                    <button className="btn btn-primary btn-square tooltip" data-tip="Declare Winner"><TiTick /></button>
                                    <button className="btn btn-primary btn-square tooltip" data-tip="Delete"><MdCancel /></button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th>Submission ID</th>
                            <th>Participant</th>
                            <th>Submitted At</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default SubmittedTasks;