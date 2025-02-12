import { z } from "zod"


export const userSchema = z.object({
    username: z.string({
        required_error: "Please provide a valid username"
    }).trim()
        .min(3, "Minimum 3 letter required!")
        .max(10, "Maximum 10 letter allowed"),
    password: z.string({
        required_error: "Please provide a valid password"
    })
        .trim()
        .min(6, "Password must be at least 6 characters long")
        .max(15, "Password must not exceed 20 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(/[!@#$%&*]/, "Password must contain at least one special character (!@#$%&*)")
})