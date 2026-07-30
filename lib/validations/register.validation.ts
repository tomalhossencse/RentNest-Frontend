import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(1, "Name is required").max(50, "Name must be under 50 characters"),
    email: z.email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["TENANT", "LANDLORD"]),
    profilePhoto: z.url("Please enter a valid photo URL").optional(),
});
