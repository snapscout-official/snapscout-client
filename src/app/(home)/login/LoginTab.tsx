import React from "react";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import AgencyTab from "./AgencyTab";
export const LoginTab = () => {
  return (
    <div className="w-[80%] mx-auto order-last md:order-first lg:order-first">
      <Tabs defaultValue="agency" className="w-full ">
        <TabsList className="w-full grid grid-cols-2 bg-[#F1F5F9] rounded-[.3rem]">
          <TabsTrigger value="agency">Agency</TabsTrigger>
          <TabsTrigger value="merchant"> Merchant</TabsTrigger>
        </TabsList>
        <TabsContent value="agency">
          <AgencyTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};
