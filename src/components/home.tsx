import React, { useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import { ServerToClientEvents, ClientToServerEvents } from '../types';


const webSocket = io(`${process.env.REACT_APP_POND_WS_URL}`, {
    withCredentials: true,
});

function Home(props: any) {
    const [fish, setFish] = useState(null);
    const [isConnected, setIsConnected] = useState(webSocket.connected);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (!isConnected) {
            console.log('Use effect if not connected');
            fetch(`${process.env.REACT_APP_POND_API_URL}/auth/good`, {
                method: 'get',
                credentials: 'include'
            })
                .then((res: any) => res.json())
                .then((json) => {
                    console.log(json);
                    setIsLoggedIn(json.authenticated);
                })
                .catch((err) => {
                    console.log(err);
                });
    
            webSocket.on('connect', () => {
                setIsConnected(true);
            });
    
            webSocket.on('disconnect', () => {
                setIsConnected(false);
                console.log('disconnected by the server!');
            });
             
            webSocket.on('new-fish', (fish: any) => {
                console.log(fish);     
        
                const millisecondsFishable = fish.expirationDate - Date.now();
                if (millisecondsFishable > 0) {
                    setFish(fish.name);
                } else {
                    setTimeout(() => {
                        setFish(null);
                    }, millisecondsFishable);
                }            
            })
    
            return () => {
                webSocket.off('connect');
                webSocket.off('disconnect');
                webSocket.off('new-fish');
            }; 
        }      
    }, []);

    function collectFish() {
        webSocket.emit('collect-fish', fish);
        setFish(null);
    }

    return (
        <div> 
            <div>
                <a href='http://127.0.0.1:5000/auth/google'> Log in </a>
                { isLoggedIn ? (
                    <h1> You are logged in! </h1>
                ) : (<h1> You are not logged in! </h1>)}
            </div>
            <div>
                <h1> Is Connected: {isConnected.toString()}</h1>
            </div>
            <div>
                {fish ? (
                    <button onClick={collectFish}> Fish here! </button>
                ) : (<h1> No Fish Here </h1>)}
                <h1> Data: {fish} </h1>
            </div>
            
        </div>
    );
}

export { Home };