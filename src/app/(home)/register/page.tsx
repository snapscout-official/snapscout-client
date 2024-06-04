import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { inter } from "@/app/ui/fonts";
import AgencyTab from "./AgencyTab";
import CenterContainer from "@/componentUtils/CenterContainer";
import Link from "next/link";
import MerchantTab from "./MerchantTab";
function Register() {
  return (
    <CenterContainer>
      <Tabs
        defaultValue="agency"
        className={`${inter.className} w-[500px] items-center `}
      >
        <TabsList className="grid w-full grid-cols-2 bg-[#F1F5F9] rounded-[.3rem]">
          <TabsTrigger value="agency">Agency</TabsTrigger>
          <TabsTrigger value="merchant">Merchant</TabsTrigger>
        </TabsList>
        <TabsContent value="agency">
          <AgencyTab />
        </TabsContent>
        <TabsContent value="merchant">
          <MerchantTab />
        </TabsContent>
        <Link
          href="/login"
          className={`${inter.className} underline text-[#F1F5F9] text-sm `}
        >
          Log in Instead
        </Link>
      </Tabs>
    </CenterContainer>
  );
}

export default Register;
