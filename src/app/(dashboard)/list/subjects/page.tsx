//Main list/subjects page

// "use client"

import FormContainer from '@/components/FormContainer'
import FormModal from '@/components/FormModal'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { prisma } from '@/lib/prisma'
import { ITEM_PER_PAGE } from '@/lib/settings'
import { role } from '@/lib/util'
import { Prisma, Subject, Teacher } from '@prisma/client'
import Image from 'next/image'
// import { useEffect } from 'react'

type SubjectList = Subject & { teachers: Teacher[] }

const columns = [
   {
      header: 'Subject Name',
      accessor: 'name',
   },
   {
      header: 'Teachers',
      accessor: 'teachers',
      className: 'hidden md:table-cell',
   },
   {
      header: 'Actions',
      accessor: 'action',
   },
]

// render elements must always return in () not {}
const renderRow = (item: SubjectList) => (
   <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-smPurpleLight"
   >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">
         {item.teachers.map((teacher) => teacher.name).join(', ')}
      </td>
      <td>
         <div className="flex items-center gap-2">
            {role === 'admin' && (
               <>
                  <FormContainer table="subject" type="update" data={item} />
                  <FormContainer table="subject" type="delete" id={item.id} />
               </>
            )}
         </div>
      </td>
   </tr>
)

const SubjectListPage = async ({
   searchParams,
}: {
   searchParams: { [key: string]: string | undefined }
}) => {
   const { page, ...queryParams } = searchParams
   const p = page ? parseInt(page) : 1

   // URL PARAMS CONDITION
   const query: Prisma.SubjectWhereInput = {}

   if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
         if (value !== undefined) {
            switch (key) {
               case 'search':
                  query.name = { contains: value, mode: 'insensitive' }
                  break
               default:
                  break
            }
         }
      }
   }

   // data query (GET)
   const [data, count] = await prisma.$transaction([
      prisma.subject.findMany({
         where: query,
         include: {
            teachers: true,
         },
         take: ITEM_PER_PAGE,
         skip: ITEM_PER_PAGE * (p - 1),
      }),
      prisma.subject.count({ where: query }),
   ])

   // trying to set the data from the API to the state
   // useEffect(() => {
      // const fetchSubjects = async () => {
      //    try {
      //       const response = await fetch('/api/subjects')
      //       const result = await response.json()
      //       if (result.success) {
      //          //   setData(result.data)
      //          console.log(result.data)
      //       }
      //    } catch (error) {
      //       console.error('Error fetching data:', error)
      //    }
      // }
      // fetchSubjects();
   // }, [])

   return (
      <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
         {/* HEADER */}
         <div className="flex items-center justify-between">
            <h1 className="hidden md:block text-lg font-semibold">
               All Subjects
            </h1>
            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
               <TableSearch />
               <div className="flex items-center gap-4 self-end">
                  <button className="w-8 h-8 flex items-center justify-center rounded-full bg-smYellow">
                     <Image src="/filter.png" alt="" width={14} height={14} />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-full bg-smYellow">
                     <Image src="/sort.png" alt="" width={14} height={14} />
                  </button>
                  {role === 'admin' && (
                     // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-smYellow">
                     //   <Image src="/plus.png" alt="" width={14} height={14} />
                     // </button>
                     <FormModal table="subject" type="create" />
                  )}
               </div>
            </div>
         </div>
         {/* LIST */}
         <Table columns={columns} renderRow={renderRow} data={data} />
         {/* PAGINATION */}
         <Pagination page={p} count={count} />
      </div>
   )
}

export default SubjectListPage
