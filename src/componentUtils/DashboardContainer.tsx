import React from "react";

type ContainerProps = {
  children: React.ReactNode;
};

export default function DashboardContainer({ children }: ContainerProps) {
  return (
    <div className="mx-[20px] w-auto py-4 mt-7 xl:mx-[150px] lg:mt-[7rem] ">
      {children}
    </div>
  );
}
