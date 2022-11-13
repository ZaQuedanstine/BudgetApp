import React from 'react';
import Home from './Components/Home';
import Login from './Components/Login';
import AddFixedCost from './Components/AddFixedCost';
import AddJob from './Components/AddJob';
import RemoveJob from './Components/RemoveJob';
import UpdateJob from './Components/UpdateJob';
import Navigatebar from './Components/Navigatebar';
import {Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
    <Navigatebar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/addCost" element={<AddFixedCost/>}/>
      <Route path="/addJob" element={<AddJob/>}/>
      <Route path="/removeJob" element={<RemoveJob/>}/>
      <Route path="/updateJob" element={<UpdateJob/>}/>
    </Routes>
    </>
  )
}

export default App