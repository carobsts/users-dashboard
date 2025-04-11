import {
  QueryClient,
  QueryFunctionContext,
  useQuery,
} from "@tanstack/react-query";

import { AxiosError } from "axios";

import { httpClient } from "@/helpers/httpClient";

import { USER_QUERY_KEY_PREFIX } from "./constants";
import { UserSchema } from "@/types/user";

export const generateUsersQueryKey = () =>
  [USER_QUERY_KEY_PREFIX, "usersList"] as const;

type UsersQueryKey = ReturnType<typeof generateUsersQueryKey>;

const fetchUsers = async ({
  queryKey: [, ,],
}: QueryFunctionContext<UsersQueryKey>): Promise<UserSchema[]> => {
  const { data } = await httpClient().get<UserSchema[]>("/users");
  return data;
};

export const useUsers = () =>
  useQuery<UserSchema[], AxiosError, UserSchema[], UsersQueryKey>({
    queryKey: generateUsersQueryKey(),
    queryFn: fetchUsers,
  });

useUsers.fetchQuery = (queryClient: QueryClient) =>
  queryClient.fetchQuery<UserSchema[], AxiosError, UserSchema[], UsersQueryKey>(
    {
      queryKey: generateUsersQueryKey(),
      queryFn: fetchUsers,
    }
  );

useUsers.prefetchQuery = (queryClient: QueryClient) =>
  queryClient.prefetchQuery<
    UserSchema[],
    AxiosError,
    UserSchema[],
    UsersQueryKey
  >({
    queryKey: generateUsersQueryKey(),
    queryFn: fetchUsers,
  });

useUsers.generateKey = generateUsersQueryKey;
