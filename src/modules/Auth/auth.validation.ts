import { z } from "zod";

const logInValidation = z.object({
    email: z.string({ required_error: "Email is required !!" }).email(),
    password: z.string({ required_error: "Password must be needed !!" })
})


export const authValidation = {
    logInValidation
}