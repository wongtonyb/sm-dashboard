'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import InputField from '../InputField'
import Image from 'next/image'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { studentSchema, StudentSchema } from '@/lib/formValidationSchemas'
import { useFormState } from 'react-dom'
import { createStudent, updateStudent } from '@/lib/actions'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const StudentForm = ({
   type,
   data,
   setOpen,
   relatedData,
}: {
   type: 'create' | 'update'
   data?: any
   setOpen: Dispatch<SetStateAction<boolean>>
   relatedData?: any
}) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<StudentSchema>({
      resolver: zodResolver(studentSchema),
   })

   // form submission handler
   const [state, formAction] = useFormState(
      type === 'create' ? createStudent : updateStudent,
      {
         success: false,
         error: false,
      }
   )

   const onSubmit = handleSubmit((data) => {
      console.log(data)
      formAction(data)
   })

   // toast notification
   const router = useRouter()

   useEffect(() => {
      if (state.success) {
         toast(`Subject has been ${type === 'create' ? 'created' : 'updated'}!`)
         setOpen(false)
         router.refresh()
      }
   }, [state, router, type, setOpen])

   // additional data
   const { classes, grades } = relatedData

   return (
      <form className="flex flex-col gap-8" onSubmit={onSubmit}>
         <h1 className="text-xl font-semibold">Create a new student</h1>
         <span className="text-xs text-gray-400 font-medium">
            Authentication Information
         </span>
         <div className="flex justify-between flex-wrap gap-4">
            <InputField
               label="Username"
               name="username"
               defaultValue={data?.username}
               register={register}
               error={errors?.username}
            />
            <InputField
               label="Email"
               name="email"
               defaultValue={data?.email}
               register={register}
               error={errors?.email}
            />
            <InputField
               label="Password"
               name="password"
               type="password"
               defaultValue={data?.password}
               register={register}
               error={errors?.password}
            />
         </div>
         <span className="text-xs text-gray-400 font-medium">
            Personal Information
         </span>
         <div className="flex justify-between flex-wrap gap-4">
            <InputField
               label="First Name"
               name="name"
               defaultValue={data?.name}
               register={register}
               error={errors.name}
            />
            <InputField
               label="Last Name"
               name="surname"
               defaultValue={data?.surname}
               register={register}
               error={errors.surname}
            />
            <InputField
               label="Phone"
               name="phone"
               defaultValue={data?.phone}
               register={register}
               error={errors.phone}
            />
            <InputField
               label="Address"
               name="address"
               defaultValue={data?.address}
               register={register}
               error={errors.address}
            />
            <InputField
               label="Birthday"
               name="birthday"
               defaultValue={data?.birthday.toISOString().split('T')[0]}
               register={register}
               error={errors.birthday}
               type="date"
            />
            <InputField
               label="Parent Id"
               name="parentId"
               defaultValue={data?.parentId}
               register={register}
               error={errors.parentId}
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
               <label className="text-xs text-gray-500">Sex</label>
               <select
                  className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                  {...register('sex')}
                  defaultValue={data?.sex}
               >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
               </select>
               {errors.sex?.message && (
                  <p className="text-xs text-red-400">
                     {errors.sex.message.toString()}
                  </p>
               )}
            </div>
            <div className="flex flex-col gap-2 w-full md:w-1/4">
               <label className="text-xs text-gray-500">Grade</label>
               <select
                  className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                  {...register('gradeId')}
                  defaultValue={data?.gradeId}
               >
                  {grades.map((grade: { id: number; level: number }) => (
                     <option value={grade.id} key={grade.id}>
                        {grade.level}
                     </option>
                  ))}
               </select>
               {errors.gradeId?.message && (
                  <p className="text-xs text-red-400">
                     {errors.gradeId.message.toString()}
                  </p>
               )}
            </div>
            <div className="flex flex-col gap-2 w-full md:w-1/4">
               <label className="text-xs text-gray-500">Class</label>
               <select
                  className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                  {...register('classId')}
                  defaultValue={data?.classId}
               >
                  {classes.map(
                     (classItem: {
                        id: number
                        name: string
                        capacity: number
                        _count: { students: number }
                     }) => (
                        <option value={classItem.id} key={classItem.id}>
                           ({classItem.name} -{' '}
                           {classItem._count.students +
                              '/' +
                              classItem.capacity}{' '}
                           Capacity)
                        </option>
                     )
                  )}
               </select>
               {errors.classId?.message && (
                  <p className="text-xs text-red-400">
                     {errors.classId.message.toString()}
                  </p>
               )}
            </div>
         </div>
         {/* <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
               <label
                  className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
                  htmlFor="img"
               >
                  <Image src="/upload.png" alt="" width={28} height={28} />
                  <span>Upload a photo</span>
               </label>
               <input
                  type="file"
                  id="img"
                  {...register('img')}
                  className="hidden"
               />
               {errors.img?.message && (
                  <p className="text-xs text-red-400">
                     {errors.img.message.toString()}
                  </p>
               )}
            </div>
         </div> */}
         {state.error && (
            <span className="text-red-500">Something went wrong!</span>
         )}
         <button className="bg-blue-400 text-white p-2 rounded-md">
            {type === 'create' ? 'Create' : 'Update'}
         </button>
      </form>
   )
}

export default StudentForm
