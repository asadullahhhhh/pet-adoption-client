import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../Shared/Navbar/Navbar';

const MainLayouts = () => {
    return <>
        <Navbar></Navbar>
        <Outlet></Outlet>
    </>
};

export default MainLayouts;