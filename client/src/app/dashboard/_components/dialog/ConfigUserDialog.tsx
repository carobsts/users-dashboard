"use client";

import { useEffect, useRef } from "react";

import { FormProvider, useForm } from "react-hook-form";

import { UserSchema } from "@/types/user";

import { useCreateUser, useUpdateUser } from "@/hooks/user";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type FormValues = {
  name: string;
  phone: string;
  location: string;
  company: string;
};

interface CreateUserDialogProps {
  user?: UserSchema | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ConfigUserDialog = ({ user, ...props }: CreateUserDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const defaultValues: FormValues = {
    name: user?.name || "",
    phone: user?.phone || "",
    location: user?.location || "",
    company: user?.company || "",
  };

  const formData: FormValues = {
    ...defaultValues,
  };

  const formContext = useForm<FormValues>({
    defaultValues: formData,
  });

  const { register, handleSubmit, reset } = formContext;

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        phone: user.phone,
        location: user.location,
        company: user.company,
      });
    }
  }, [user, reset]);

  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();

  // For some reason, the Sonner component isn't working and I haven't
  // had time to investigate why it's not triggering. That's why there's
  // no confirmation toast for success or error actions.

  const onSubmit = handleSubmit(async (values: FormValues) => {
    if (user) {
      await updateUserMutation.mutateAsync(
        {
          userId: user.id,
          payload: {
            ...values,
            status: user.status,
          },
        },
        {
          onSettled: () => {
            formContext.reset();
            props.onOpenChange(false);
          },
        }
      );
      return;
    }
    await createUserMutation.mutateAsync(
      {
        ...values,
      },
      {
        onSettled: () => {
          formContext.reset();
          props.onOpenChange(false);
        },
      }
    );
  });

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{user ? "Edit User" : "Create New User"}</DialogTitle>
          <FormProvider {...formContext}>
            <form ref={formRef} onSubmit={onSubmit}>
              <div className="flex flex-col gap-4 my-4">
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-text-primary">Name</p>
                  <Input {...register("name")} type="text" placeholder="Name" />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-text-primary">Phone</p>
                  <Input
                    {...register("phone")}
                    type="text"
                    placeholder="Phone"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-text-primary">Location</p>
                  <Input
                    {...register("location")}
                    type="text"
                    placeholder="Location"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-text-primary">Company</p>
                  <Input
                    {...register("company")}
                    type="text"
                    placeholder="Company"
                  />
                </div>
                <Button type="submit" className="w-full mt-4">
                  {user ? "Save Changes" : "Create User"}
                </Button>
              </div>
            </form>
          </FormProvider>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
