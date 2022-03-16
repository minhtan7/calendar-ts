import AppointmentPicker from "../components/AppointmentPicker"
import DatePicker from "../components/DatePicker"
import dayjs, { Dayjs } from "dayjs"
import { useState } from "react"
import BookingModal from "../components/BookingModal"
import { useParams } from "react-router-dom"
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)


enum PeriodType {
  ROLLING = "rolling",
  RANGE = "range",
  UNLIMITED = "unlimited"
}

interface SessionState {
  mentor?: string,
  mentee?: string,
  startAt?: Date,
  endAt?: Date,
  title?: string,
  description?: string,
  mentorJoinAt?: Date,
  isCanceled?: boolean,
}

function BookingPage() {
  
  
  const onDatePicked = new Date()
  const [date, setDate] = useState<Dayjs>(dayjs().add(2,"day"))
  const [session, setSession] = useState<SessionState>({})
  let { mentorId, menteeId } = useParams()


  const eventLength = 1
  // const date = dayjs()

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

 
  
  return <div className="flex items-center justify-center w-screen h-screen m-auto App">
    <div className="flex justify-around w-3/5 p-4 py-5 border border-brand">
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
    <AppointmentPicker date={date} />
  </div>
  </div>
}

export default BookingPage