import { getServerSession } from "next-auth/next"

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions)
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();
    // console.log("::::::::::::", session)

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      }
    });

    if (!currentUser) {
      return null;
    }
    return currentUser;

    // return {
    //   ...currentUser,
    //   createdAt: currentUser.createdAt.toISOString(),
    //   updatedAt: currentUser.updatedAt.toISOString(),
    //   emailVerified: 
    //     currentUser.emailVerified?.toISOString() || null,
    // };
  } catch (error: any) {
    // since this is not an api call we simply return the null 
    // cz we connected directly with server mongodb directly through server component
    return null;
  }
  
}