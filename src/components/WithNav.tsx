import React from 'react';
import TopBar from './TopBar';
import { Outlet } from 'react-router';

const WithNav = () => {
  return (
    <>
      <TopBar hasBackground={true}/>
      <Outlet />
    </>
  );
};

export default WithNav;
