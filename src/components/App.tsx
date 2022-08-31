import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Collection from "./Collection";
import { Home } from "./Home";
import Login from "./Login";
import WithNav from "./WithNav";
import WithoutNav from "./WithoutNav";
import Modal from 'react-modal';


Modal.setAppElement('#root');

function App() {
  return (
    <div>
      <Routes>
        <Route element={<WithoutNav />}>
          <Route path="/login/" element={<Login />} />
        </Route>
        <Route element={<WithNav />}>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
        </Route>       
      </Routes>
    </div>
  );
}

export default App;