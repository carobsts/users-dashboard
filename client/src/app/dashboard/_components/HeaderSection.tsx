import { Button } from "@/components/ui/button";

export const HeaderSection = () => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-foreground">Users</h1>
      <Button className="w-[12rem]">Add user</Button>
    </div>
  );
};
