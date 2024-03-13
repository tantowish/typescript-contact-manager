import { z, ZodType } from "zod";

export class AddressValidation {
    static readonly CREATE: ZodType = z.object({
        contact_id: z.string().uuid(),
        street: z.string().min(1).max(100).optional(),
        city: z.string().min(1).max(100).optional(),
        province: z.string().min(1).max(100).optional(),
        country: z.string().min(1).max(100),
        postal_code: z.string().min(1).max(100)
    })

    static readonly UPDATE: ZodType = z.object({
        id: z.string().uuid(),
        contact_id: z.string().uuid(),
        street: z.string().min(1).max(100).optional(),
        city: z.string().min(1).max(100).optional(),
        province: z.string().min(1).max(100).optional(),
        country: z.string().min(1).max(100),
        postal_code: z.string().min(1).max(100)
    })
}