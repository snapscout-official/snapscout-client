import React from "react";
import Image from "next/image";
import MyImage from "@/public-assets/gio.jpg";
import { inter } from "@/app/ui/fonts";
type CardProps = {
  merchantName: string;
  image: string;
  contactNumber: string;
};
export default function MerchantCard({
  merchantName,
  image,
  contactNumber,
}: CardProps) {
  return (
    <div
      className={`${inter.className} grid grid-cols-4 bg-white shadow-md rounded-[.5rem] gap-8 py-4 px-8`}
    >
      <div className="grid items-center col-span-1 mt-4 ">
        <Image
          src={MyImage}
          alt="merchant-profile"
          className="-mt-4 rounded-full aspect-square object-cover"
          width={80}
          height={80}
        />
      </div>
      <div className="flex flex-col col-span-3 text-left">
        <p className="text-slate-900 text-xs font-semibold  w-full 2xl:text-md">
          {merchantName}
        </p>
        <p className="text-slate-900 text-xs">Merchant Type here</p>
        <p className="text-slate-900 font-light text-xs 2xl:text-md">
          Contact Number: {contactNumber}
        </p>
        <p className="text-slate-900 text-xs font-light 2xl:text-md">
          Location Here
        </p>
      </div>
    </div>
  );
}
