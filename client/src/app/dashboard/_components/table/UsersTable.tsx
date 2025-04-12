"use client";

import { useState } from "react";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  BagSimple,
  MagnifyingGlass,
  MapPin,
  Phone,
  User,
  CheckSquare,
  Pencil,
  Trash,
  ArrowLeft,
  ArrowRight,
} from "@phosphor-icons/react/";

import { UserSchema } from "@/types/user";

import { useUsers } from "@/hooks/user";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SortableHeader } from "./SortableHeader";
import { ConfigUserDialog, DeleteUserDialog } from "../dialog";

const PAGE_SIZE_OPTIONS = [5, 10, 25, 50, 100];

export const getUserColumns = (
  handleUserActions: (action: "edit" | "delete", user: UserSchema) => void
): ColumnDef<UserSchema>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <div className="px-6">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="px-6">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <SortableHeader
          column={column}
          label="Name"
          icon={<User size={16} weight="fill" />}
        />
      );
    },
    cell: ({ row }) => (
      <div className="text-text-primary">{row.getValue("name")}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <SortableHeader
          column={column}
          label="Phone"
          icon={<Phone size={16} weight="fill" />}
        />
      );
    },
    cell: ({ row }) => (
      <div className="text-text-primary">{row.getValue("phone")}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "location",
    header: ({ column }) => {
      return (
        <SortableHeader
          column={column}
          label="Location"
          icon={<MapPin size={16} weight="fill" />}
        />
      );
    },
    cell: ({ row }) => (
      <div className="text-text-primary">{row.getValue("location")}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "company",
    header: ({ column }) => {
      return (
        <SortableHeader
          column={column}
          label="Company"
          icon={<BagSimple size={16} weight="fill" />}
        />
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <div className="text-text-primary">{row.getValue("company")}</div>
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <SortableHeader
          column={column}
          label="Status"
          icon={<CheckSquare size={16} weight="fill" />}
        />
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        {row.getValue("status") === "Online" ? (
          <Badge
            className="bg-[#063207] color-[#C3F5CD] border border-[#C3F5CD]"
            variant="outline"
          >
            {row.getValue("status")}
          </Badge>
        ) : (
          <Badge className="bg-muted" variant="outline">
            {row.getValue("status")}
          </Badge>
        )}
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="link"
                type="button"
                onClick={() => handleUserActions("edit", row.original)}
              >
                <div className="text-text-primary">
                  <Pencil size={16} weight="fill" />
                </div>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="link"
                type="button"
                onClick={() => handleUserActions("delete", row.original)}
              >
                <div className="text-text-primary">
                  <Trash size={16} weight="fill" />
                </div>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
];

export const UsersTable = () => {
  const { data: users, isLoading } = useUsers();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const [selectedUser, setSelectedUser] = useState<UserSchema | null>(null);

  const [isOpenUpdateUserDialog, setIsOpenUpdateUserDialog] = useState(false);
  const [isOpenDeleteUserDialog, setIsOpenDeleteUserDialog] = useState(false);

  const handleUserActions = (action: "edit" | "delete", user: UserSchema) => {
    setSelectedUser(user);

    if (action === "delete") {
      setIsOpenDeleteUserDialog(true);
    }

    if (action === "edit") {
      setIsOpenUpdateUserDialog(true);
    }
  };

  const columns = getUserColumns(handleUserActions);

  const table = useReactTable({
    data: users || [],
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="w-full">
        <Card className="pt-6">
          <div className="flex items-center py-2 gap-6 px-10">
            <h2 className="text-foreground text-lg font-semibold">All Users</h2>
            <Input
              icon={<MagnifyingGlass />}
              placeholder="Search for..."
              value={table.getState().globalFilter ?? ""}
              onChange={(event) => table.setGlobalFilter(event.target.value)}
              className="w-[20rem] sm:w-full"
            />
          </div>
          <div className="rounded-md border min-h-[600px]">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center text-text-secondary"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>

        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-text-secondary">
            {`${table.getFilteredSelectedRowModel().rows.length} of ${
              table.getFilteredRowModel().rows.length
            } row(s) selected.`}
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="text-sm">Rows per page:</span>
              <Select
                value={String(table.getState().pagination.pageSize)}
                onValueChange={(value) => table.setPageSize(Number(value))}
              >
                <SelectTrigger className="w-[80px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PAGE_SIZE_OPTIONS.map((option) => (
                    <SelectItem key={option} value={String(option)}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button
                className="text-primary font-bold"
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ArrowLeft size={20} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ConfigUserDialog
        open={isOpenUpdateUserDialog}
        user={selectedUser}
        onOpenChange={() => setIsOpenUpdateUserDialog(false)}
      />

      <DeleteUserDialog
        open={isOpenDeleteUserDialog}
        user={selectedUser}
        onOpenChange={() => setIsOpenDeleteUserDialog(false)}
      />
    </>
  );
};
