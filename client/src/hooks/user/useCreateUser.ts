import { useMutation, useQueryClient } from "@tanstack/react-query";

import { httpClient } from "@/helpers/httpClient";

import { CreateUserPayload, UserSchema } from "@/types/user";

import { useUsers } from "./useUsers";

const createUser = async (payload: CreateUserPayload) => {
  const { data } = await httpClient().post<UserSchema>(`/users`, {
    ...payload,
  });

  return data;
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateUserPayload) => createUser(payload),
    onSuccess: (newUser) => {
      const usersQueryKey = useUsers.generateKey();

      queryClient.setQueryData<UserSchema[]>(usersQueryKey, (oldData) =>
        !oldData ? oldData : [...oldData, { ...newUser, status: "Offline" }]
      );
    },
  });
};
