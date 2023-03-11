import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Collection from './Collection';
import { Home } from './Home';
import Login from './Login';
import WithNav from './WithNav';
import WithoutNav from './WithoutNav';
import Modal from 'react-modal';
import FishingNav from './FishingNav';
import { useEffect } from 'react';

Modal.setAppElement('#root');

function App() {
  useEffect(() => {
    document.title = 'Pond';
  }, []);
  return (
    <div>
      <Routes>
        <Route element={<WithoutNav />}>
          <Route path="/login/" element={<Login />} />
        </Route>
        <Route element={<WithNav />}>
          <Route path="/collection" element={<Collection />} />
        </Route>
        <Route element={<FishingNav />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
