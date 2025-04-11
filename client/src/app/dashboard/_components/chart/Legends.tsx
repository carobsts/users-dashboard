import { UserTypeSchema } from "@/types/user";

import { itemStyleMap } from "./map";

interface LegendsProps {
  distribution: UserTypeSchema[];
}

export const Legends = ({ distribution }: LegendsProps) => {
  const formattedLegends = distribution.map((item) => ({
    label: item.type,
    percentage: item.percentage,
    color: itemStyleMap[item.type],
  }));

  return (
    <div className="flex flex-col gap-6 w-full h-full justify-center">
      {formattedLegends.map((item) => (
        <div
          className="grid grid-cols-2 items-center space-between"
          key={item.label}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <p className="text-text-secondary text-sm">{item.label}</p>
          </div>
          <div className="flex w-full">
            <p className="w-full text-text-secondary text-sm text-right md:text-left">
              {item.percentage} %
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
