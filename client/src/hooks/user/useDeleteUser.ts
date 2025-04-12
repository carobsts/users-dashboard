import { useMutation, useQueryClient } from "@tanstack/react-query";

import { httpClient } from "@/helpers/httpClient";

import { UserSchema } from "@/types/user";

import { useUsers } from "./useUsers";

const deleteUser = async (userId?: number) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const { data } = await httpClient().delete<UserSchema>(`/users/${userId}`);

  return data;
};

export const useDeleteUser = (userId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteUser(userId),
    onSuccess: () => {
      const usersQueryKey = useUsers.generateKey();

      queryClient.setQueryData<UserSchema[]>(usersQueryKey, (oldData) =>
        !oldData ? oldData : oldData.filter((user) => user.id !== userId)
      );
    },
  });
};
