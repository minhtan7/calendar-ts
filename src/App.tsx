import React, { useState } from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AvailabilityPage from 'pages/AvailabilityPage';
import BookingPage from 'pages/BookingPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/availability/:mentorId' element={<AvailabilityPage/>}></Route>
        <Route path='/:mentorId/booking/:menteeId' element={<BookingPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
