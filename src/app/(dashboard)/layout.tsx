import React, { useState } from "react";
import DashboardNav from "@/componentUtils/DashboardNav";
import Vanishable from "./dashboard/Vanishable";
import { auth } from "@/auth";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  // console.log(session);
  return (
    <div className="min-h-screen overflow-auto max-h-full bg-[#F1F5F9]">
      <Vanishable />
      <div className="hidden py-8 fixed w-full z-50 shadow-md bg-[#F1F5F9] lg:block">
        <DashboardNav />
      </div>
      {children}
    </div>
  );
}
