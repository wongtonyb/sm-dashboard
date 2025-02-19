import { auth } from '@clerk/nextjs/server'

const { userId, sessionClaims } = await auth()
// await console.log(sessionClaims)

export const role = (sessionClaims?.metadata as { role?: string })?.role
export const currentUserId = userId
