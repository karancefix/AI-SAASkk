import * as z from "zod"

export const formSchema = z.object({
    prompt: z.string().min(1, { message: "Image prompt is required to start the conversation." })
})