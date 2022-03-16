import classNames from "../lib/classNames"
import React, { useEffect, useState } from "react"
import { CalendarIcon, ClockIcon } from "@heroicons/react/solid"
import Button from "./ui/Button"
import { useParams } from "react-router-dom"
import dayjs, { Dayjs } from "dayjs"

interface BookingModalProps {
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    slot: string,
    date: Dayjs
}
interface DefaultParticipant {
    mentor?: {name: string, email: string},
    mentee?:{name: string, email: string}
}
const defaultParticipant = {
    mentor: {name:"mentor", email: "mentor@coderschool.vn"},
    mentee:{name: "mentee", email: "mentee@coderschool.vn"}
}

function BookingModal({ show, setShow, slot, date }: BookingModalProps): JSX.Element {
    let { mentorId, menteeId } = useParams()

    const [participant, setParticipant] = useState<DefaultParticipant>(defaultParticipant)

    const createSession = ({ slot,date,menteeId, mentorId }: any): void => {
        const slotInCurrentDay = dayjs(slot, "hh:mm a")
        const hour = slotInCurrentDay.get('hour')
        const minute = slotInCurrentDay.get("minute")
        const startAt = date.clone().startOf("date").set("hour", hour).set("minute", minute)
        const endAt = startAt.clone().add(60, "minute")
        const body = {
            triggerEvent: "BOOKING",
            payload: {
                mentor: mentorId,
                mentee: menteeId,
                startAt,
                endAt
            }
        }
        const createNewSession = async () => {
            const url = `${process.env.REACT_APP_BACKEND_URL}/sessions`
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            const data = await res.json()
            console.log("data", data)
        }
        createNewSession()
    }
    useEffect(() => {
        const fetchParticipant = async (role: string, id:string|undefined):Promise<void> => {
            const url = `${process.env.REACT_APP_BACKEND_URL}/${role}/${id}`
            const res = await fetch(url)
            const data = await res.json()
            setParticipant({...participant, [role]:data[role]})
        }
        fetchParticipant("mentor", mentorId)
        fetchParticipant("mentee", menteeId)
    }, [mentorId, menteeId])
    const modalHandler = () => {
        setShow(!show)
    }
    const handleSubmit =(e:React.SyntheticEvent<HTMLFormElement>):void=>{
        e.preventDefault()
        createSession({slot,date,menteeId, mentorId })
        setShow(!show)
    }
    return (<>
        <div className={classNames(!show && "hidden", "fixed top-0 bottom-0 left-0 right-0 z-10 py-12 transition duration-150 ease-in-out bg-gray-700 opacity-50")}></div>
        <div className={classNames(!show && "hidden", "fixed top-0 bottom-0 left-0 right-0 z-10 py-12 transition duration-150 ease-in-out text-left")} id="modal">
            <div role="alert" className="container w-11/12 max-w-lg mx-auto md:w-2/3">
                <div className="overflow-hidden bg-white border border-gray-200 dark:border-0 dark:bg-neutral-900 sm:rounded-sm">
                    <div className="px-4 py-5 sm:flex sm:p-4">
                        <div className="sm:w-1/2 sm:border-r sm:dark:border-gray-800">

                            <h2 className="mt-2 font-medium text-gray-500 font-cal dark:text-gray-300">
                                {participant?.mentor?.name}
                            </h2>
                            <h1 className="mb-4 text-3xl font-semibold text-gray-800 dark:text-white">
                                Mentoring Session
                            </h1>
                            <p className="mb-2 text-gray-500">
                                <ClockIcon className="inline-block w-4 h-4 mr-1 -mt-1" />
                                60 minutes
                            </p>
                            <p>date time</p>
                            <p className="mb-4 text-green-500">
                                <CalendarIcon className="inline-block w-4 h-4 mr-1 -mt-1" />
                                {`${date.format("ddd DD-MM-YYYY")}, ${slot} `}
                            </p>

                            <p className="mb-8 text-gray-600 dark:text-white"></p>
                        </div>
                        <div className="sm:w-1/2 sm:pl-8 sm:pr-4">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-white">
                                        Your Name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            // {...bookingForm.register("name")}
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="block w-full border-gray-300 rounded-sm shadow-sm focus:border-brand focus:ring-black dark:border-gray-900 dark:bg-black dark:text-white sm:text-sm"
                                            placeholder={participant?.mentee?.name}
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 dark:text-white">
                                        Your email address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            // {...bookingForm.register("email")}
                                            className="block w-full border-gray-300 rounded-sm shadow-sm focus:border-brand focus:ring-black dark:border-gray-900 dark:bg-black dark:text-white sm:text-sm"
                                            placeholder={participant?.mentee?.email}
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="notes"
                                        className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">
                                        Additional Notes
                                    </label>
                                    <textarea
                                        //   {...bookingForm.register("notes")}
                                        id="notes"
                                        rows={3}
                                        className="block w-full border-gray-300 rounded-sm shadow-sm focus:border-brand focus:ring-black dark:border-gray-900 dark:bg-black dark:text-white sm:text-sm"
                                        placeholder="Something you want to note"
                                    />
                                </div>
                                <div className="flex items-start space-x-2 rtl:space-x-reverse">
                                    <Button type="submit" >
                                        Confirm
                                    </Button>
                                    <Button color="secondary" type="button" onClick={modalHandler}>
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default BookingModal