"use client";

import React from "react";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deletePitch } from "@/lib/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

const DeleteBtn = ({ id, authorId }: { id: string; authorId: string }) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const result = await deletePitch({ id, authorId });

      if (result.status == "SUCCESS") {
        toast.success("Success", {
          description: "Your startup pitch has been deleted successfully",
        });

        router.push(`/`);
      }
    } catch (error) {
      toast.error("Error", {
        description: "An unexpected error has occurred",
      });

      console.error(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="size-8 rounded-full">
          <Trash className="text-white size-5" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogPortal>
        <AlertDialogOverlay />

        <AlertDialogContent className="bg-white">
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

          <AlertDialogDescription className="AlertDialogDescription">
            This action cannot be undone. This will permanently delete your
            blog.
          </AlertDialogDescription>

          <div className="flex justify-end gap-6">
            <AlertDialogCancel asChild>
              <Button>Cancel</Button>
            </AlertDialogCancel>

            <AlertDialogAction asChild>
              <Button className="text-white" onClick={handleDelete}>
                Delete
              </Button>
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  );
};

export default DeleteBtn;
