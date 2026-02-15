import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';

const RequireAuth = ({children}) => {
    const {isAuthenticated} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    // console.log(location);
    

    useEffect(() => {
        if(!isAuthenticated)
            navigate('/login', {
                state: {from: location}
            })
    }, [isAuthenticated, navigate, location])

    return isAuthenticated ? children : null;
};

export default RequireAuth;