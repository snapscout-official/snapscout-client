import React from "react";

type ContainerProps = {
    children: React.ReactNode;
};

export default function DashboardContainer({ children }: ContainerProps) {
    return (
        <div className="h-screen mx-[20px] w-auto py-4 xl:mx-[150px] lg:pt-[7rem] ">
            {children}
        </div>
    );
}
