import { z } from "zod";

export const html5EmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().regex(html5EmailRegex, { message: "E-mail inválido" }).optional(),
  phone: z.string().optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;