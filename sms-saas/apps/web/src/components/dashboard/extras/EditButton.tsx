import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const EditButton = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button size={"sm"} variant={"outline"}>
            Edit User
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="mb-4 text-pink-500">Are you absolutely sure Edit User?</SheetTitle>
            <SheetDescription className="text-pink-500">
              This action cannot be undone. This will permanently delete your
              information and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditButton;
