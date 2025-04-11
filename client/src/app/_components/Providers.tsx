"use client";

import { ReactNode, useMemo } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface Props {
  children: ReactNode;
}

export const Providers = ({ children }: Props) => {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            meta: { baseURL: process.env.NEXT_PUBLIC_API_URL },
          },
          mutations: {
            meta: { baseURL: process.env.NEXT_PUBLIC_API_URL },
          },
        },
      }),
    []
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
