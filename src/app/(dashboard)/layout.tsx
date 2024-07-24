import React from "react";
import DashboardNav from "@/componentUtils/DashboardNav";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-svh overflow-auto bg-[#F1F5F9]">
      <div className="hidden py-8 fixed w-full z-50 shadow-md bg-[#F1F5F9] lg:block">
        <DashboardNav />
      </div>
      {children}
    </div>
  );
}
