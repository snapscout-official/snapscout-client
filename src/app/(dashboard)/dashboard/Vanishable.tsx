"use client";
import React, { useState } from "react";
import Menu from "@/public-assets/menu.svg";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import SideBarContent from "./SideBarContent";
export default function Vanishable() {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  return (
    <div className="block px-[20px] py-8 shadow-md lg:hidden">
      <Button
        className="shadow-none"
        onClick={() => {
          setShowSidebar(true);
        }}
      >
        <Image src={Menu} alt="menu-icon" />
      </Button>
      {showSidebar ? <SideBarContent setShowSidebar={setShowSidebar} /> : null}
    </div>
  );
}
