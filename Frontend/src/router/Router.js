import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './../pages/Home';
import Login from './../pages/Login';
import Register from './../pages/Register';
import SearchList from './../pages/SearchList';
import Travel from './../pages/Travel';
import TravelDetails from './../pages/TravelDetails';
import ThankYou from '../pages/ThankYou';
import About from '../pages/About';

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        
        <Route path="/home" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/travel" element={<Travel />} />

        <Route path="/tours/:id" element={<TravelDetails />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/thank-you" element={<ThankYou />} />

        <Route path="/travel/searchlist" element={<SearchList />} />
      </Routes>
    </div>
  );
};

export default Router;
