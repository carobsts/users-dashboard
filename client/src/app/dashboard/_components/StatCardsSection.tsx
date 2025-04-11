"use client";

import { ReactNode } from "react";

import {
  Heart,
  User,
  Users,
  DotsThreeCircle,
} from "@phosphor-icons/react";

import { StaticSchema } from "@/types/statics";

import { useStatics } from "@/hooks/static";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  statIcon: ReactNode;
  label: string;
  value: number;
}

const StatCard = ({ statIcon, label, value }: StatCardProps) => {
  return (
    <Card className="p-4">
      <div className="flex items-center flex-start gap-4">
        <div>
          <div className="p-3 bg-primary/30 rounded-full text-primary">
            {statIcon}
          </div>
        </div>
        <div>
          <CardTitle className="mb-1">{label}</CardTitle>
          <CardDescription>{value}</CardDescription>
        </div>
      </div>
    </Card>
  );
};

const labelMap: Partial<Record<keyof StaticSchema, string>> = {
  totalUsers: "Total Users",
  newUsers: "New Users",
  topUsers: "Top Users",
  otherUsers: "Other Users",
};

const iconMap: Partial<Record<keyof StaticSchema, React.ReactNode>> = {
  totalUsers: <Users size={23} weight="fill" />,
  newUsers: <User size={23} weight="fill" />,
  topUsers: <Heart size={23} weight="fill" />,
  otherUsers: <DotsThreeCircle size={23} weight="fill" />,
};

export const StatCardsSection = () => {
  const { data: statics, isLoading } = useStatics();

  if (!statics) {
    return null;
  }

  const formattedData = Object.entries(statics).map(([key, value]) => {
    const typedKey = key as keyof StaticSchema;
    return {
      label: labelMap[typedKey] ?? key,
      value: Number(value),
      statIcon: iconMap[typedKey],
    };
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
      {formattedData.map((item) => (
        <StatCard key={item.label} {...item} />
      ))}
    </div>
  );
};
