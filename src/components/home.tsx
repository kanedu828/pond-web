import React, { useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';


const webSocket = io(`${process.env.REACT_APP_POND_WS_URL}`, {
    withCredentials: true,
});

function Home(props: any) {
    const [fish, setFish] = useState<any | null>(null);
    const [isConnected, setIsConnected] = useState(webSocket.connected);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [exp, setExp] = useState(0);
    const [location, setLocation] = useState('');

    function getApiWrapper(endpoint: string, func: (data: any) => void) {
        fetch(`${process.env.REACT_APP_POND_API_URL}${endpoint}`, {
            method: 'get',
            credentials: 'include'
        })
            .then((res: any) => res.json())
            .then(func)
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        if (!isConnected) {
            getApiWrapper('/auth/good/', (data: any) => {
                setIsLoggedIn(data.authenticated)
            });
            
            getApiWrapper('/user/', (data: any) => {
                setUsername(data.username);
                setExp(data.exp);
                setLocation(data.location);
            });
    
            webSocket.on('connect', () => {
                setIsConnected(true);
            });
    
            webSocket.on('disconnect', () => {
                setIsConnected(false);
                alert('You have been disconnected by the server!');
            });
             
            webSocket.on('new-fish', (newFish: any) => {
        
                const millisecondsFishable = newFish.expirationDate - Date.now();
                if (millisecondsFishable > 0) {
                    console.log(newFish);
                    
                    // TODO: Unnessecary setTimesouts are being created.
                    // Find a solution to clear timeouts when fish is collected
                    // and when a new fish is recieved.
                    setTimeout(() => {
                        setFish(null);
                    }, millisecondsFishable);
                              
                    setFish(newFish);
                    
                } else {
                    setFish(null);
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
        setExp(exp + fish.expRewarded);
        alert(`You caught a ${fish.name} and gained ${fish.expRewarded} exp!`);
        setFish(null);
    }

    return (
        <div> 
            <div>
                <a href='http://127.0.0.1:5000/auth/google'> Log in </a>
                { isLoggedIn ? (
                    <h1> user id: {username} is logged in! </h1>
                ) : (<h1> You are not logged in! </h1>)}
            </div>
            <div>
                <h1> Is Connected: {isConnected.toString()}</h1>
            </div>
            <div>
                <h1>exp: {exp}</h1>
            </div>
            <div>
                {fish ? (
                    <button onClick={collectFish}> Fish here! </button>
                ) : (<h1> No Fish Here </h1>)}
                <h1> Data: {fish ? fish.name : 'no fish'} </h1>
            </div>
            
        </div>
    );
}

export { Home };