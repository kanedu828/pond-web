import React from 'react';
import TopBar from './TopBar';
import { Outlet } from 'react-router';

const FishingNav = () => {
  return (
    <>
      <TopBar hasBackground={false}/>
      <Outlet />
    </>
  );
};

export default FishingNav;
