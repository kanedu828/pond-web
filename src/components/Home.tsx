import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { getApiWrapper } from '../util/apiUtil';
import TopBar from './TopBar';
import '../styles/home.css';
import '../styles/shared.css';
import CollectionModal from './CollectionModal';

const webSocket = io(`${process.env.REACT_APP_POND_WS_URL}`, {
    withCredentials: true,
});

interface HomeProps {}

function Home(props: HomeProps) {
    const [fish, setFish] = useState<any | null>(null);
    const [isConnected, setIsConnected] = useState(webSocket.connected);
    const [username, setUsername] = useState('');
    const [exp, setExp] = useState(0);
    const [showCollection, setShowCollection] = useState(false);
    const [location, setLocation] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!isConnected) {
            getApiWrapper('/auth/good/', (data: any) => {
                if (!data.authenticated) {
                    navigate('login');
                }
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
                        document.title = 'Pond';
                    }, millisecondsFishable);                            
                    setFish(newFish);
                    document.title = 'New Fish!';          
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
        if (fish) {
            webSocket.emit('collect-fish', fish);
            setExp(exp + fish.expRewarded);
            alert(`You caught a ${fish.name} and gained ${fish.expRewarded} exp!`);
            setFish(null);
            document.title = 'Pond';
        }     
    }

    return (
        <div className='home-container'> 
            <TopBar isConnected={isConnected} setShowCollection={setShowCollection}/>
            <CollectionModal show={showCollection} setShowCollection={setShowCollection}/>

            <div className='fishing-container'>
                <div style={{backgroundColor:fish ? 'red' : 'black'}} onClick={collectFish} className='fishing-box'> 
                    
                </div>
            </div>

            
        </div>
    );
}

export { Home };