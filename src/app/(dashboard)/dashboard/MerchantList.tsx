import React from "react";
import MerchantCard from "./MerchantCard";
import MerchantCardDialog from "./MerchantCardDialog";
export default async function MerchantList() {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  return (
    <div className="grid gap-3 gap-y-5 mt-4 max-h-full md:grid-cols-2 ">
      <MerchantCardDialog />
      <MerchantCardDialog />
      <MerchantCardDialog />
      <MerchantCardDialog />
    </div>
  );
}
