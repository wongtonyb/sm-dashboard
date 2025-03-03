// import { auth } from '@clerk/nextjs/server'

// const { userId, sessionClaims } = await auth()
// // await console.log(sessionClaims)

// export const role = (sessionClaims?.metadata as { role?: string })?.role
// export const currentUserId = userId

import { auth } from '@clerk/nextjs/server';

let role: string | undefined;
let currentUserId: string | undefined;

const initializeAuth = async () => {
  const { userId, sessionClaims } = await auth();
  role = (sessionClaims?.metadata as { role?: string })?.role;
  currentUserId = userId ?? undefined;
};

initializeAuth();

export { role, currentUserId };