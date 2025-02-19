'use server'

import { revalidatePath } from 'next/cache'
import { ClassSchema, SubjectSchema } from './formValidationSchemas'
import { prisma } from './prisma'

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
               connect: data.teachers.map((teacherId) => ({id: teacherId}))
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
            id:data.id
         },
         data: {
            name: data.name,
            teachers: {
               set: data.teachers.map((teacherId) => ({id: teacherId}))
               //set updates the relationship between the subject and the teachers
            }
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
            id: parseInt(id)
         }
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
     });
 
     return { success: true, error: false };
   } catch (err) {
     console.log(err);
     return { success: false, error: true };
   }
 };
 
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
     });
 
     return { success: true, error: false };
   } catch (err) {
     console.log(err);
     return { success: false, error: true };
   }
 };
 
 export const deleteClass = async (
   currentState: CurrentState,
   data: FormData
 ) => {
   const id = data.get("id") as string;
   try {
     await prisma.class.delete({
       where: {
         id: parseInt(id),
       },
     });
 
     return { success: true, error: false };
   } catch (err) {
     console.log(err);
     return { success: false, error: true };
   }
 };