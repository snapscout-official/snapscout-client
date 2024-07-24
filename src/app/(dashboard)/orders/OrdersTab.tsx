import React from "react";
import AllTab from "./AllTab";
import MyTabs from "./MyTabs";

export default function OrdersTab() {
  const tab_items = [
    {
      label: "ALL",
      id: "all",
      component: <AllTab />,
    },
    {
      label: "TO SHIP",
      id: "to-ship",
      component: <AllTab tab="ship" />,
    },
    {
      label: "IN TRANSIT",
      id: "in-transit",
      component: <AllTab tab="transit" />,
    },
    {
      label: "COMPLETED",
      id: "completed",
      component: <AllTab tab="completed" />,
    },
    {
      label: "CANCELLED",
      id: "cancelled",
      component: <AllTab tab="cancelled" />,
    },
    {
      label: "RETURN/REFUND",
      id: "return-refund",
      component: <AllTab tab="return" />,
    },
  ];
  return (
    <MyTabs
      prop={{
        variant: "underlined",
        color: "success",
        fullWidth: true,
        aria_label: "Order Tabs",
      }}
      tab_items={tab_items}
    />
  );
}
