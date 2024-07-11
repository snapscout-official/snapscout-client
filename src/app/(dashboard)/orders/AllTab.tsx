"use client";
import { useEffect, useState } from "react";

export default function AllTab() {
  const [orders, setOrders] = useState();
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
      setOrders(ordersData);
    }
    fetchOrders();
  }, []);
  return <div>{orders ? JSON.stringify(orders) : "No orders"} </div>;
}
