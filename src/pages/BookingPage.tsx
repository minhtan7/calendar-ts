import { useEffect, useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import { ChevronDownIcon, ChevronRightIcon, PlusIcon, TrashIcon } from "@heroicons/react/solid";
import Button from "components/ui/Button";


type BookingPageProps = {

}

function BookingPage({ }: BookingPageProps): JSX.Element {
    const fields = ["hello", "hi"]
    const ranges = [
        {
            "startTime": dayjs("2022-02-14T23:00:00.038Z"),
            "endTime": dayjs("2022-02-15T04:00:00.038Z")
        },
        {
            "startTime": dayjs("2022-02-15T00:00:00.038Z"),
            "endTime": dayjs("2022-02-15T05:00:00.038Z")
        },
        {
            "startTime": dayjs("2022-02-15T01:00:00.038Z"),
            "endTime": dayjs("2022-02-15T02:00:00.038Z")
        }
    ]
    const [slots, setSlots] = useState<Array<string>>([])
    const temp: string[] = []
    useEffect(() => {
        ranges.forEach((availability: { startTime: Dayjs, endTime: Dayjs }): void => {
            let diff = dayjs(availability.endTime).diff(dayjs(availability.startTime), "minutes")
            for (let i = 0; i < Math.round(diff / 60); i++) {
                const slot = dayjs(availability.startTime).add(i * 60, "minutes").format("hh:mm")
                if (!temp.includes(slot)) {
                    temp.push(slot)
                }
            }
        })
        setSlots(temp)
    }, [])

    return (
        <div>
            <h1>Availability</h1>
            <form className="col-span-3 space-y-2 lg:col-span-2">
                <div className="px-4 py-5 bg-white border border-gray-200 divide-y rounded-sm sm:p-6">
                    <h3>Change the start and end times of your day</h3>
                    <fieldset className="divide-y divide-gray-200">
                        {
                            fields.map(field => {
                                return (
                                    <fieldset className="flex min-h-[86px] justify-between space-y-2 py-5 sm:flex-row sm:space-y-0">
                                        <div className="w-1/3">
                                            <label className="flex items-center space-x-2 rtl:space-x-reverse">
                                                <input type="checkbox" className="inline-block border-gray-300 rounded-sm text-neutral-900 focus:ring-neutral-500" />
                                                <span className="inline-block text-sm capitalize">Monday</span>
                                            </label>
                                        </div>
                                        <div className="flex-grow " >
                                            {slots.map(slot => (
                                                <div className="flex justify-between mb-1">
                                                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                                        <div className="focus:border-primary-500 text-sm shadow-sm w-[6rem] css-b62m3t-container">
                                                            <div className=" css-1nxb8fi-control">
                                                                <div className="css-1d8n9bt">
                                                                    <div className=" css-qc6sy-singleValue">{slot}</div>
                                                                    <div className=" css-ackcql" >
                                                                        <input className="inputBookingPage" autoCapitalize="none" autoComplete="off" autoCorrect="off" id="react-select-2-input" spellCheck="false" tabIndex={0} type="text" aria-autocomplete="list" aria-expanded="false" aria-haspopup="true" aria-controls="react-select-2-listbox" aria-owns="react-select-2-listbox" role="combobox" value="" />
                                                                    </div>
                                                                </div>
                                                                <div className="css-1wy0on6">
                                                                    <div className=" css-tlfecz-indicatorContainer">
                                                                        <ChevronDownIcon className="w-5 h-5 group-hover:text-black dark:group-hover:text-white" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <span>-</span>
                                                        <div className="focus:border-primary-500 text-sm shadow-sm w-[6rem] css-b62m3t-container">
                                                            <div className=" css-1nxb8fi-control">
                                                                <div className="css-1d8n9bt">
                                                                    <div className=" css-qc6sy-singleValue">{slot}</div>
                                                                    <div className=" css-ackcql" >
                                                                        <input className="inputBookingPage" autoCapitalize="none" autoComplete="off" autoCorrect="off" id="react-select-2-input" spellCheck="false" tabIndex={0} type="text" aria-autocomplete="list" aria-expanded="false" aria-haspopup="true" aria-controls="react-select-2-listbox" aria-owns="react-select-2-listbox" role="combobox" value="" />
                                                                    </div>
                                                                </div>
                                                                <div className="css-1wy0on6">
                                                                    <div className=" css-tlfecz-indicatorContainer">
                                                                        <ChevronDownIcon className="w-5 h-5 group-hover:text-black dark:group-hover:text-white" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        color="minimal"
                                                        size="icon"
                                                        StartIcon={TrashIcon}
                                                        className="self-center p-2 ml-2"></Button>

                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <button>
                                                <Button
                                                        color="minimal"
                                                        size="icon"
                                                        StartIcon={PlusIcon}
                                                        className="self-center p-2 ml-2"></Button>
                                            </button>
                                        </div>
                                    </fieldset>)
                            })
                        }
                    </fieldset>

                </div>
                <div className="text-right">
                    <button className="relative inline-flex items-center px-3 py-2 text-sm font-medium border border-transparent rounded-sm dark:text-brandcontrast text-brandcontrast bg-brand dark:bg-brand hover:bg-opacity-90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-900">
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default BookingPage