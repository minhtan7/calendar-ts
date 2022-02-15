import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import dayjs, { Dayjs } from "dayjs";
import DatePicker from './components/DatePicker';
import AppointmentPicker from './components/AppointmentPicker';

// import BookingPage from 'pages/BookingPage';
import { LocationType } from '@lib/location';


function App() {
  const onDatePicked = new Date()
  const [date, setDate] = useState(dayjs())
  const workingHours = [
    {
      days: [1, 2, 3, 4],
      startTime: 10,
      endTime: 11,
    }, {
      days: [4, 5, 6],
      startTime: 15,
      endTime: 16,
    }
  ]


  enum PeriodType {
    ROLLING = "rolling",
    RANGE = "range",
    UNLIMITED = "unlimited"
  }

  const eventLength = 1
  // const date = dayjs()
  console.log("date", date);
  const periodType = PeriodType.RANGE
  const periodStartDate = new Date()
  const periodEndDate = null
  const periodDays = 3
  const periodCountCalendarDays = true
  const minimumBookingNotice = 5
  const locationType = {
    InPerson: "inPerson",
    Phone: "phone",
    GoogleMeet: "integrations:google:meet",
    Zoom: "integrations:zoom",
    Daily: "integrations:daily",
    Jitsi: "integrations:jitsi",
    Huddle01: "integrations:huddle01",
    Tandem: "integrations:tandem",
  }
  const bookingPageProps = {
    eventType: {
      id: 123,
      customInputs: [{
        id: 123,
        label: "label",
        type: "type", required: true, placeholder: "placeholder"
      }],
      metadata: {
        smartContractAddress: 0
      },
      users: [{ avatar: "avater", name: "name" }],
      locations: [
        { type: locationType, address: "address" },
      ],
      length: 10,
      title: "title",
      disableGuests: Boolean,
      currency: "VND",
      price: 500000,
      description: "description",
    },

    profile: {
      slug: "slug",
      image: "iamge",
      name: "name",
      avatar: "avatar",
      brandColor: "brandColor"
    },
    booking: {
      attendees: [{ name: "name", email: "email" }]
    },


  }

  console.log("date", date)
  return (
    <div className="flex App ">
      <DatePicker date={date}
        setDate={setDate}
        periodType={periodType}
        periodStartDate={periodStartDate}
        periodEndDate={periodEndDate}
        periodDays={periodDays}
        periodCountCalendarDays={periodCountCalendarDays}
        onDatePicked={onDatePicked}
        workingHours={workingHours}
        weekStart={"Sunday"}
        eventLength={eventLength}
        minimumBookingNotice={minimumBookingNotice} />
      {/* <BookingPage {...bookingPageProps}/> */}
      <AppointmentPicker date={date} />
    </div>
  );
}

export default App;
