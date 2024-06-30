import React from "react";
import Cancel from "@/public-assets/x.svg";
import SnapscoutSmall from "@/public-assets/snapscout-small.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
type SidebarProps = {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function SideBarContent({ setShowSidebar }: SidebarProps) {
  return (
    <div className="top-0 left-0 fixed mx-[20] py-8 px-4 w-[250px] min-h-screen bg-[#F8FAFC] duration-300">
      <div className="flex justify-between">
        <Image
          src={SnapscoutSmall}
          alt="snapscout-icon"
          className="rounded-lg"
        />
        <Button
          className="shadow-none"
          size="icon"
          onClick={() => {
            setShowSidebar(false);
          }}
        >
          <Image src={Cancel} alt="cancel-icon" />
        </Button>
      </div>
    </div>
  );
}
