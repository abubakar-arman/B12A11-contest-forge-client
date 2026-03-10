// import { useQuery } from '@tanstack/react-query';
// // import api from '../../../config/api';
// import Spinner2 from '../../../Components/Spinner2';
import { FaTrophy, FaMedal } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import Spinner2 from '../Components/Spinner2';
import useAxiosSecure from '../hooks/useAxiosSecure'
import LeaderboardSkeleton from '../Components/LeaderboardSkeleton';

const Leaderboard = () => {
  const axiosSecure = useAxiosSecure()
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: () => axiosSecure.get('/api/users').then(res => res.data.result),
    select: (users) => users.filter(u => u.total_wins > 0)
  });

  if (isLoading) return <LeaderboardSkeleton />;
  if (error) return <p className="text-center text-error">Error: {error.message}</p>;

  // 2. Sort users by wins (Highest first)
  const rankedUsers = [...users].sort((a, b) => (b.total_wins || 0) - (a.total_wins || 0));

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold flex justify-center items-center gap-3">
          <FaTrophy className="text-yellow-500" /> Leaderboard
        </h2>
        <p className="text-gray-500 mt-2">The top contestants ranked by total wins</p>
      </div>

      <div className="overflow-x-auto shadow-xl rounded-lg">
        <table className="table w-full bg-base-100">
          <thead className="bg-primary text-primary-content">
            <tr>
              <th className="rounded-tl-lg">Rank</th>
              <th>User</th>
              <th>Rank Title</th>
              <th className="text-center rounded-tr-lg">Total Wins</th>
            </tr>
          </thead>
          <tbody>
            {rankedUsers.map((user, index) => {
              const rank = index + 1;
              return (
                <tr key={user._id} className="hover:bg-base-200 transition-colors">
                  <td className="font-bold text-lg">
                    {rank === 1 ? <FaMedal className="text-yellow-500 text-2xl" /> :
                      rank === 2 ? <FaMedal className="text-gray-400 text-2xl" /> :
                        rank === 3 ? <FaMedal className="text-orange-400 text-2xl" /> :
                          `#${rank}`}
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={user.photoUrl} alt={user.name} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                        <div className="text-sm opacity-50">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-ghost badge-sm font-semibold">
                      {user.rank_title || "Newbie"}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="stat-value text-primary text-2xl">
                      {user.total_wins || 0}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>
        {!rankedUsers.length && <p className='text-center'>No items to show</p>}
      </div>
    </div>
  );
};

export default Leaderboard;