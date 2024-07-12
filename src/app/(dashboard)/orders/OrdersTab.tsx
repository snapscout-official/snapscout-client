"use client";
import { Tab, Tabs } from "@nextui-org/tabs";
import React from "react";
import AllTab from "./AllTab";

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
      component: <AllTab />,
    },
    {
      label: "IN TRANSIT",
      id: "in-transit",
      component: <AllTab />,
    },
    {
      label: "COMPLETED",
      id: "completed",
      component: <AllTab />,
    },
    {
      label: "CANCELLED",
      id: "cancelled",
      component: <AllTab />,
    },
    {
      label: "RETURN/REFUND",
      id: "return-refund",
      component: <AllTab />,
    },
  ];
  return (
    <Tabs
      aria-label="category"
      variant="underlined"
      color="success"
      fullWidth
      items={tab_items}
    >
      {(item) => (
        <Tab key={item.id} aria-label="Tabs" title={item.label}>
          {item.component}
        </Tab>
      )}
    </Tabs>
  );
}
