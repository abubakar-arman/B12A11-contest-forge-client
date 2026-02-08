import React, { useEffect, useState } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/user.json')
      const data = await res.json()
      setUser(data)
      console.log('user', data);
    }
    fetchData()
  }, [setUser])
  if (!user) return <div className="text-center p-10">Loading Profile...</div>;

  return (
    <div>
      <div className="card w-full bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex items-center">
            <div className="avatar mx-50">
              <div className="ring-primary ring-offset-base-100 w-72 rounded-full ring-2 ring-offset-2">
                <img src={'https://i.pravatar.cc/300'} />
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
        <p><span className='text-accent'>Joined Date:</span> {user.joined_date}</p>
      </div>
    </div>
  );
};

export default UserProfile;