"use client";

import { UserSchema } from "@/types/user";

import { useDeleteUser } from "@/hooks/user";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface DeleteUserDialogProps {
  user?: UserSchema | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DeleteUserDialog = ({ user, ...props }: DeleteUserDialogProps) => {
  const deleteUserMutation = useDeleteUser(user?.id);

  const onDeleteUser = async () => {
    if (user) {
      await deleteUserMutation.mutateAsync(undefined, {
        onSettled: () => {
          props.onOpenChange(false);
        },
      });
    }
  };

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete the user?
        </DialogDescription>
        <Button onClick={onDeleteUser}>Delete User</Button>
      </DialogContent>
    </Dialog>
  );
};
