'use client'

import Image from 'next/image'
import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

type ValuePiece = Date | null

type Value = ValuePiece | [ValuePiece, ValuePiece]

// TEMPORARY
const events = [
   {
      id: 1,
      title: 'Lorem ipsum dolor',
      time: '12:00 PM - 2:00 PM',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
   },
   {
      id: 2,
      title: 'Lorem ipsum dolor',
      time: '12:00 PM - 2:00 PM',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
   },
   {
      id: 3,
      title: 'Lorem ipsum dolor',
      time: '12:00 PM - 2:00 PM',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
   },
]

const EventCalendar = () => {
   const [value, onChange] = useState<Value>(new Date())

   return (
      <div className="bg-white p-4 rounded-md">
         <Calendar onChange={onChange} value={value} />
         <div className="flex items-center justify-between ">
            <h1 className="text-xl font-semibold my-4">Events</h1>
            <Image src="/moreDark.png" width={20} height={20} alt="Add Event" />
         </div>
         <div className="flex flex-col gap-4">
            {events.map((event) => (
               <div
                  key={event.id}
                  className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-smSky even:border-t-smPurple"
               >
                  <div className="flex items-center justify-between">
                     <h1 className="font-semibold text-gray-600">
                        {event.title}
                     </h1>
                     <span className="text-gray-300 text-xs">{event.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                     {event.description}
                  </p>
               </div>
            ))}
         </div>
      </div>
   )
}

export default EventCalendar
