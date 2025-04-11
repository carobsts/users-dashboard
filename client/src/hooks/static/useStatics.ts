import {
  QueryClient,
  QueryFunctionContext,
  useQuery,
} from "@tanstack/react-query";

import { AxiosError } from "axios";

import { httpClient } from "@/helpers/httpClient";

import { StaticSchema } from "@/types/statics";

import { STATIC_QUERY_KEY_PREFIX } from "./constants";

export const generateStaticsQueryKey = () =>
  [STATIC_QUERY_KEY_PREFIX, "staticsList"] as const;

type StaticsQueryKey = ReturnType<typeof generateStaticsQueryKey>;

const fetchStatics = async ({
  queryKey: [, ,],
}: QueryFunctionContext<StaticsQueryKey>): Promise<StaticSchema> => {
  const { data } = await httpClient().get<StaticSchema>("/statics");
  return data;
};

export const useStatics = () =>
  useQuery<StaticSchema, AxiosError, StaticSchema[], StaticsQueryKey>({
    queryKey: generateStaticsQueryKey(),
    queryFn: fetchStatics,
  });

useStatics.fetchQuery = (queryClient: QueryClient) =>
  queryClient.fetchQuery<
    StaticSchema,
    AxiosError,
    StaticSchema,
    StaticsQueryKey
  >({
    queryKey: generateStaticsQueryKey(),
    queryFn: fetchStatics,
  });

useStatics.prefetchQuery = (queryClient: QueryClient) =>
  queryClient.prefetchQuery<
    StaticSchema,
    AxiosError,
    StaticSchema,
    StaticsQueryKey
  >({
    queryKey: generateStaticsQueryKey(),
    queryFn: fetchStatics,
  });

useStatics.generateKey = generateStaticsQueryKey;
