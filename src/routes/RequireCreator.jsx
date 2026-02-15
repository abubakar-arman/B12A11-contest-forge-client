import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Spinner2 from '../Components/Spinner2';
import Forbidden from '../pages/Forbidden';

const RequireCreator = ({ children }) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Spinner2 />
    }

    if (role !== 'creator') {
        // console.log('Protected Route for Creators')
        return <Forbidden />
    }

    return children;
};

export default RequireCreator;