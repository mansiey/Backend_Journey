import { title } from 'node:process';
import { z } from 'zod';

export const todoValidationSchema = z.object({
    id: z.string().describe("Id of the To-do"),
    title: z.string().describe("Title of the To-do"),
    description: z.string().optional().describe("Description for the To-do"),
    isCompleted: z.boolean().default(false).describe("If the To-do item is done or not")
})


// export interface ITodo {
//     id: string,
//     title: string,
//     description?: string,
//     isCompleted: boolean
// }
//doing this fails the DRY pricnciple, and we would have to manage each property in both

// instead we can do this => creates todo type on their own and keeps

export type Todo = z.infer<typeof todoValidationSchema>;