import React from "react";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import AgencyTab from "./AgencyTab";
import { inter } from "@/app/ui/fonts";
import Link from "next/link";
import MerchantTab from "./MerchantTab";
export const LoginTab = () => {
  return (
    <div className="w-[80%] mx-auto order-last md:order-first lg:order-first">
      <Tabs defaultValue="agency" className="w-full p-4">
        <TabsList className="w-full grid grid-cols-2 bg-white rounded-[.3rem] ">
          <TabsTrigger value="agency" className="bg-[#F1F5F9] rounded-[.5rem] ">
            Agency
          </TabsTrigger>
          <TabsTrigger
            value="merchant"
            className="bg-[#F1F5F9] rounded-[.5rem] "
          >
            Merchant
          </TabsTrigger>
        </TabsList>
        <TabsContent value="agency">
          <AgencyTab />
        </TabsContent>
        <TabsContent value="merchant">
          <MerchantTab />
        </TabsContent>
        <div className="mt-2">
          <Link
            href="/register"
            className={`${inter.className} underline text-[#F1F5F9] text-sm  `}
          >
            Sign Up Instead
          </Link>
        </div>
      </Tabs>
    </div>
  );
};
