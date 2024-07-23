import { z } from "zod";
const emailSchema = z.string().email()
export const ValidateEmail = (email) => {
    const response = emailSchema.safeParse(email)
    return response.success
}

export const getinitials = (name) => {
    if(!name) return "";
    const words = name.split(" ")
    let initials = words[0][0] + words[1][0];
    return initials.toUpperCase()
}