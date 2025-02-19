//REST API method (GET, POST, PUT, DELETE) for subjects
//technicall the get all subjects for admin user
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { role } from '@/lib/util'

//Define Data Type
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

//Define the REST API method
//TODO: figure out how to access api from frontend react component
export async function GET(): Promise<NextResponse<ApiResponse>> {
   try {
      const userRole = role

      //technically this is working without the roles part
      //TODO: figure out how to access api in development mode with roles
      if (userRole !== 'admin') {
         return NextResponse.json(
            {
               success: false,
               error: true,
               message: 'Unauthorized access',
            },
            { status: 401 }
         )
      }

      const subjects = await prisma.subject.findMany({
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
         orderBy: {
            name: 'asc', // Optional: sort subjects alphabetically
         },
      })

      return NextResponse.json({
         success: true,
         error: false,
         data: {
            subjects,
         },
      })
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
