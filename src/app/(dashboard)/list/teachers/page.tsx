import FormContainer from '@/components/FormContainer'
import FormModal from '@/components/FormModal'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { prisma } from '@/lib/prisma'
import { ITEM_PER_PAGE } from '@/lib/settings'
import { role } from '@/lib/util'
import { Class, Prisma, Subject, Teacher } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

// dummy schema (used for UI development)
// type Teacher = {
//   id: number;
//   teacherId: string;
//   name: string;
//   email?: string;
//   photo: string;
//   phone: string;
//   subjects: string[];
//   classes: string[];
//   address: string;
// };

type TeacherList = Teacher & { subjects: Subject[] } & { classes: Class[] }

//used to render table header
//contains header, accessor(key), className(css className)
const columns = [
   {
      header: 'Info',
      accessor: 'info',
   },
   {
      header: 'Teacher ID',
      accessor: 'teacherId',
      className: 'hidden md:table-cell',
   },
   {
      header: 'Subjects',
      accessor: 'subjects',
      className: 'hidden md:table-cell',
   },
   {
      header: 'Classes',
      accessor: 'classes',
      className: 'hidden md:table-cell',
   },
   {
      header: 'Phone',
      accessor: 'phone',
      className: 'hidden lg:table-cell',
   },
   {
      header: 'Address',
      accessor: 'address',
      className: 'hidden lg:table-cell',
   },
   ...(role === 'admin'
      ? [
           {
              header: 'Actions',
              accessor: 'action',
           },
        ]
      : []),
]

// render elements must always return in () not {}
const renderRow = (item: TeacherList) => (
   <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-smPurpleLight"
   >
      <td className="flex items-center gap-4 p-4">
         <Image
            src={item.img || '/noAvatar.png'}
            alt=""
            width={40}
            height={40}
            className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
         />
         <div className="flex flex-col">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-xs text-gray-500">{item?.email}</p>
         </div>
      </td>
      <td className="hidden md:table-cell">{item.username}</td>
      <td className="hidden md:table-cell">
         {item.subjects.map((subject) => subject.name).join(',')}
      </td>
      <td className="hidden md:table-cell">
         {item.classes.map((classItem) => classItem.name).join(',')}
      </td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
         <div className="flex items-center gap-2">
            <Link href={`/list/teachers/${item.id}`}>
               <button className="w-7 h-7 flex items-center justify-center rounded-full bg-smSky">
                  <Image src="/view.png" alt="" width={16} height={16} />
               </button>
            </Link>
            {role === 'admin' && (
               // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-smPurple">
               //   <Image src="/delete.png" alt="" width={16} height={16} />
               // </button>
               <FormContainer table="teacher" type="delete" id={item.id} />
            )}
         </div>
      </td>
   </tr>
)

const TeacherListPage = async ({
   searchParams, // searchParams is an object containing the query parameters from the URL; provided by Next.js
}: {
   searchParams: { [key: string]: string } | undefined
}) => {
   const { page, ...queryParams } = searchParams //expect a "page" query parameter in the URL amongst other query parameters
   // track the 'page' param, such that when we update the page number from the pagination component,
   // it'll update the data here and re-render the rows for TeacherListPage component
   const p = page ? parseInt(page) : 1

   // URL PARAMS COINDITION
   const query: Prisma.TeacherWhereInput = {}

   // loop through the query parameters and set the query object accordingly
   // this is used to filter the Teacher data entities based on the query parameters
   if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
         if (value !== undefined) {
            switch (key) {
               // for student looking for all teachers that teach their class
               // students have classes, classes are related to lessons, lessons related to teacher
               case 'classId':
                  query.lessons = { some: { classId: parseInt(value) } }
                  break
               // filtering teacher name's that contain the value from search
               case 'search':
                  query.name = { contains: value, mode: 'insensitive' }
                  break
               default:
                  break
            }
         }
      }
   }

   // $transaction is used to run multiple queries in a single transaction
   // array destructing is used to store the results of the queries to multiple variables (data and count)
   // data query
   const [data, count] = await prisma.$transaction([
      prisma.teacher.findMany({
         where: query,
         include: {
            subjects: true,
            classes: true,
         },
         take: ITEM_PER_PAGE,
         skip: ITEM_PER_PAGE * (p - 1),
      }),
      prisma.teacher.count(),
   ])

   return (
      <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
         {/* HEADER */}
         <div className="flex items-center justify-between">
            <h1 className="hidden md:block text-lg font-semibold">
               All Teachers
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
                     <FormContainer table="teacher" type="create" />
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

export default TeacherListPage
