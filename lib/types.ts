import z from "zod";
import { loginSchema } from "./validations/login.validation";
import { registerSchema } from "./validations/register.validation";

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

