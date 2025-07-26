import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import { GridLoader } from "react-spinners";

const PrivateRoute = ({children}) => {

    const {user, loading, darkLight} = useAuth()
    const location = useLocation()

   if(loading) return (
     <div className={`${darkLight ? 'dark' : ''} dark:bg-gray-900 min-h-screen flex justify-center items-center`}>
       <GridLoader size={12} color={darkLight ? '#fff' : '#000'} />
     </div>
   );

   if(!user) return <Navigate state={location.state} to={'/login'}></Navigate>

    return children
};

export default PrivateRoute;