import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../Shared/Navbar/Navbar';
import Footer from '../../Shared/Footer/Footer';
import { Helmet } from 'react-helmet-async';

const MainLayouts = () => {
    return (
      <>
        <Helmet>
          <title>Tailwag || Home</title>
        </Helmet>
        <Navbar></Navbar>
        <div className="mt-[49px] sm:mt-[53px] lg:mt-[72px]">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </>
    );
};

export default MainLayouts;