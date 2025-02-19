'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import InputField from '../InputField'
import { subjectSchema, SubjectSchema } from '@/lib/formValidationSchemas'
import { createSubject, updateSubject } from '@/lib/actions'
import { useFormState } from 'react-dom'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
// import {useFormState} from 'react'

const SubjectForm = ({
   type,
   data,
   setOpen,
   relatedData,
}: {
   type: 'create' | 'update'
   data?: any
   setOpen: Dispatch<SetStateAction<boolean>> // passed in from FormModal(parent) to close the modal
   relatedData?: any
}) => {
   //properties part of useForm hook (from react-hook-form)
   // console.log('data: ', data)
   console.log('type: ', type)
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<SubjectSchema>({
      resolver: zodResolver(subjectSchema),
   })

   
   // React 19 useActionState
   // handles error and success states
   const [state, formAction] = useFormState(
      type === 'create' ? createSubject : updateSubject,
      {
         success: false,
         error: false,
      }
   )
   // initializes state
   // initializes formAction function
   // ie. formAction = createSubject({success: false, error: false}, data)
   
   // handles form submission in one function
   const onSubmit = handleSubmit((data) => {
      console.log('data on submit', data)
      formAction(data)
   })
   // the data is the form data in react-hook-form via register
   /*
      {
         name: string
         id?: string
         teachers: string[]
      }
   */
   
   const router = useRouter()
   
   useEffect(() => {
      if (state.success) {
         toast(`Subject has been ${type === 'create' ? 'created' : 'updated'}!`)
         setOpen(false)
         router.refresh()
      }
   }, [state, router, type, setOpen])
   //dependency array specifies the variables that the effect depends on
   //the effect will run whenever any of these variables changes
   

   //teacher data fetched from FormContainer
   const { teachers } = relatedData;
   // if undefined make sure its passed down through FormContainer
   // console.log('relatedData:', relatedData)

   return (
      <form className="flex flex-col gap-8" onSubmit={onSubmit}>
         {/* <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}> */}
         <h1 className="text-xl font-semibold">
            {type === 'create' ? 'Create a new subject' : 'Update the subject'}
         </h1>

         <div className="flex justify-between flex-wrap gap-4">
            <InputField
               label="Subject name"
               name="name"
               defaultValue={data?.name}
               register={register}
               error={errors?.name}
            />
            {data && (
               <InputField
                  label="Id"
                  name="id"
                  defaultValue={data?.id}
                  register={register}
                  error={errors?.id}
                  hidden
               />
            )}
            <div className="flex flex-col gap-2 w-full md:w-1/4">
               <label className="text-xs text-gray-500">Teachers</label>
               <select
                  multiple
                  className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                  {...register('teachers')}
                  defaultValue={data?.teachers}
               >
                  {teachers.map(
                     (teacher: {
                        id: string
                        name: string
                        surname: string
                     }) => (
                        <option value={teacher.id} key={teacher.id}>
                           {teacher.name + ' ' + teacher.surname}
                        </option>
                     )
                  )}
               </select>
               {errors.teachers?.message && (
                  <p className="text-xs text-red-400">
                     {errors.teachers.message.toString()}
                  </p>
               )}
            </div>
         </div>
         {state.error && (
            <span className="text-red-500">Something went wrong!</span>
         )}
         <button className="bg-blue-400 text-white p-2 rounded-md">
            {type === 'create' ? 'Create' : 'Update'}
         </button>
      </form>
   )
}

export default SubjectForm
