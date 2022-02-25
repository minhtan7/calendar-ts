import classNames from "../lib/classNames"
import React from "react"
import { CalendarIcon, ClockIcon } from "@heroicons/react/solid"
import Button from "./ui/Button"

interface BookingModalProps {
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

function BookingModal({ show, setShow }: BookingModalProps): JSX.Element {
    const modalHandler = () => {
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
                                tan
                            </h2>
                            <h1 className="mb-4 text-3xl font-semibold text-gray-800 dark:text-white">
                                mentor sesssion
                            </h1>
                            <p className="mb-2 text-gray-500">
                                <ClockIcon className="inline-block w-4 h-4 mr-1 -mt-1" />
                                60 minutes
                            </p>
                            <p>date time</p>
                            <p className="mb-4 text-green-500">
                                <CalendarIcon className="inline-block w-4 h-4 mr-1 -mt-1" />
                                date
                            </p>

                            <p className="mb-8 text-gray-600 dark:text-white">description</p>
                        </div>
                        <div className="sm:w-1/2 sm:pl-8 sm:pr-4">
                            <form >
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-white">
                                        your name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            // {...bookingForm.register("name")}
                                            type="text"
                                            name="name"
                                            id="name"
                                            required
                                            className="block w-full border-gray-300 rounded-sm shadow-sm focus:border-brand focus:ring-black dark:border-gray-900 dark:bg-black dark:text-white sm:text-sm"
                                            placeholder={"example_name"}
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 dark:text-white">
                                        {"email_address"}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            // {...bookingForm.register("email")}
                                            required
                                            className="block w-full border-gray-300 rounded-sm shadow-sm focus:border-brand focus:ring-black dark:border-gray-900 dark:bg-black dark:text-white sm:text-sm"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="notes"
                                        className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">
                                        {"additional_notes"}
                                    </label>
                                    <textarea
                                        //   {...bookingForm.register("notes")}
                                        id="notes"
                                        rows={3}
                                        className="block w-full border-gray-300 rounded-sm shadow-sm focus:border-brand focus:ring-black dark:border-gray-900 dark:bg-black dark:text-white sm:text-sm"
                                        placeholder={"share_additional_notes"}
                                    />
                                </div>
                                <div className="flex items-start space-x-2 rtl:space-x-reverse">
                                    <Button type="submit" >
                                        confirm
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