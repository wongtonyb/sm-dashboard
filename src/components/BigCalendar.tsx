'use client'

import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar'
import moment from 'moment'
import { calendarEvents } from '@/lib/data'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useState } from 'react'

const localizer = momentLocalizer(moment)

const BigCalendar = () => {
   //this is the state that stores current view of the calendar
   //syntax: const [state, setState] = useState<Type>(initialState);
   const [view, setView] = useState<View>(Views.WORK_WEEK)

   //this is the function/handler updates the state to change the view of the calendar
   //syntax: const handleOnChangeView = (parameter: Type) => { setState(parameter) };
   const handleOnChangeView = (selectedView: View) => {
      setView(selectedView)
   }

   return (
      <Calendar
         localizer={localizer}
         events={calendarEvents}
         startAccessor="start"
         endAccessor="end"
         views={['work_week', 'day']}
         view={view}
         style={{ height: '98%' }}
         onView={handleOnChangeView}
         min={new Date(2025, 1, 0, 8, 0, 0)}
         max={new Date(2026, 1, 0, 17, 0, 0)}
      />
   )
}

export default BigCalendar
