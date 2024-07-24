import React, { Suspense } from "react";
import Image from "next/image";
import MyImage from "@/public-assets/gio.jpg";
import EditProfileForm from "./EditProfileForm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MerchantList from "./MerchantList";
import { auth } from "@/auth";
import MerchantListSkeleton from "./MerchantListSkeleton";

export default async function MainContent() {
  const session = await auth();
  const user = session?.user;
  return (
    <div className="col-span-12 flex overflow-auto flex-col space-y-2 min-h-full max-h-full xl:col-span-9">
      <div className="grid grid-cols-12 px-3 gap-x-4 py-3 min-h-[300px] bg-white shadow-md rounded-[.5rem] md:px-7">
        <div className="flex col-span-4 items-center lg:col-span-3 2xl:col-span-3 ">
          <Image
            src={MyImage}
            alt="profile"
            className="rounded-full aspect-square object-cover lg:h-auto w-full"
            placeholder="blur"
          />
        </div>
        <div className=" flex py-6 col-span-8 md:pr-7 2xl:col-span-9 md:ml-3 ">
          <EditProfileForm
            firstName={user?.first_name}
            lastName={user?.last_name}
            email={user?.email}
          />
        </div>
      </div>
      <div className="flex flex-col justify-center min-h-[400px] w-auto bg-[#F8FAFC] shadow-md rounded-[.5rem] p-4 px-7">
        <div className="flex justify-between">
          <Input
            className="w-[40%] rounded-[.5rem] text-slate-400 border-lightBorder"
            placeholder="Search Merchant"
          />
          <Button variant="link" className="text-[#64748B]">
            View all
          </Button>
        </div>
        <Suspense fallback={<MerchantListSkeleton />}>
          <MerchantList />
        </Suspense>
      </div>
    </div>
  );
}
