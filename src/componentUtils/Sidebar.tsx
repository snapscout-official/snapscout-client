import React, { Dispatch, SetStateAction } from "react";
import SnapscoutSmall from "@/public-assets/snapscout-small.svg";
import Cancel from "@/public-assets/x.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
type NavItem = {
  name: string;
  href: string;
};
type NavState = {
  setShowSideNav: Dispatch<SetStateAction<boolean>>;
  showSideNav: boolean;
};
function Sidebar({
  items,
  navState,
}: {
  items: NavItem[];
  navState: NavState;
}) {
  return (
    <>
      <div
        className={`top-0 left-0 flex flex-col w-[55vw] z-40 h-full bg-white fixed ease-in-out duration-300 md:hidden ${navState.showSideNav ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4 h-full">
          <div className="flex justify-between items-center">
            <Image src={SnapscoutSmall} alt="Snapscout Logo" />
            <Button>
              <Image
                src={Cancel}
                alt="Cancel Button"
                onClick={() => {
                  navState.setShowSideNav(false);
                }}
              />
            </Button>
          </div>
          <div className="flex flex-col h-full justify-start mt-11 space-y-5">
            {items.map((item, index) => (
              <div key={index}>{item.name}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
