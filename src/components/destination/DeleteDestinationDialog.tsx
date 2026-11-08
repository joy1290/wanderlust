"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { toast } from "@/components/ui/toast";

const DeleteDestinationDialog = ({
  id,
  name,
}: {
  id: string;
  name?: string;
}) => {
  const handleDeteleDestination = async () => {
    const token = await getTokenFromClient();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/destination/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      let detail =
        "Something went wrong while deleting the destination. Please try again.";
      try {
        const errorRes = await res.json();
        if (errorRes?.msg || errorRes?.message) detail = errorRes.msg ?? errorRes.message;
      } catch {
        // Server sent a non-JSON error body; keep the default message.
      }
      toast.add({
        title: "Delete failed",
        description: detail,
        type: "error",
      });
      return;
    }

    toast.add({
      title: "Destination deleted",
      description: name
        ? `${name} has been permanently removed.`
        : "The destination has been permanently removed.",
      type: "success",
    });

    redirect("/destinations");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            variant="outline"
            className="border-destructive/30 bg-background text-destructive hover:bg-destructive/5 hover:text-destructive"
          >
            <Trash2 />
            Delete
          </Button>
        }
      >
        Permanently delete destination
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete
            {name ? ` "${name}"` : " this destination"} from our servers,
            along with any associated bookings.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeteleDestination}>
            Yes, delete permanently
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDestinationDialog;
