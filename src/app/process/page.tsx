"use client";

import Orders from "@/components/deliveries";
import { IOrder } from "@/models/order.model";
import getAllOrders from "@/utils/api/getAllOrders";
import { useEffect, useState } from "react";

const Page = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const orders = await getAllOrders("process");
      setOrders(orders);
    };
    fetchData();
  }, []);

  const setIsDone = async (id: string) => {};

  return (
    <div>
      <div className="mb-4">
        <div>В процессе: {orders.length}шт</div>
      </div>
      <Orders orders={orders} setIsDone={setIsDone} />
    </div>
  );
};

export default Page;
