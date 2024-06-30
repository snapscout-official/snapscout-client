import React from "react";

type ContainerProps = {
  children: React.ReactNode;
};

export default function DashboardContainer({ children }: ContainerProps) {
  return (
    <div className="mx-[20px] pt-7 max-h-full xl:mx-[150px] lg:pt-[8rem] xl:min-h-full xl:max-h-[700px]">
      {children}
    </div>
  );
}
