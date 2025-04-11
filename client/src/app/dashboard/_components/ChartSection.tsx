"use client";

import { formatNumberShort } from "@/helpers/formatNumberShort";

import { useUserTypes } from "@/hooks/user";

import { Card } from "@/components/ui/card";

import { DonutChart, Legends } from "./chart";

export const ChartSection = () => {
  const { data: userTypes, isLoading } = useUserTypes();

  if (!userTypes) {
    return null;
  }

  if (isLoading) {
    <div>Loading...</div>;
  }

  const { distribution, totalUsers } = userTypes;

  return (
    <Card className="p-8">
      <h2 className="text-lg font-semibold text-text-secondary">Estadistics</h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-full items-center">
          <DonutChart
            distribution={distribution}
            title={`${formatNumberShort(totalUsers)}\nusers`}
          />
        </div>
        <div className="w-full">
          <Legends distribution={distribution} />
        </div>
      </div>
    </Card>
  );
};
