import { prisma } from '@/lib/prisma'
import Image from 'next/image'

const UserCard = async ({
   type,
}: {
   type: 'admin' | 'teacher' | 'student' | 'parent'
}) => {
   const modelMap: Record<typeof type, any> = {
      admin: prisma.admin,
      teacher: prisma.teacher,
      student: prisma.student,
      parent: prisma.parent,
   }
   //Record creates an object(key, value)
   //aka,
   /*
      modelMap = {
         {admin : prisma.admin},
         {teacher : prisma.teacher},
         ...
      }
   */

   const data = await modelMap[type].count()

   return (
      <div className="rounded-2xl odd:bg-smPurple even:bg-smYellow p-4 flex-1 mid-w[130px]">
         <div className="flex justify-between items-center">
            <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
               2024/25
            </span>
            <Image src="/more.png" width={20} height={20} alt="more" />
         </div>
         <h1 className="text-2xl font-semibold my-4">{data}</h1>
         <h2 className="capitalize text-sm font-medium text-gray-500">
            {type}
         </h2>
      </div>
   )
}

export default UserCard
