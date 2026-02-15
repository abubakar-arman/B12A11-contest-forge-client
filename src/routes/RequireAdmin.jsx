import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Spinner2 from '../Components/Spinner2';
import Forbidden from '../pages/Forbidden';

const RequireAdmin = ({ children }) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Spinner2 />
    }

    if (role !== 'admin') {
        // console.log('Protected Route for Admins')
        return <Forbidden />
    }

    return children;
};

export default RequireAdmin;