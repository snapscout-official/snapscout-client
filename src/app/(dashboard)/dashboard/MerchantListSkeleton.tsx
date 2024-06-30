import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
export default function MerchantListSkeleton() {
  return (
  <div className="grid gap-4 grid-cols-2 mt-4">
      <Skeleton className="h-[100px] bg-gray-500 rounded-[.5rem]" />
      <Skeleton className="h-[100px] bg-gray-500 rounded-[.5rem]" />
      <Skeleton className="h-[100px] bg-gray-500 rounded-[.5rem]" />
      <Skeleton className="h-[100px] bg-gray-500 rounded-[.5rem]" />
    </div>
  );
}
