'use server'

import { revalidatePath } from 'next/cache'
import {
   ClassSchema,
   SubjectSchema,
   TeacherSchema,
} from './formValidationSchemas'
import { prisma } from './prisma'
import { clerkClient } from '@clerk/nextjs/server'

//data mutations

//Request State
type CurrentState = { success: boolean; error: boolean }

// --- Subject ---
// aka POST request to create a new subject
export const createSubject = async (
   currentState: CurrentState,
   data: SubjectSchema
) => {
   // await console.log('currentState', currentState)
   // await console.log('data', data)
   try {
      await prisma.subject.create({
         data: {
            name: data.name,
            teachers: {
               connect: data.teachers.map((teacherId) => ({ id: teacherId })),
               //connect creates a relationship between the subject and the teachers
               /*
               data.teachers that is passed in is an array of teacer objects (id, name, surname)
               mapping to only contain the ids, and attaching that to the teachers field of the subject
               */
            },
         },
      })

      // revalidatePath('/list/subjects')
      return { success: true, error: false }
   } catch (err) {
      console.log(err)
      return { success: false, error: true }
   }
}

// aka PATCH request to update an existing subject
export const updateSubject = async (
   currentState: CurrentState,
   data: SubjectSchema
) => {
   console.log(data + 'in server action')
   try {
      await prisma.subject.update({
         where: {
            id: data.id,
         },
         data: {
            name: data.name,
            teachers: {
               set: data.teachers.map((teacherId) => ({ id: teacherId })),
               //set updates the relationship between the subject and the teachers
            },
         },
      })

      // revalidatePath('/list/subjects')
      return { success: true, error: false }
   } catch (err) {
      console.log(err)
      return { success: false, error: true }
   }
}

// aka DELETE request to delete an existing subject
export const deleteSubject = async (
   currentState: CurrentState,
   data: FormData
) => {
   console.log(data + 'in server action')

   const id = data.get('id') as string
   try {
      await prisma.subject.delete({
         where: {
            id: parseInt(id),
         },
      })

      // revalidatePath('/list/subjects')
      return { success: true, error: false }
   } catch (err) {
      console.log(err)
      return { success: false, error: true }
   }
}

// --- Class ---
export const createClass = async (
   currentState: CurrentState,
   data: ClassSchema
) => {
   try {
      await prisma.class.create({
         data,
      })

      return { success: true, error: false }
   } catch (err) {
      console.log(err)
      return { success: false, error: true }
   }
}

export const updateClass = async (
   currentState: CurrentState,
   data: ClassSchema
) => {
   try {
      await prisma.class.update({
         where: {
            id: data.id,
         },
         data,
      })

      return { success: true, error: false }
   } catch (err) {
      console.log(err)
      return { success: false, error: true }
   }
}

export const deleteClass = async (
   currentState: CurrentState,
   data: FormData
) => {
   const id = data.get('id') as string
   try {
      await prisma.class.delete({
         where: {
            id: parseInt(id),
         },
      })

      return { success: true, error: false }
   } catch (err) {
      console.log(err)
      return { success: false, error: true }
   }
}

// --- Teacher ---
export const createTeacher = async (
   currentState: CurrentState,
   data: TeacherSchema
) => {
   try {
      const client = await clerkClient()
      const user = await client.users.createUser({
         username: data.username,
         password: data.password,
         firstName: data.name,
         lastName: data.surname,
         publicMetadata: { role: 'teacher' },
      })

      await prisma.teacher.create({
         data: {
            id: user.id, // user.id is the id of the user created in Clerk
            username: data.username,
            email: data.email || null,
            name: data.name,
            surname: data.surname,
            phone: data.phone || null,
            address: data.address,
            birthday: data.birthday,
            img: data.img || null,
            sex: data.sex,
            subjects: {
               connect: data.subjects?.map((subjectId: string) => ({
                  id: parseInt(subjectId),
               })),
            },
         },
      })

      return { success: true, error: false }
   } catch (err) {
      console.log(err)
      return { success: false, error: true }
   }
}

export const updateTeacher = async (
   currentState: CurrentState,
   data: TeacherSchema
) => {
   if (!data.id) {
      return { success: false, error: true }
   }
   try {
      const client = await clerkClient()
      const user = await client.users.updateUser(data.id, {
         username: data.username,
         ...(data.password !== '' && { password: data.password }),
         firstName: data.name,
         lastName: data.surname,
      })

      await prisma.teacher.update({
         where: {
            id: data.id,
         },
         data: {
            ...(data.password !== '' && { password: data.password }),
            username: data.username,
            name: data.name,
            surname: data.surname,
            email: data.email || null,
            phone: data.phone || null,
            address: data.address,
            img: data.img || null,
            sex: data.sex,
            birthday: data.birthday,
            subjects: {
               set: data.subjects?.map((subjectId: string) => ({
                  id: parseInt(subjectId),
               })),
            },
         },
      })

      return { success: true, error: false }
   } catch (err) {
      console.log(err)
      return { success: false, error: true }
   }
}

export const deleteTeacher = async (
   currentState: CurrentState,
   data: FormData
) => {
   const id = data.get('id') as string
   try {
      const client = await clerkClient()
      await client.users.deleteUser(id);  

      await prisma.teacher.delete({
         where: {
            id: id,
         },
      })

      return { success: true, error: false }
   } catch (err) {
      console.log(err)
      return { success: false, error: true }
   }
}
