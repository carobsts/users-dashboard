import {
  QueryClient,
  QueryFunctionContext,
  useQuery,
} from "@tanstack/react-query";

import { AxiosError } from "axios";

import { httpClient } from "@/helpers/httpClient";

import { UserTypeResponse } from "@/types/user";

import { USER_TYPE_QUERY_KEY_PREFIX } from "./constants";

export const generateUserTypesQueryKey = () =>
  [USER_TYPE_QUERY_KEY_PREFIX, "userTypesList"] as const;

type UserTypesQueryKey = ReturnType<typeof generateUserTypesQueryKey>;

const fetchUserTypes = async ({
  queryKey: [, ,],
}: QueryFunctionContext<UserTypesQueryKey>): Promise<UserTypeResponse> => {
  const { data } = await httpClient().get<UserTypeResponse>("/userTypes");
  return data;
};

export const useUserTypes = () =>
  useQuery<UserTypeResponse, AxiosError, UserTypeResponse, UserTypesQueryKey>({
    queryKey: generateUserTypesQueryKey(),
    queryFn: fetchUserTypes,
  });

useUserTypes.fetchQuery = (queryClient: QueryClient) =>
  queryClient.fetchQuery<
    UserTypeResponse,
    AxiosError,
    UserTypeResponse,
    UserTypesQueryKey
  >({
    queryKey: generateUserTypesQueryKey(),
    queryFn: fetchUserTypes,
  });

useUserTypes.prefetchQuery = (queryClient: QueryClient) =>
  queryClient.prefetchQuery<
    UserTypeResponse,
    AxiosError,
    UserTypeResponse,
    UserTypesQueryKey
  >({
    queryKey: generateUserTypesQueryKey(),
    queryFn: fetchUserTypes,
  });

useUserTypes.generateKey = generateUserTypesQueryKey;
