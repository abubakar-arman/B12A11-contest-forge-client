import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Spinner2 from '../../../Components/Spinner2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const UpdateContest = () => {
  const axiosSecure = useAxiosSecure()
  const { id } = useParams()

  const { data, isLoading, error } = useQuery({
    queryKey: ['contestDetails'],
    queryFn: () => axiosSecure.get(`/api/contest/${id}`),
  })
  // console.log('data:', data);
  const queryClient = useQueryClient();
  const mutationUpdateContest = useMutation({
    mutationFn: (contest) => axiosSecure.put(`/api/contests/${id}`, contest),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['contests'] })
      
      toast.success('Contest Updated Successfully!')
      console.log('Server Response :', res.data);
      return res
    },
    onError: (err) => console.error('Mutation Failed :', err)
  })

  const handleUpdateContest = (data) => {
    // console.log('data', data);
    // const { 
    //   contest_name,
    //   contest_type,
    //   image,
    //   description,
    //   task_instruction,
    //   price,
    //   prize_money,
    //   deadline
    //  } = data

    mutationUpdateContest.mutate(data)
  }


  const { register, handleSubmit, control, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (data?.data?.result) {
      const contest = data.data.result
      // console.log('contest', contest);
      const {
        contest_name,
        contest_type,
        image,
        description,
        task_instruction,
        price,
        prize_money,
        deadline
      } = contest

      reset({
        contest_name,
        contest_type,
        image,
        description,
        task_instruction,
        price,
        prize_money,
        deadline
      })
    }
  }, [data, reset])

  if (isLoading) return <Spinner2 />
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <h3 className='text-center text-3xl font-bold text-accent-content mb-5'>Update Contest</h3>
      <div className="max-w-6xl mx-auto bg-white shadow-xl overflow-hidden">

        <form onSubmit={handleSubmit(handleUpdateContest)} className="p-8 space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Contest Name</label>
              <input
                {...register("contest_name", { required: "Name is required" })}
                placeholder="e.g. Nebula Art Quest"
                className={`w-full p-3 rounded-xl border-2 transition-all outline-none ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-100 focus:border-indigo-500'}`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1 font-bold">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Contest Type</label>
              <select
                {...register("contest_type")}
                className="w-full p-3 rounded-xl border-2 border-gray-100 bg-white focus:border-indigo-500 outline-none"
              >
                <option value="art">Digital Art</option>
                <option value="logo">Logo</option>
                <option value="app">App</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Banner Image</label>
            <input
              {...register("image", { required: "Please upload a banner" })}
              className={`w-full p-3 rounded-xl border-2 transition-all outline-none border-gray-100 focus:border-indigo-500`}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Description</label>
            <textarea
              {...register("description", { required: "Brief description required" })}
              rows="3"
              placeholder="What is this contest about?"
              className="w-full p-3 rounded-xl border-2 border-gray-100 focus:border-indigo-500 outline-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Task Instructions</label>
            <textarea
              {...register("task_instruction", { required: "Instructions are needed for participants" })}
              rows="4"
              placeholder="Step 1, Step 2, Submission specs..."
              className="w-full p-3 rounded-xl border-2 border-gray-100 focus:border-indigo-500 outline-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Entry Fee ($)</label>
              <input
                type="number"
                {...register("price", { required: true, min: 0 })}
                className="w-full p-3 rounded-xl border-2 border-gray-100 focus:border-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Prize Money ($)</label>
              <input
                type="number"
                {...register("prize_money", { required: true, min: 1 })}
                className="w-full p-3 rounded-xl border-2 border-gray-100 focus:border-indigo-500 outline-none font-bold text-green-600"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Deadline</label>
              <Controller
                control={control}
                name="deadline"
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    showTimeSelect
                    dateFormat="Pp"
                    className="w-full p-3 rounded-xl border-2 border-gray-100 focus:border-indigo-500 outline-none"
                  />
                )}
              />
            </div>
          </div>

          <div className="pt-4 text-center">
            <button
              type="submit"
              className="btn btn-neutral w-sm "
            >
              Update Contest
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateContest;