import { z } from "zod";

export const rentalRequestSchema = z.object({
    moveInDate: z
        .string("Please provide a valid move-in date."),

    message: z
        .string()
        .trim()
        .min(20, "Message must be at least 20 characters.")
        .max(500, "Message cannot exceed 500 characters."),
});

