import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../Shared/Navbar/Navbar';

const MainLayouts = () => {
    return (
      <>
        <Navbar></Navbar>
        <div className='mt-[72px]'>
          <Outlet></Outlet>
        </div>
      </>
    );
};

export default MainLayouts;