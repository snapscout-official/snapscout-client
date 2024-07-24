"use client";

import { inter } from "@/app/ui/fonts";
import DashboardContainer from "@/componentUtils/DashboardContainer";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <DashboardContainer>
      <div className="min-h-[500px] flex flex-col justify-center ">
        <h2
          className={`${inter.className} font-bold text-red-500 text-center text-3xl`}
        >
          Opps... Something went wrong!
        </h2>
        <div className="flex justify-center mt-[3rem]">
          <Button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
            className="bg-[#16EF86] w-[10%] p-3 rounded-[.5rem] hover:bg-[#16EF86]"
          >
            Try again
          </Button>
        </div>
      </div>
    </DashboardContainer>
  );
}
