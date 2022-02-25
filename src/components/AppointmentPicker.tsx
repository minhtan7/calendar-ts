import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import  duration from 'dayjs/plugin/duration'
import { useParams } from "react-router-dom";

dayjs.extend(duration)

// import { useLocale } from "@lib/useLocale";

type AppointmentPickerProps = {
    date: Dayjs,
    handleModal: ()=>void,
    createSession: ({slot, menteeId, date}:any)=> void
}

function AppointmentPicker({
    date, handleModal, createSession
}: AppointmentPickerProps): JSX.Element {
    //   const { t, i18n } = useLocale();
    // XXX: Add i18n support

    const [slots, setSlots] = useState<Array<string>>([])
    let {menteeId, mentorId} = useParams()
    console.log("mentee", menteeId)
    useEffect(()=>{
        const fetchRange = async ()=>{
            let url = `${process.env.BACKEND_URL}/${mentorId}/availability`

            let newDate = dayjs(date).toISOString()

            url += `?date=${newDate}`
            const res = await fetch(url)
            const data = await res.json()

            const temp:string[] =[]

            data.ranges[0].ranges.forEach((availability:{startTime: Dayjs, endTime: Dayjs}):void =>{
                let diff = dayjs(availability.endTime).diff(dayjs(availability.startTime), "minutes")
                for(let i=0; i<Math.round(diff/60); i++){
                    const slot = dayjs(availability.startTime).add(i*60, "minutes").format("hh:mm a")
                    if(!temp.includes(slot)){
                        temp.push(slot)
                    }
                }
            })
            setSlots(temp)
        }
        fetchRange()
    }, [date.toISOString()])

    return <div className="flex flex-col mt-8 text-center sm:mt-0 sm:w-1/3 sm:pl-4 md:-mb-5"><h1> {dayjs(date).toDate().toLocaleString('en-US', { dateStyle: "full" })} </h1>
        <div className="flex-grow overflow-y-auto md:h-[364px]">
            {slots.map((slot) => (
                <button onClick={()=>{
                    console.log("slot", slot)
                    handleModal();
                    createSession({slot, menteeId, date})
                }} key={slot} className="block w-full py-4 mb-2 font-medium bg-white border rounded-sm text-primary-500 hover:bg-brand hover:text-brandcontrast dark:hover:bg-brand dark:hover:text-brandcontrast hover:text-white dark:border-transparent dark:bg-gray-600 dark:text-neutral-200 dark:hover:border-black border-brand">{slot}</button>
            ))}
        </div>
    </div>
}

export default AppointmentPicker;