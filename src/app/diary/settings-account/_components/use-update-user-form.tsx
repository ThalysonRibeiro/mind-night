import { UpdateUserInput, updateUserSchema } from "@/lib/validators/schema-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export interface UseFormUpdateUserProps {
  initialValues?: Partial<UpdateUserInput>;
}

export function useFormUpdateUser({ initialValues }: UseFormUpdateUserProps = {}) {
  return useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: initialValues?.name ?? '',
      email: initialValues?.email ?? '',
      phone: initialValues?.phone ?? '',
    },
  })
}