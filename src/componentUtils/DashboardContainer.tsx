import React from "react";

type ContainerProps = {
    children: React.ReactNode;
};

export default function DashboardContainer({ children }: ContainerProps) {
    return (
        <div className="min-h-screen mx-4 w-auto py-4 pt-[5rem] sm:mx-[20px] xl:mx-[150px] lg:pt-[7rem] relative">
            {children}
        </div>
    );
}
