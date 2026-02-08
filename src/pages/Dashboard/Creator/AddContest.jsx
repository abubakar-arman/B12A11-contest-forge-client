import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const AddContest = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      contest_type: 'Design',
      deadline: new Date(),
    }
  });

  const onSubmit = (data) => {
    console.log("Contest Data Submitted:", data);
    alert("Contest Created Successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <h3 className='text-center text-3xl font-bold text-accent-content mb-5'>Create New Contest</h3>
      <div className="max-w-6xl mx-auto bg-white shadow-xl overflow-hidden">

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Contest Name</label>
              <input 
                {...register("name", { required: "Name is required" })}
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
              type="file"
              {...register("image", { required: "Please upload a banner" })}
              className="w-full p-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
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
              Launch Contest
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContest;