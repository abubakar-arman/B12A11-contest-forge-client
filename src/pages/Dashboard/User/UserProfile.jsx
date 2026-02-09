import { useQuery } from '@tanstack/react-query';
import api from '../../../config/api';
import useAuth from '../../../hooks/useAuth';
import { useParams } from 'react-router';

const UserProfile = () => {
  const {user: usr} = useAuth()
  const {id} = useParams()
  
  // console.log('usr:', usr.email);

  const {data, isLoading, error} = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => api.get(`/api/user/${id}`),
    enabled: !!usr?.email
  })
  // console.log('data:', data);
  
  if(isLoading) return <div className="text-center p-10">Loading Profile...</div>;
  if(error) return <p>Error: {error.message}</p>
  const user = data.data.result

  return (
    <div>
      <div className="card w-full bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex items-center">
            <div className="avatar mx-50">
              <div className="ring-primary ring-offset-base-100 w-72 rounded-full ring-2 ring-offset-2">
                <img src={user.photoUrl} />
              </div>
            </div>
            <div className='flex flex-col gap-3'>
              <h2 className="text-5xl font-bold text-neutral">{user.name}</h2>
              <p className='text-lg'>{user.username}</p>
              <div>
                <p className='text-lg text-accent'>Bio:</p>
                <p className='text-lg'>{user.bio}</p>
              </div>
            </div>

          </div>

        </div>
      </div>
      <div className='text-2xl ml-60'>
        <p><span className='text-accent'>Rank Title:</span> {user.rank_title}</p>
        <p><span className='text-accent'>Total Wins:</span> {user.total_wins}</p>
        <p><span className='text-accent'>Total Participated:</span> {user.total_participated}</p>
        <p><span className='text-accent'>Win Percentage:</span> {user.total_participated ? ((user.total_wins / user.total_participated) * 100).toFixed(2) : 0}%</p>
        <p><span className='text-accent'>Joined Date:</span> {user.joined_date.split('T')[0]}</p>
      </div>
    </div>
  );
};

export default UserProfile;