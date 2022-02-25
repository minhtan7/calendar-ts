import React, { useState } from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AvailabilityPage from 'pages/AvailabilityPage';
import BookingPage from 'pages/BookingPage';


function App() {
  
  // const AvailabilityPageProps = {
  //   eventType: {
  //     id: 123,
  //     customInputs: [{
  //       id: 123,
  //       label: "label",
  //       type: "type", required: true, placeholder: "placeholder"
  //     }],
  //     metadata: {
  //       smartContractAddress: 0
  //     },
  //     users: [{ avatar: "avater", name: "name" }],
  //     locations: [
  //       { type: locationType, address: "address" },
  //     ],
  //     length: 10,
  //     title: "title",
  //     disableGuests: Boolean,
  //     currency: "VND",
  //     price: 500000,
  //     description: "description",
  //   },

  //   profile: {
  //     slug: "slug",
  //     image: "iamge",
  //     name: "name",
  //     avatar: "avatar",
  //     brandColor: "brandColor"
  //   },
  //   booking: {
  //     attendees: [{ name: "name", email: "email" }]
  //   },


  // }


  return (

    <BrowserRouter>
      <Routes>
        <Route path='/availability' element={<AvailabilityPage/>}></Route>
        <Route path='/:mentorId/booking/:menteeId' element={<BookingPage/>}></Route>
      </Routes>
    </BrowserRouter>

    // <div className="flex App ">
    //   <AvailabilityPage />
      
    // </div>
  );
}

export default App;
