import React, { useCallback, useEffect, useState } from "react"
import dayjs, { Dayjs, ConfigType } from "dayjs"
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone' // dependent on utc plugin

import { weekdayNames } from "../lib/weekday";
import { ChevronDownIcon, ChevronRightIcon, PlusIcon, TrashIcon } from "@heroicons/react/solid";
import Button from "components/ui/Button";
import Select from "components/ui/Select";

dayjs.extend(utc)
dayjs.extend(timezone)

type AvailabilityPageProps = {

}

type Option = {
    readonly label: string;
    readonly value: number;
};

type Slots = {
    day: string,
    ranges: {
        startTime: string,
        endTime: string,
    }[]
}

function AvailabilityPage({ }: AvailabilityPageProps): JSX.Element {
    // const fields = ["hello", "hi"]
    // const ranges = [
    //     {
    //         "startTime": "2022-02-15T04:00:00.038Z",
    //         "endTime": "2022-02-15T07:00:00.038Z"
    //     },
    //     {
    //         "startTime": "2022-02-15T09:00:00.038Z",
    //         "endTime": "2022-02-15T10:00:00.038Z"
    //     },
    //     {
    //         "startTime": "2022-02-15T14:00:00.038Z",
    //         "endTime": "2022-02-15T17:00:00.038Z"
    //     }
    // ]
    const defaultDay = dayjs.utc(0).format()
    const defaultRange = [{
        startTime: defaultDay,
        endTime: defaultDay
    }]

    const weekDay = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ]

    const rangeOfWeek = weekDay.map((day) => {
        return {
            day,
            ranges: defaultRange
        }
    }
    )
    // const rangeOfWeek = [
    //     {
    //         day: "Monday", 
    //         ranges: [{
    //         "startTime": "2022-02-15T00:00:00.000Z",
    //         "endTime": "2022-02-15T00:00:00.000Z"
    //     }]
    //     },
    //     {
    //         day: "Tuesday", ranges: [{
    //         "startTime": "2022-02-15T00:00:00.000Z",
    //         "endTime": "2022-02-15T00:00:00.000Z"
    //     }]
    //     },
    //     {
    //         day: "Wednesday", ranges: [{
    //         "startTime": "2022-02-15T00:00:00.000Z",
    //         "endTime": "2022-02-15T00:00:00.000Z"
    //     }]
    //     },
    //     {
    //         day: "Thursday", ranges: [{
    //         "startTime": "2022-02-15T00:00:00.000Z",
    //         "endTime": "2022-02-15T00:00:00.000Z"
    //     }]
    //     },{
    //         day: "Friday", ranges: [{
    //         "startTime": "2022-02-15T00:00:00.000Z",
    //         "endTime": "2022-02-15T00:00:00.000Z"
    //     }]
    //     },{
    //         day: "Saturday", ranges: [{
    //         "startTime": "2022-02-15T00:00:00.000Z",
    //         "endTime": "2022-02-15T00:00:00.000Z"
    //     }]
    //     },
    //     {
    //         day: "Sunday", ranges: [{
    //         "startTime": "",
    //         "endTime": ""
    //     }
    // ]
    //     }
    // ]

    const [slots, setSlots] = useState<Slots[]>(rangeOfWeek)

    const [options, setOptions] = useState<Option[]>([]);
    const [selected, setSelected] = useState<number | undefined>();
    const [isFetch, setIsFetch] = useState<boolean>(false)

    /** Begin Time Increments For Select */
    const increment = 30;
    /**
     * Creates an array of times on a 15 minute interval from
     * 00:00:00 (Start of day) to
     * 23:45:00 (End of day with enough time for 15 min booking)
     */
    const TIMES = (() => {
        const end = dayjs().endOf("day");
        let t: Dayjs = dayjs().startOf("day");

        const times: Dayjs[] = [];
        while (t.isBefore(end)) {
            times.push(t);
            t = t.add(increment, "minutes");
        }
        return times;
    })();

    const mentorId = "620f48b4c5cbb1d42668775b"
    useEffect(() => {
        const fetchAvailability = async () => {
            const url = `http://localhost:5000/${mentorId}/availability`
            const res = await fetch(url)
            const data = await res.json()
            const arr = [...data.ranges]
            setSlots(arr)
            setIsFetch(true)
        }
        fetchAvailability()
    }, [])
    const handleSelected = (value: number | undefined) => {
        setSelected(value);
    };
    const getOption = (time: ConfigType) => ({
        value: dayjs(time).toDate().valueOf(),
        label: dayjs(time).format("HH:mm"),
        // .toLocaleTimeString(i18n.language, { minute: "numeric", hour: "numeric" }),
    });
    const timeOptions = useCallback(
        (offsetOrLimitorSelected: { offset?: number; limit?: number; selected?: number } = {}) => {
            const { limit, offset, selected } = offsetOrLimitorSelected;
            return TIMES.filter(
                (time) =>
                    (!limit || time.isBefore(limit)) &&
                    (!offset || time.isAfter(offset)) &&
                    (!selected || time.isAfter(selected))
            ).map((t) => {

                return getOption(t)
            });
        },
        []
    );

    const handleAdd = (indexSlot: number): void => {
        const defaultDay = dayjs.utc(0).format()
        slots[indexSlot].ranges.push({ startTime: defaultDay, endTime: defaultDay })
        setSlots([...slots])
    }

    const handleDelete = (indexSlot: number, indexRange: number): void => {
        if (slots[indexSlot].ranges.length > 1) {
            slots[indexSlot].ranges.splice(indexRange, 1)
        } else {
            slots[indexSlot].ranges.splice(indexRange, 1)
            slots[indexSlot].ranges.push({ startTime: defaultDay, endTime: defaultDay })
        }
        setSlots([...slots])
    }
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const updateAvailability = async () => {
            const url = `http://localhost:5000/users/${mentorId}/availability`
            const res = await fetch(url, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    availability: slots
                })
            })
            const data = await res.json()

        }
        updateAvailability()
    }


    
    return (
        <div className="grid grid-cols-3 gap-2 m-auto">
            <h1 >Availability</h1>
            <form className="col-span-3 space-y-2 lg:col-span-2" onSubmit={handleSubmit}>
                <div className="px-4 py-5 bg-white border border-gray-200 divide-y rounded-sm sm:p-6">
                    <h3>Change the start and end times of your day</h3>
                    <fieldset className="divide-y divide-gray-200">
                        {
                            slots.map((slot, indexSlot) => {
                                return (
                                    <fieldset key={indexSlot} className="flex min-h-[86px] justify-between space-y-2 py-5 sm:flex-row sm:space-y-0">
                                        <div className="w-1/3">
                                            <label className="flex items-center space-x-2 rtl:space-x-reverse">
                                                <input type="checkbox" className="inline-block border-gray-300 rounded-sm text-neutral-900 focus:ring-neutral-500" />
                                                <span className="inline-block text-sm capitalize">{slot.day}</span>
                                            </label>
                                        </div>
                                        <div className="flex-grow " >
                                            {slot.ranges.map((range, indexRange, arrRange) => {
                                                 return (<div className="flex justify-between mb-1" key={indexRange}>
                                                    <div className="flex items-center space-x-2 rtl:space-x-reverse">

                                                        <Select
                                                            className="w-[6rem]"
                                                            options={options}
                                                            onFocus={() => setOptions(timeOptions())}
                                                            value={dayjs(range.startTime).diff(dayjs(0)) ? getOption(dayjs(range.startTime)) : null}
                                                            onChange={(option) => {
                                                                slot.ranges[indexRange].startTime = dayjs(option?.value).format()
                                                                setSlots([...slots])
                                                            }}
                                                        />
                                                        <span>-</span>

                                                        <Select
                                                            className="w-[6rem]"
                                                            options={options}
                                                            onFocus={() => setOptions(timeOptions())}
                                                            value={dayjs(range.endTime).diff(dayjs(0)) ? getOption(dayjs(range.endTime)) : null}
                                                            onChange={(option) => {
                                                                slot.ranges[indexRange].endTime = dayjs(option?.value).format()
                                                                setSlots([...slots])
                                                            }}
                                                        />
                                                    </div>
                                                    <Button
                                                        color="minimal"
                                                        type="button"
                                                        size="icon"
                                                        StartIcon={TrashIcon}
                                                        className="self-center p-2 ml-2"
                                                        onClick={() => handleDelete(indexSlot, indexRange)}
                                                    ></Button>

                                                </div>
                                            )})}
                                        </div>
                                        <div>
                                            <Button
                                                color="minimal"
                                                size="icon"
                                                StartIcon={PlusIcon}
                                                className="self-center p-2 ml-2"
                                                type="button"
                                                onClick={() => handleAdd(indexSlot)}
                                            ></Button>
                                        </div>
                                        <div>

                                        </div>
                                    </fieldset>)
                            })
                        }
                    </fieldset>

                </div>
                <div className="text-right">
                    <button type="submit" className="relative inline-flex items-center px-3 py-2 text-sm font-medium border border-transparent rounded-sm dark:text-brandcontrast text-brandcontrast bg-brand dark:bg-brand hover:bg-opacity-90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-900">
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AvailabilityPage