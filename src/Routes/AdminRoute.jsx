import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import {GridLoader} from 'react-spinners'

const AdminRoute = ({children}) => {

    const { user, loading, role, roleLoading, darkLight } = useAuth();
    const location = useLocation()

    if(loading || roleLoading) return (
     <div className={`${darkLight ? 'dark' : ''} dark:bg-gray-900 min-h-screen flex justify-center items-center`}>
            <GridLoader size={12} color={darkLight ? '#fff' : '#000'} />
          </div>
    );

    if(!user) {
        return <Navigate state={location.pathname} to={'/login'}></Navigate>
    }

    if(role?.role !== 'admin'){
        return (
          <Navigate state={location.pathname} to={"/forbidden"}></Navigate>
        );
    }

    return children
};

export default AdminRoute;