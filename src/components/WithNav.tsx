import React from 'react';
import TopBar from './TopBar';
import { Outlet } from 'react-router';

export default () => {
  return (
    <>
      <TopBar />
      <Outlet />
    </>
  );
};