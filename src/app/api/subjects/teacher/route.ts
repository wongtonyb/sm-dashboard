//import subject data by logged in teacherId
import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { currentUserId, role } from '@/lib/util'

interface ApiResponse {
   success: boolean
   error: boolean
   data?: {
      subjects?: {
         id: number
         name: string
         teachers: {
            id: string
            name: string
            surname: string
         }[]
      }[]
   }
   message?: string
}

export async function GET(
   request: NextRequest
): Promise<NextResponse<ApiResponse>> {
   try {
      const teacherId = await currentUserId
      const userRole = await role

      if (userRole === 'teacher' && !!teacherId) {
        //finding the teacher by teacherId
        //selecting the subjects of the teacher
         const teacher = await prisma.teacher.findUnique({
            where: {
               id: teacherId,
            },
            select: {
               subjects: {
                  select: {
                     id: true,
                     name: true,
                     teachers: {
                        select: {
                           id: true,
                           name: true,
                           surname: true,
                        },
                     },
                  },
               },
            },
         })

         return NextResponse.json({
            success: true,
            error: false,
            //returning the subjects of the teacher
            data: {
                subjects: teacher?.subjects
            },
         })
      } else {
         return NextResponse.json(
            {
               success: false,
               error: true,
               message: 'Unauthorized access',
            },
            { status: 401 }
         )
      }
   } catch (error) {
      console.error('Error fetching subjects:', error)
      return NextResponse.json(
         {
            success: false,
            error: true,
            message: 'Failed to fetch subjects',
         },
         { status: 500 }
      )
   }
}
