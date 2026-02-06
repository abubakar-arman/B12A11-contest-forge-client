import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Banner from '../../Components/Banner';

const Home = () => {
    const {user} = useAuth()
    const [msg, setMsg] = useState('')

    useEffect(() => {
        console.log(user);
    },[user])


    useEffect(() => {
        const fetchData = async () => {
            // setIsLoading(true)
            const res = await fetch('http://localhost:3000/')
            const data = await res.json()
            console.log(data);
            setMsg(data)
        }
        fetchData()
    }, [setMsg])

    return (
        <div>
            home
            {msg && <p>Message : {msg.msg}</p>}
            <Banner />
        </div>
    );
};

export default Home;