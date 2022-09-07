import React, { useEffect } from 'react';
import '../styles/topbar.css';
import '../styles/shared.css';
import { getApiWrapper } from '../util/apiUtil';
import { NavLink, useNavigate } from 'react-router-dom';
import homeIcon from '../assets/images/icons/home.svg';
import logoutIcon from '../assets/images/icons/log-out.svg';
import fishIcon from '../assets/images/icons/fish.svg';



interface TopBarProps {
}

export default function TopBar(props: TopBarProps) {
    const navigate = useNavigate();

    function logOut() {
        getApiWrapper('/auth/logout/', (data: any) => {});
    }

    return (
        <div className='topbar-container'>
            <NavLink className='topbar-button' to='/'>
                Fishing
            </NavLink>
            <NavLink className='topbar-button' to='/collection'>
                Collection
            </NavLink>
            <NavLink onClick={logOut} className='topbar-button' to='/login'>
                Logout
            </NavLink>
        </div>
    );
}