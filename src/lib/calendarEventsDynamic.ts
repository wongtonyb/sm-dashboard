const today = new Date()
const formattedDate = today.toISOString().split('T')[0]
const [year, month, date] = formattedDate.split('-')

export const calendarEventsDynamic = [
   {
      title: 'Math',
      allDay: false,
      start: new Date(Number(year), Number(month) - 1, Number(date), 8, 0),
      end: new Date(Number(year), Number(month) - 1, Number(date), 8, 45),
   },
   {
      title: 'English',
      allDay: false,
      start: new Date(Number(year), Number(month) - 1, Number(date), 9, 0),
      end: new Date(Number(year), Number(month) - 1, Number(date), 9, 45),
   },
   {
      title: 'Biology',
      allDay: false,
      start: new Date(Number(year), Number(month) - 1, Number(date), 10, 0),
      end: new Date(Number(year), Number(month) - 1, Number(date), 10, 45),
   },
   {
      title: 'Physics',
      allDay: false,
      start: new Date(Number(year), Number(month) - 1, Number(date), 11, 0),
      end: new Date(Number(year), Number(month) - 1, Number(date), 11, 45),
   },
   {
      title: 'Chemistry',
      allDay: false,
      start: new Date(Number(year), Number(month) - 1, Number(date), 13, 0),
      end: new Date(Number(year), Number(month) - 1, Number(date), 13, 45),
   },
   {
      title: 'History',
      allDay: false,
      start: new Date(Number(year), Number(month) - 1, Number(date), 14, 0),
      end: new Date(Number(year), Number(month) - 1, Number(date), 14, 45),
   },

   {
      title: 'English',
      allDay: false,
      start: new Date(Number(year), Number(month) - 1, Number(date) + 1, 9, 0),
      end: new Date(Number(year), Number(month) - 1, Number(date) + 1, 9, 45),
   },
   {
      title: 'Biology',
      allDay: false,
      start: new Date(Number(year), Number(month) - 1, Number(date) + 1, 10, 0),
      end: new Date(Number(year), Number(month) - 1, Number(date) + 1, 10, 45),
   },
   {
      title: 'Physics',
      allDay: false,
      start: new Date(Number(year), Number(month) - 1, Number(date) + 1, 11, 0),
      end: new Date(Number(year), Number(month) - 1, Number(date) + 1, 11, 45),
   },
   {
      title: 'History',
      allDay: false,
      start: new Date(Number(year), Number(month) - 1, Number(date) + 1, 14, 0),
      end: new Date(Number(year), Number(month) - 1, Number(date) + 1, 14, 45),
   },

   {
      title: 'Math',
      allDay: false,
      start: new Date(Number(year), Number(month) - 1, Number(date) + 2, 8, 0),
      end: new Date(Number(year), Number(month) - 1, Number(date) + 2, 8, 45),
   },
   {
      title: 'Biology',
      allDay: false,
      start: new Date(Number(year), Number(month) - 1, Number(date) + 2, 10, 0),
      end: new Date(Number(year), Number(month) - 1, Number(date) + 2, 10, 45),
   },

   {
      title: 'Chemistry',
      allDay: false,
      start: new Date(Number(year), Number(month) - 1, Number(date) + 2, 13, 0),
      end: new Date(Number(year), Number(month) - 1, Number(date) + 2, 13, 45),
   },
   {
      title: 'History',
      allDay: false,
      start: new Date(Number(year), Number(month) - 1, Number(date) + 2, 14, 0),
      end: new Date(Number(year), Number(month) - 1, Number(date) + 1, 14, 45),
   },

   {
      title: 'English',
      allDay: false,
      start: new Date(Number(year), Number(month) - 1, Number(date) + 3, 9, 0),
      end: new Date(Number(year), Number(month) - 1, Number(date) + 3, 9, 45),
   },
   {
      title: 'Biology',
      allDay: false,
      start: new Date(Number(year), Number(month) - 1, Number(date) + 3, 10, 0),
      end: new Date(Number(year), Number(month) - 1, Number(date) + 3, 10, 45),
   },
   {
      title: 'Physics',
      allDay: false,
      start: new Date(Number(year), Number(month) - 1, Number(date) + 3, 11, 0),
      end: new Date(Number(year), Number(month) - 1, Number(date) + 3, 11, 45),
   },
   {
      title: 'History',
      allDay: false,
      start: new Date(Number(year), Number(month) - 1, Number(date) + 3, 14, 0),
      end: new Date(Number(year), Number(month) - 1, Number(date) + 3, 14, 45),
   },

   {
      title: 'Math',
      allDay: false,
      start: new Date(Number(year), Number(month) - 1, Number(date) + 4, 8, 0),
      end: new Date(Number(year), Number(month) - 1, Number(date) + 4, 8, 45),
   },
   {
      title: 'English',
      allDay: false,
      start: new Date(Number(year), Number(month) - 1, Number(date) + 4, 9, 0),
      end: new Date(Number(year), Number(month) - 1, Number(date) + 4, 9, 45),
   },

   {
      title: 'Physics',
      allDay: false,
      start: new Date(Number(year), Number(month) - 1, Number(date) + 4, 11, 0),
      end: new Date(Number(year), Number(month) - 1, Number(date) + 4, 11, 45),
   },
   {
      title: 'Chemistry',
      allDay: false,
      start: new Date(Number(year), Number(month) - 1, Number(date) + 4, 13, 0),
      end: new Date(Number(year), Number(month) - 1, Number(date) + 4, 13, 45),
   },
   {
      title: 'History',
      allDay: false,
      start: new Date(Number(year), Number(month) - 1, Number(date) + 4, 14, 0),
      end: new Date(Number(year), Number(month) - 1, Number(date) + 4, 14, 45),
   },
]
