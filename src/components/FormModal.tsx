//Directs what form to render based on the type of form (create, update, delete) as well as the table (subject, class, teacher, student, exam)
//Child to list/{table}/page.tsx
//Parent to components/forms/{Table}Forms.tsx

'use client'

import { deleteClass, deleteSubject, deleteTeacher } from '@/lib/actions'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'react-toastify'
import { FormContainerProps } from './FormContainer'

const deleteActionMap = {
   subject: deleteSubject,
   class: deleteClass,
   teacher: deleteTeacher
}

// This would load the form upon initial loading of the page
// import TeacherForm from "./forms/TeacherForm";
// import StudentForm from "./forms/StudentForm";

// USE LAZY LOADING - this will load the form only when the button is clicked
const TeacherForm = dynamic(() => import('./forms/TeacherForm'), {
   loading: () => <h1>Loading...</h1>,
})
const StudentForm = dynamic(() => import('./forms/StudentForm'), {
   loading: () => <h1>Loading...</h1>,
})
const SubjectForm = dynamic(() => import('./forms/SubjectForm'), {
   loading: () => <h1>Loading...</h1>,
})
const ClassForm = dynamic(() => import('./forms/ClassForm'), {
   loading: () => <h1>Loading...</h1>,
})

const forms: {
   [key: string]: (
      setOpen: Dispatch<SetStateAction<boolean>>,
      type: 'create' | 'update',
      data?: any,
      relatedData?: any
   ) => JSX.Element
} = {
   teacher: (setOpen, type, data, relatedData) => (
      <TeacherForm
         type={type}
         data={data}
         setOpen={setOpen}
         relatedData={relatedData}
      />
   ),
   // student: (setOpen, type, data, relatedData) => (
   //    <StudentForm type={type} data={data} setOpen={setOpen} relatedData ={relatedData} />
   // ),
   subject: (setOpen, type, data, relatedData) => (
      <SubjectForm
         type={type}
         data={data}
         setOpen={setOpen}
         relatedData={relatedData}
      />
   ),
   class: (setOpen, type, data, relatedData) => (
      <ClassForm
         type={type}
         data={data}
         setOpen={setOpen}
         relatedData={relatedData}
      />
   ),
}

//creating a generic component for buttons dependent on
//table (section: teacher, student, etc)
//type (request type: create, update, delete)
//data (data to be updated with, aka POST request body)
//id (id of the data to be deleted)
const FormModal = ({
   table,
   type,
   data,
   id,
   relatedData,
}: FormContainerProps & { relatedData?: any }) => {
   // console.log(relatedData, 'relatedData from FormModal')
   //size and color dependent on type of button
   const size = type === 'create' ? 'w-8 h-8' : 'w-7 h-7'
   const bgColor =
      type === 'create'
         ? 'bg-smYellow'
         : type === 'update'
           ? 'bg-smSky'
           : 'bg-smPurple'

   //React Hook: useState
   //open: boolean to determine if modal is open
   //setOpen: function to set open to true or false
   //by default, modal is closed (determined by useState(false), aka, open = false)
   const [open, setOpen] = useState(false)

   //decide what type of form to populate (delete, create, update)
   const Form = () => {
      const [state, formAction] = useFormState(
         deleteActionMap[table as keyof typeof deleteActionMap],
         {
            success: false,
            error: false,
         }
      )

      const router = useRouter()

      useEffect(() => {
         if (state.success) {
            toast(`${table} has been deleted!`)
            setOpen(false)
            router.refresh()
         }
      }, [state, router])

      // use this form for delete
      return type === 'delete' && id ? (
         <form action={formAction} className="p-4 flex flex-col gap-4">
            <input type="text | number" name="id" value={id} hidden />
            <span className="text-center font-medium">
               All data will be lost. Are you sure you want to delete this{' '}
               {table}?
            </span>
            <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
               Delete
            </button>
         </form>
      ) : type === 'create' || type === 'update' ? (
         forms[table](setOpen, type, data, relatedData) // use this form for create/update (contains input fields)
      ) : (
         'Form not found!'
      )
   }

   return (
      <>
         <button
            className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
            //onClick: set 'open' to true, which will open the modal
            onClick={() => setOpen(true)}
         >
            <Image src={`/${type}.png`} alt="" width={16} height={16} />
         </button>
         {/* when 'open' is true, render the Form modal */}
         {open && (
            <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
               <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
                  <Form />
                  <div
                     className="absolute top-4 right-4 cursor-pointer"
                     //onClick: set 'open' to false, which will close the modal
                     onClick={() => setOpen(false)}
                  >
                     <Image src="/close.png" alt="" width={14} height={14} />
                  </div>
               </div>
            </div>
         )}
      </>
   )
}

export default FormModal
