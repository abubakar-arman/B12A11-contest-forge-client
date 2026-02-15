import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form'; 
import api from '../../../config/api';
import useAuth from '../../../hooks/useAuth';
import { useParams } from 'react-router';
import Spinner2 from '../../../Components/Spinner2';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const { user: usr } = useAuth();
  const { id } = useParams();
  const queryClient = useQueryClient();
  console.log('kk', usr);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['userProfile', id],
    queryFn: () => api.get(`/api/user/${id}`).then(res => res.data.result),
    enabled: !!usr?.email,
    onSuccess: (data) => reset(data) 
  });

  const { data: contests, isLoading: contestsLoading } = useQuery({
    queryKey: ['contests'],
    queryFn: () => api.get(`/api/contests`).then(res => res.data.result)
  });

  const email = user?.email;
  const total_wins = contests?.filter(c => c.winner?.email === email).length || 0;
  const total_participated = contests?.filter(c => c.participated_users?.includes(email)).length || 0;

  const updateProfileMutation = useMutation({
    mutationFn: (updatedData) => api.put(`/api/users/${id}`, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries(['userProfile', id]);
      toast.success("Profile updated successfully!");
      document.getElementById('update_modal').close();
    },
    onError: () => toast.error("Failed to update profile.")
  });

  const onUpdateSubmit = (data) => {
    updateProfileMutation.mutate(data);
  };

  if (isLoading || contestsLoading) return <Spinner2 />;
  if (error) return <p className="text-center text-error">Error: {error.message}</p>;

  const chartData = [
    { name: 'Won', value: total_wins },
    { name: 'Lost', value: Math.max(0, total_participated - total_wins) },
  ];
  const COLORS = ['#00C49F', '#FF8042'];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            <div className="avatar">
              <div className="w-40 sm:w-56 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user.photoUrl} alt={user.name} />
              </div>
            </div>

            <div className="text-center lg:text-left space-y-3 flex-1">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-neutral">{user.name}</h2>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    reset(user);
                    document.getElementById('update_modal').showModal();
                  }}
                >
                  Update Profile
                </button>
              </div>
              <p className="text-lg opacity-70">{user.email}</p>
              <p className="badge badge-outline badge-secondary">{user.rank_title}</p>
              {user.bio && (
                <div className="mt-4">
                  <p className="text-accent font-semibold">Bio</p>
                  <p className="max-w-xl text-gray-600">{user.bio}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Chart Card */}
        <div className="card bg-base-100 shadow-md h-80">
          <div className="card-body">
            <h3 className="text-xl font-bold">Win Statistics</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats Card */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h3 className="text-xl font-bold mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-accent">Win Ratio:</span>
                <span>{total_participated ? ((total_wins / total_participated) * 100).toFixed(2) : 0}%</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-accent">Total Participated:</span>
                <span>{total_participated}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-accent">Joined:</span>
                <span>{user.joined_date?.split('T')[0]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <dialog id="update_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Update Profile</h3>
          
          <form onSubmit={handleSubmit(onUpdateSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text">Name</span></label>
              <input 
                {...register("name", { required: "Name is required" })}
                type="text" 
                className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`} 
              />
              {errors.name && <span className="text-error text-sm mt-1">{errors.name.message}</span>}
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Photo URL</span></label>
              <input 
                {...register("photoUrl", { required: "Photo URL is required" })}
                type="text" 
                className={`input input-bordered w-full ${errors.photoUrl ? 'input-error' : ''}`} 
              />
              {errors.photoUrl && <span className="text-error text-sm mt-1">{errors.photoUrl.message}</span>}
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Bio </span></label>
              <textarea 
                {...register("bio")}
                className="textarea textarea-bordered h-24" 
                placeholder="Tell us about yourself"
              />
            </div>

            <div className="modal-action">
              <button 
                type="submit" 
                disabled={updateProfileMutation.isLoading}
                className="btn btn-primary"
              >
                {updateProfileMutation.isLoading ? <span className="loading loading-spinner"></span> : "Save Changes"}
              </button>
              <button 
                type="button" 
                className="btn" 
                onClick={() => document.getElementById('update_modal').close()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default UserProfile;