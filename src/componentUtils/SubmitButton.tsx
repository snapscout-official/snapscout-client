"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormStatus } from "react-dom";
export default function SubmitButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="bg-slate-950 hover:bg-slate-900 text-white rounded-lg py-3 px-5"
      disabled={pending}
    >
      {pending ? (
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        children
      )}
    </Button>
  );
}
