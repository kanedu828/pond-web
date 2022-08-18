import React, { useEffect } from 'react';
import '../styles/topbar.css';
import '../styles/shared.css';
import { getApiWrapper } from '../util/apiUtil';
import { useNavigate } from 'react-router-dom';


interface TopBarProps {
    isConnected: boolean,
    setShowCollection: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function TopBar(props: TopBarProps) {
    const navigate = useNavigate();


    function logOut() {
        getApiWrapper('/auth/logout/', (data: any) => {});
        navigate('login');
    }

    function showCollection() {
        props.setShowCollection(true);
    }

    return (
        <div className='topbar-container'>
            <button onClick={showCollection} className='topbar-button'>
                Collection
            </button>
            <button className='topbar-button'>
                Friends
            </button>
            <div className='connection-status'>
                Connected to Server: {props.isConnected.toString()}
            </div>
            <button onClick={logOut} className='topbar-button topbar-logout'>
                Log out
            </button>
        </div>
    );
}