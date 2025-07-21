"use client";
import api from '@/lib/axios';
import { UpdateUserInput } from '@/lib/validators/schema-user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';


export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { update } = useSession();

  return useMutation({
    mutationFn: async (formData: UpdateUserInput) => {
      const { data } = await api.patch('/api/user/update', formData);
      return data;
    },
    onSuccess(_, variables,) {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      update({
        user: {
          name: variables.name,
          phone: variables.phone,
        },
      });
    },
  })

}