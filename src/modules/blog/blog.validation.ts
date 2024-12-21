import { z } from "zod";

export const blogValidationSchema = z.object({
    title: z.string({ required_error: "Title is required." }),
    content: z.string({ required_error: "Content is required." }),
    author: z
        .string({ required_error: "Author ID is required." }),
    isPublished: z.boolean()
});




export const blogUpdateValidationSchema = z.object({
    title: z.string({ required_error: "Title is required." }).optional(),
    content: z.string({ required_error: "Content is required." }).optional(),
    author: z
        .string({ required_error: "Author ID is required." })
        .optional(),
    isPublished: z.boolean().optional(),
});

