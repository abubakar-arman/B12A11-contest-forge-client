import { useQuery } from '@tanstack/react-query';
import api from '../../../config/api';
import useAuth from '../../../hooks/useAuth';
import { useParams } from 'react-router';

const UserProfile = () => {
  const { user: usr } = useAuth();
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['userProfile', id],
    queryFn: () => api.get(`/api/user/${id}`),
    enabled: !!usr?.email,
  });

  if (isLoading) return <div className="text-center py-20">Loading Profile...</div>;
  if (error) return <p className="text-center text-error">Error: {error.message}</p>;

  const user = data.data.result;

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

            <div className="text-center lg:text-left space-y-3">
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral">
                {user.name}
              </h2>
              <p className="text-lg opacity-70">{user.email}</p>

              {user.bio && (
                <div>
                  <p className="text-accent font-semibold">Bio</p>
                  <p className="max-w-xl">{user.bio}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <h3 className="text-2xl font-bold mb-4">Profile Stats</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
            <p>
              <span className="text-accent font-semibold">Rank Title:</span>{' '}
              {user.rank_title}
            </p>
            <p>
              <span className="text-accent font-semibold">Total Wins:</span>{' '}
              {user.total_wins}
            </p>
            <p>
              <span className="text-accent font-semibold">Total Participated:</span>{' '}
              {user.total_participated}
            </p>
            <p>
              <span className="text-accent font-semibold">Win Percentage:</span>{' '}
              {user.total_participated
                ? ((user.total_wins / user.total_participated) * 100).toFixed(2)
                : 0}
              %
            </p>
            <p>
              <span className="text-accent font-semibold">Joined Date:</span>{' '}
              {user.joined_date.split('T')[0]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
