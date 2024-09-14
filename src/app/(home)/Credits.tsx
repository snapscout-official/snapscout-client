import React from "react";
import { inter } from "../ui/fonts";

export default function Credits() {
  return (
    <div
      className={`${inter.className} py-5 bg-gradient-to-r from-gradientStartCredits to-gradientEnd px-[5rem] text-xs text-[#FFF5E0]`}
    >
      <p>Copyright 2024 Powered By SnapScout. All Rights Served.</p>
      <p>Developed By Team SnapScout</p>
    </div>
  );
}
