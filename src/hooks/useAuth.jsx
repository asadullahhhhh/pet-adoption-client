import React, { use } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const useAuth = () => {

    const auth = use(AuthContext)
    return auth
};

export default useAuth;