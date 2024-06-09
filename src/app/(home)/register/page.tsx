import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { inter } from "@/app/ui/fonts";
import AgencyTab from "./AgencyTab";
import CenterContainer from "@/componentUtils/CenterContainer";
import Link from "next/link";
import MerchantTab from "./MerchantTab";
async function Register() {
  return (
    <CenterContainer>
      <Tabs
        defaultValue="agency"
        className={`${inter.className} w-[500px] items-center  p-5 `}
      >
        <TabsList className="grid w-full grid-cols-2 bg-white rounded-[.3rem]">
          <TabsTrigger value="agency" className="bg-[#F1F5F9] rounded-[.2rem]">
            Agency
          </TabsTrigger>
          <TabsTrigger
            value="merchant"
            className="bg-[#F1F5F9] rounded-[.2rem]"
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
