import { z } from "zod";

export const schemaImageUpdate = z.object({
  userId: z.string().min(1, { message: "User ID is required" }),
  file: z
    .custom<Blob>((val) => val instanceof Blob, { message: "Arquivo é obrigatório" })
    .refine(
      (file) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type),
      {
        message: "Formato de imagem inválido",
      }
    )
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "A imagem deve ter no máximo 5MB",
    }),
});