import React from 'react';
import Home from './Pages/Home';
import Login from './Components/Login';
import AddFixedCost from './Components/AddFixedCost'; 
import Navigatebar from './Components/Navigatebar';
import {Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Jobs from './Pages/Jobs';

function App() {
  return (
    <div>
    <Navigatebar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/addCost" element={<AddFixedCost/>}/>
      <Route path="/jobs" element={<Jobs/>}/>
    </Routes>
    </div>
  )
}

export default App