import axios from 'axios';
import React from 'react';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials : true
});
const useAxiosSecure = () => {
    return axiosInstance
};

export default useAxiosSecure;