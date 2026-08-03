import { z } from "zod";

export const createPropertySchema = z.object({
    title: z
        .string()
        .trim()
        .min(5, "Title must be at least 5 characters.")
        .max(100, "Title cannot exceed 100 characters."),

    description: z
        .string()
        .trim()
        .min(20, "Description must be at least 20 characters.")
        .max(1000, "Description cannot exceed 1000 characters."),

    monthlyRent: z
        .coerce
        .number()
        .positive("Monthly rent must be greater than 0."),

    division: z
        .string()
        .min(1, "Please select a division."),

    district: z
        .string()
        .min(1, "Please enter a district."),

    address: z
        .string()
        .trim()
        .min(5, "Address is required."),

    categoryId: z
        .string()
        .min(1, "Please select a category."),

    status: z.enum(["AVAILABLE", "RENTED", "INACTIVE"]),

    image: z
        .string()
        .url("Please enter a valid image URL.")
        .optional()
        .or(z.literal("")),

    floor: z
        .coerce
        .number()
        .int("Floor must be an integer.")
        .min(1, "Floor must be at least 1."),

    availableFrom: z
        .string()
        .min(1, "Please select an available date."),
});


