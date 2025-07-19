import { z } from "zod";

export const html5EmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

export const updateUserSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;