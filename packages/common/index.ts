
import {z} from "zod"

export const signupSchema = z.object({
    email : z.string().toLowerCase().email(),
    password :z.string().min(8, "Password must be at least 8 characters"),
})

export type SignupInput = z.infer<typeof signupSchema>


export const loginSchema = signupSchema;
export type LoginInput = z.infer<typeof loginSchema>;



export const createRecordingSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  duration: z.number().int().positive(),
  wallpaperId: z.string().min(1).optional(),
});
export type CreateRecordingInput = z.infer<typeof createRecordingSchema>;

