import React from "react";
import { inter } from "../ui/fonts";

export default function Credits() {
  return (
    <div
      className={`${inter.className} px-[3rem] py-5 bg-gradient-to-r from-gradientStartCredits to-gradientEnd  text-xs text-[#FFF5E0] xl:px-[5rem]`}
    >
      <p>Copyright 2024 Powered By SnapScout. All Rights Served.</p>
      <p>Developed By Gio Gonzales</p>
    </div>
  );
}
