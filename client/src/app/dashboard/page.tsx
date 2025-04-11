import type { Metadata } from "next";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { useUsers, useUserTypes } from "@/hooks/user";
import { useStatics } from "@/hooks/static";

import { DashboardView } from "./_components";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Invera - Dashboard",
    description: "This is the dashboard page",
  };
}

const DashboardPage = async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    useUsers.prefetchQuery(queryClient),
    useStatics.prefetchQuery(queryClient),
    useUserTypes.prefetchQuery(queryClient),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardView />
    </HydrationBoundary>
  );
};

export default DashboardPage;
