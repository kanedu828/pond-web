import React from 'react';
import '../styles/topbar.css';
import '../styles/shared.css';
import { getApiWrapper } from '../util/apiUtil';
import { NavLink } from 'react-router-dom';

interface TopBarProps {
  hasBackground: boolean;
}

export default function TopBar(props: TopBarProps) {

  function logOut() {
    getApiWrapper('/auth/logout/', (_data: any) => {});
  }

  return (
    <div className={props.hasBackground ? "topbar-container topbar-background": "topbar-container"}>
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
