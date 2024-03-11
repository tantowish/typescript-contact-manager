import { z,ZodType } from "zod";

export class ContactValidation{
    static readonly CREATE: ZodType = z.object({
        firstName: z.string().min(1).max(100),
        lastName: z.string().min(1).max(100).optional(),
        email: z.string().min(1).max(100).optional(),
        phone: z.string().min(1).max(100).optional(),
    })
    static readonly UPDATE: ZodType = z.object({
        id: z.string().uuid(),
        firstName: z.string().min(1).max(100),
        lastName: z.string().min(1).max(100).optional(),
        email: z.string().min(1).max(100).optional(),
        phone: z.string().min(1).max(100).optional(),
    })
}