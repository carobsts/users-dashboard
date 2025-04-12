"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { ConfigUserDialog } from "./dialog";

export const HeaderSection = () => {
  const [isOpenCreateUserDialog, setIsOpenCreateUserDialog] = useState(false);
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Users</h1>
        <Button
          className="w-[12rem]"
          onClick={() => setIsOpenCreateUserDialog(true)}
        >
          Add user
        </Button>
      </div>

      <ConfigUserDialog
        open={isOpenCreateUserDialog}
        onOpenChange={() => setIsOpenCreateUserDialog(false)}
      />
    </>
  );
};
