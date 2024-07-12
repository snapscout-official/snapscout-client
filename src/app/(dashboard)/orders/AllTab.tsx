"use client";
import { useEffect, useState } from "react";
import TabItem from "./TabItem";
import { Order } from "@/types/product-types";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function AllTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    async function fetchOrders() {
      const res = await fetch("http://localhost:3000/api/orders", {
        method: "GET",
      });
      if (!res.ok) {
        //how do we handle this kind of error?
        return;
      }
      const ordersData = await res.json();
      setOrders(ordersData.orders.flat());
    }

    fetchOrders();
  }, []);
  return orders.length !== 0 ? (
    <ScrollArea className="h-[750px]">
      <div className="bg-[#F8FAFC] p-5 space-y-4">
        {orders.map((order: Order, idx: number) => (
          <TabItem key={idx} order={order} />
        ))}
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  ) : (
    <div>No current orders </div>
  );
}
