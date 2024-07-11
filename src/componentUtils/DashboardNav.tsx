import React from "react";
import SnapscoutSmall from "@/public-assets/snapscout-small.svg";
import Image from "next/image";
import { inter } from "@/app/ui/fonts";
import AccountDropdown from "./AccountDropdown";
import DashboardAvatar from "./DashboardAvatar";
import Link from "next/link";
export default function DashboardNav() {
  return (
    <header
      className={`${inter.className} flex mx-[20px] justify-between text-[#030538] text-xl xl:mx-[150px] `}
    >
      <div className="flex items-center gap-x-[3rem]">
        <div className="flex items-center ">
          <Image src={SnapscoutSmall} alt="snapscoutlogo" />
          <Link href="/"> SnapScout</Link>
        </div>
        <ul className="flex items-center gap-x-5">
          <Link href="/canvass"> Canvass</Link>
          <Link href="/carts"> Carts</Link>
          <Link href="/orders">Orders</Link>
        </ul>
      </div>
      <div className="flex items-center gap-3">
        <DashboardAvatar />
        <AccountDropdown />
      </div>
    </header>
  );
}
