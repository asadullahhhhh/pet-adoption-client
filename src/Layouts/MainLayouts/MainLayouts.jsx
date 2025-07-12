import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../Shared/Navbar/Navbar';
import Footer from '../../Shared/Footer/Footer';

const MainLayouts = () => {
    return (
      <>
        <Navbar></Navbar>
        <div className='mt-[72px]'>
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </>
    );
};

export default MainLayouts;