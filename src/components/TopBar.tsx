import React from 'react';
import '../styles/topbar.css';
import '../styles/shared.css';
import { getApiWrapper } from '../util/apiUtil';
import { NavLink } from 'react-router-dom';

export default function TopBar() {

  function logOut() {
    getApiWrapper('/auth/logout/', (data: any) => {});
  }

  return (
    <div className="topbar-container">
      <NavLink className="topbar-button" to="/">
        Fishing
      </NavLink>
      <NavLink className="topbar-button" to="/collection">
        Collection
      </NavLink>
      <NavLink onClick={logOut} className="topbar-button" to="/login">
        Logout
      </NavLink>
    </div>
  );
}
