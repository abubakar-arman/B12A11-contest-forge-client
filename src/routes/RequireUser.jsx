import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Spinner2 from '../Components/Spinner2';
import Forbidden from '../pages/Forbidden';

const RequireUser = ({ children }) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Spinner2 />
    }

    if (role !== 'user') {
        // console.log('Protected Route for Users')
        return <Forbidden />
    }

    return children;
};

export default RequireUser;