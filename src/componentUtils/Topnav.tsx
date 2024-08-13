"use client";
import React, { useState } from "react";
import Image from "next/image";
import SnapscoutSmall from "@/public-assets/snapscout-small.svg";
import Menu from "@/public-assets/menu.svg";
import { inter_semilight, roboto } from "@/app/ui/fonts";
import { Button } from "@/components/ui/button";
import Sidebar from "./Sidebar";
import Link from "next/link";
import { useMySession } from "@/app/custom-hooks/sessionContext";
export default function Topnav() {
  const { user } = useMySession();
  const [showSideNav, setShowSideNav] = useState<boolean>(false);
  const navList = [
    {
      name: "About Us",
      href: "#",
    },
    {
      name: "Contact Us",
      href: "#",
    },
    {
      name: "Help",
      href: "#",
    },
  ];
  return (
    <>
      {showSideNav ? (
        <Sidebar
          items={navList}
          navState={{
            showSideNav: showSideNav,
            setShowSideNav: setShowSideNav,
          }}
        />
      ) : null}
      <header
        className={` ${roboto.className} flex items-center justify-between sticky bg-transparent w-full px-5 py-7 shadow-md `}
      >
        <div className="hidden md:flex items-center justify-between w-full">
          <div className="flex items-center w-full">
            <Image src={SnapscoutSmall} alt="Snapscout" />
            <div className="text-white text-2xl">Snapscout</div>
          </div>
          <div className="flex  justify-between w-full text-lg text-white">
            {navList.map((item, index) => (
              <h1 key={index} className={`${inter_semilight.className}`}>
                {item.name}
              </h1>
            ))}
          </div>
          <div className="w-full flex justify-end">
            <Button
              className="text-[#030538] bg-white hover:bg-gray-200 rounded-lg"
              asChild
            >
              <Link href={user ? "/dashboard" : "/login"}>
                {user ? "Dashboard" : "login"}
              </Link>
            </Button>
          </div>
          <div></div>
        </div>
        {showSideNav ? null : (
          <Button
            className="flex visible rounded-lg shadow-none md:hidden "
            onClick={() => setShowSideNav(true)}
          >
            <Image src={Menu} alt="Menu" className="text-white" />
          </Button>
        )}
      </header>
    </>
  );
}
