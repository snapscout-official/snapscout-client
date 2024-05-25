import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { inter } from "@/app/ui/fonts";
import AgencyTab from "./AgencyTab";
import CenterContainer from "@/componentUtils/CenterContainer";
function Register() {
  return (
    <CenterContainer>
      <Tabs
        defaultValue="agency"
        className={`${inter.className} w-[500px] items-center `}
      >
        <TabsList className="grid w-full grid-cols-2 bg-white rounded-[.3rem]">
          <TabsTrigger value="agency">Agency</TabsTrigger>
          <TabsTrigger value="merchant">Merchant</TabsTrigger>
        </TabsList>
        <TabsContent value="agency">
          <AgencyTab />
        </TabsContent>
      </Tabs>
    </CenterContainer>
  );
}

export default Register;
