"use server"
import { signOut } from "@/auth"

export const logout = async () => {
    //want to do some server stuff
    await signOut()
}