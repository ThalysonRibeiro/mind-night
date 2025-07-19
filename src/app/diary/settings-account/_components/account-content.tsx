"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Loader2, Save, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useFormUpdateUser } from "./use-update-user-form";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { formatPhone } from "@/utils/fomatPhone";
import { Button } from "@/components/ui/button";
import { UpdateUserInput } from "@/lib/validators/schema-user";
import { useUpdateUser } from "../hooks/useUpdateUser";
import toast from 'react-hot-toast';

export function AccountContent() {
  const { data: session, update } = useSession();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useFormUpdateUser();
  const mutation = useUpdateUser();

  useEffect(() => {
    if (session?.user) {
      form.reset({
        name: session.user.name || '',
        phone: session.user.phone || '',
      });
    }
  }, [session?.user, form]);


  const handleSubmit = async (formData: UpdateUserInput) => {

    try {
      // setIsSubmitting(true);
      // mutation.mutate(formData, {
      //   onSettled: () => setIsSubmitting(false),
      //   onSuccess: () => toast.success('Perfil atualizado!'),
      //   onError: (err) => toast.error('Erro: ' + err.message),
      // })
      setIsSubmitting(true);
      await mutation.mutate(formData);
      await update();
      toast.success('Atualizado com sucesso!');
    } catch (err) {
      console.log(err);

      toast.error('Erro ao atualizar');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session?.user) {
    return null;
  }


  return (
    <section>
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><User /> Informações Pessoais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              {session.user.image ? (
                <div className="relative w-40 h-40 rounded-full overflow-hidden">
                  <Image
                    alt={session?.user?.name || "Foto de perfil"}
                    src={session?.user?.image || ""}
                    fill
                    quality={100}
                    priority
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-40 h-40 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
              )}
              <button className="absolute bottom-0 right-3 p-2 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <Camera className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div>
              <p className="text-sm text-gray-500">JPG, PNG ou WEBP. Máximo 2MB.</p>
            </div>
          </div>

          <div>
            <p>Email: <span className="text-gray-400">{session.user.email}</span></p>
          </div>

          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field, fieldState }) => {
                    const inputId = "name-input";
                    const descriptionId = "name-description";
                    const errorId = "name-error";

                    return (
                      <FormItem>
                        <FormLabel htmlFor={inputId}>Nome</FormLabel>
                        <FormControl>
                          <Input
                            id={inputId}
                            placeholder="Digite seu nome"
                            aria-describedby={descriptionId}
                            aria-invalid={fieldState.invalid ? "true" : "false"}
                            aria-errormessage={fieldState.error ? errorId : undefined}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription id={descriptionId}>Atualizar nome</FormDescription>
                        {fieldState.error && (
                          <FormMessage id={errorId}>{fieldState.error.message}</FormMessage>
                        )}
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field, fieldState }) => {
                    const inputId = "phone-input";
                    const descriptionId = "phone-description";
                    const errorId = "phone-error";

                    return (
                      <FormItem>
                        <FormLabel htmlFor={inputId}>Telefone</FormLabel>
                        <FormControl>
                          <Input
                            id={inputId}
                            type="tel"
                            placeholder="Digite seu telefone"
                            aria-describedby={descriptionId}
                            aria-invalid={fieldState.invalid ? "true" : "false"}
                            aria-errormessage={fieldState.error ? errorId : undefined}
                            {...field}
                            onChange={(e) => {
                              const formattedValue = formatPhone(e.target.value);
                              field.onChange(formattedValue);
                            }}
                          />
                        </FormControl>
                        <FormDescription id={descriptionId}>Atualizar telefone</FormDescription>
                        {fieldState.error && (
                          <FormMessage id={errorId}>{fieldState.error.message}</FormMessage>
                        )}
                      </FormItem>
                    );
                  }}
                />
              </div>

              <Button type="submit" disabled={isSubmitting} aria-busy={isSubmitting} className="w-full" size={"lg"}>
                {isSubmitting
                  ? <p className="flex items-center gap-2 font-semibold"><Loader2 className="w-15 h-15 animate-spin" />Salvando...</p>
                  : <p className="flex items-center gap-2 font-semibold"><Save className="w-15 h-15" /> Salvar</p>}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section >
  )
}