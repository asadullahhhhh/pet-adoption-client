import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const AdminRoute = ({children}) => {

    const { user, loading, role, roleLoading } = useAuth();
    const location = useLocation()

    if(loading || roleLoading) return <div>Loading...</div>

    if(!user || role?.role !== 'admin') {
        return <Navigate state={location.pathname} to={'/'}></Navigate>
    }

    return children
};

export default AdminRoute;