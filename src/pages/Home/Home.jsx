import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Banner from '../../Components/Banner';
import PopularContents from '../../Components/PopularContests';

const Home = () => {
    const {user} = useAuth()
    const [msg, setMsg] = useState('')
    const [popularContestsData, setPopularContestsData] = useState([])

    useEffect(() => {
        console.log(user);
    },[user])


    useEffect(() => {
        const fetchData = async () => {
            // setIsLoading(true)
            let res = await fetch('http://localhost:3000/')
            let data = await res.json()
            // console.log(data);
            // setMsg(data)

            res = await fetch('/api.json')
            data = await res.json()
            console.log(data);
            setPopularContestsData(data)            
        }
        fetchData()
    }, [setMsg, setPopularContestsData])

    return (
        <div>
            home
            {msg && <p>Message : {msg.msg}</p>}
            <Banner />
            <PopularContents contests={popularContestsData} />
        </div>
    );
};

export default Home;