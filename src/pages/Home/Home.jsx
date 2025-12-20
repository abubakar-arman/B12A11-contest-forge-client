import React, { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';

const Home = () => {
    const {user} = useAuth()
    useEffect(() => {
        console.log(user);
    },[user])
    return (
        <div>
            home
        </div>
    );
};

export default Home;