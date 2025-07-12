import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {

    const {user, loading} = useAuth()
    const location = useLocation()

   if(loading) return <div>Loading...</div>

   if(!user) return <Navigate state={location.state} to={'/login'}></Navigate>

    return children
};

export default PrivateRoute;