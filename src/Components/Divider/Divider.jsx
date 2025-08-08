import React from 'react';
import useAuth from '../../hooks/useAuth';

const Divider = () => {
  const { darkLight } = useAuth();
    return (
      <>
        <div className={`${darkLight ? 'dark' : ''} dark:bg-gray-900 h-[200px] md:h-[230px] 2xl:h-[100px]`}>
            <p>j</p>
        </div>
      </>
    );
};

export default Divider;