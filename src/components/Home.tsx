import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { getApiWrapper } from '../util/apiUtil';
import '../styles/home.css';
import '../styles/shared.css';
import FishModal from './FishModal';
import { motion } from 'framer-motion';
import alertIcon from '../assets/images/icons/alert.svg';
import ProgressBar from './ProgressBar';
import { expToLevel, percentToNextLevel } from '../util/util';

const webSocket = io(`${process.env.REACT_APP_POND_WS_URL}`, {
  withCredentials: true
});

function Home() {
  const [fish, setFish] = useState<any | null>(null);
  const [isConnected, setIsConnected] = useState(webSocket.connected);
  const [exp, setExp] = useState(0);
  const [showFishModal, setShowFishModal] = useState(false);
  const navigate = useNavigate();
  const [fishTimeoutId, setFishTimeoutId] = useState(-1);

  useEffect(() => {
    getApiWrapper('/auth/good/', (data: any) => {
      console.log(data);
      if (!data.authenticated) {
        navigate('login');
      }
    });

    getApiWrapper('/user/', (data: any) => {
      setExp(data.exp);
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
        const timeoutId = window.setTimeout(() => {
          setFish(null);
          document.title = 'Pond';
        }, millisecondsFishable);
        setFishTimeoutId(timeoutId);
        setFish(newFish);
        document.title = 'New Fish!';
      } else {
        setFish(null);
      }
    });

    return () => {
      webSocket.off('connect');
      webSocket.off('disconnect');
      webSocket.off('new-fish');
    };
  }, []);

  function collectFish() {
    if (fish) {
      window.clearTimeout(fishTimeoutId);
      webSocket.emit('collect-fish', fish);
      setExp(exp + fish.expRewarded);
      // alert(`You caught a ${fish.name} and gained ${fish.expRewarded} exp!`);
      setShowFishModal(true);
      document.title = 'Pond';
    }
  }

  function finishCollectFish() {
    setShowFishModal(false);
    setFish(null);
  }

  return (
    <div className="home-container">
      <ProgressBar level={expToLevel(exp)} completed={percentToNextLevel(exp)}/>

      <FishModal isOpen={showFishModal} onRequestClose={finishCollectFish} fish={fish} />
      <div>Is Connected: {isConnected.toString()}</div>
      <div onClick={collectFish} className="fishing-container">
        {fish ? (
          <motion.div
            animate={{
              scale: [1, 1.2, 1]
            }}
            transition={{
              repeat: Infinity,
              duration: 1.3,
              ease: 'easeInOut'
            }}
          >
            <img className="fishing-alert" src={alertIcon} />
          </motion.div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export { Home };
