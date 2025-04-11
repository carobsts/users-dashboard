import { ReactNode } from "react";

import { CaretUp, CaretDown } from "@phosphor-icons/react";

import { Column } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

interface SortableHeaderProps<TData> {
  column: Column<TData, unknown>;
  label: string;
  icon?: ReactNode;
}

export function SortableHeader<TData>({ column, label, icon }: SortableHeaderProps<TData>) {
  const isSorted = column.getIsSorted();

  return (
    <div className="flex items-center text-sm font-medium text-text-primary">
      <div className="flex items-center gap-2">
        {icon}
        <span className="bold">{label}</span>
      </div>
      <Button
        variant="link"
        onClick={() => column.toggleSorting(isSorted === "asc")}
        className="flex items-center"
      >
        <span className="flex flex-col justify-center text-muted-foreground">
          {isSorted === "asc" ? (
            <CaretUp size={12} weight="fill" />
          ) : (
            <CaretDown size={12} weight="fill" />
          )}
        </span>
      </Button>
    </div>
  );
}
