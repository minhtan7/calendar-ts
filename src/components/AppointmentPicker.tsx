import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import  duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

// import { useLocale } from "@lib/useLocale";

type AppointmentPickerProps = {
    date: Dayjs,
}

function AppointmentPicker({
    date
}: AppointmentPickerProps): JSX.Element {
    console.log('my date', date);
    //   const { t, i18n } = useLocale();
    // XXX: Add i18n support

    const [slots, setSlots] = useState<Array<string>>([])
    useEffect(()=>{
        const fetchRange = async ()=>{
            const url = "http://localhost:5000/1/availability"
            const res = await fetch(url)
            const data = await res.json()
            const temp:string[] =[]
            data.ranges.forEach((availability:{startTime: Dayjs, endTime: Dayjs}):void =>{
                let diff = dayjs(availability.endTime).diff(dayjs(availability.startTime), "minutes")
                for(let i=0; i<Math.round(diff/60); i++){
                    const slot = dayjs(availability.startTime).add(i*60, "minutes").format("hh:mm")
                    if(!temp.includes(slot)){
                        temp.push(slot)
                    }
                }
            })
            setSlots(temp)
        }
        fetchRange()
    }, [date])
const a = dayjs()
console.log("a", a.add(1, "hour"))


//     function addMinutes(date:Dayjs, minutes:number):Dayjs {
//         dayjs.tz(date, "Vietnam/Ha_Noi")
//         dayjs(date.)
//         return new Date(date.getTime() + minutes*60000);
// }

    // const slots = ["07:00 PM", "08:00 PM", "09:00 PM"]
    return <div className="flex flex-col mt-8 text-center sm:mt-0 sm:w-1/3 sm:pl-4 md:-mb-5"><h1> {dayjs(date).toDate().toLocaleString('en-US', { dateStyle: "full" })} </h1>
        <div className="flex-grow overflow-y-auto md:h-[364px]">
            {slots.map((slot) => (
                <a className="block py-4 mb-2 font-medium bg-white border rounded-sm text-primary-500 hover:bg-brand hover:text-brandcontrast dark:hover:bg-brand dark:hover:text-brandcontrast hover:text-white dark:border-transparent dark:bg-gray-600 dark:text-neutral-200 dark:hover:border-black border-brand">{slot}</a>
            ))}
        </div>
    </div>
}

export default AppointmentPicker;