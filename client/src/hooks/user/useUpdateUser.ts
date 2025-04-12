import { useMutation, useQueryClient } from "@tanstack/react-query";

import { httpClient } from "@/helpers/httpClient";

import { UpdateUserPayload, UserSchema } from "@/types/user";

import { useUsers } from "./useUsers";

const updateUser = async (userId: number, payload: UpdateUserPayload) => {
  const { data } = await httpClient().put<UserSchema>(`/users/${userId}`, {
    ...payload,
  });

  return data;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      payload,
    }: {
      userId: number;
      payload: UpdateUserPayload;
    }) => updateUser(userId, payload),
    onSuccess: (updatedUser) => {
      const usersQueryKey = useUsers.generateKey();

      queryClient.setQueryData<UserSchema[]>(usersQueryKey, (oldData) =>
        !oldData
          ? oldData
          : oldData.map((user) =>
              user.id === updatedUser.id ? updatedUser : user
            )
      );
    },
  });
};
