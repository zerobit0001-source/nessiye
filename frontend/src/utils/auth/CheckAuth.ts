"use server"
import { useAppSelector } from "@/lib/redux/hooks"
import { cookies } from "next/headers";
import { redirect } from "next/navigation"


// export const CheckAuthClient = () => {
//     "use client";

//     const isAuthenticated = useAppSelector((s) => s.userInfo.isAuthenticated)

//     if (!isAuthenticated) {
//         redirect("/auth?mode=signin")
//     }

//     return null
// }

export const CheckAuthServer = async () => {
    const cookieStore = await cookies()

    const Token = cookieStore.get("access")
 
    if (!Token) {
        redirect("auth?mode=signin")
    }

    return null

}

export const SignoutAuth = async () => {
    const cookieStore = await cookies()

    cookieStore.delete("access")
 
    redirect('/auth?mode=signin')
}