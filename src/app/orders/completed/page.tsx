"use client";
import Order from "@/components/order";
import { IOrder } from "@/models/order.model";
import getAllOrders from "@/utils/api/get-all-orders";
import clsx from "clsx";
import { useEffect, useState } from "react";

const Page = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const orders = await getAllOrders("completed");
      setOrders(orders);
      setFilteredOrders(orders);
    };

    fetchData();
  }, [isLoading]);

  return (
    <>
      <div className="mb-4">
        <div>Завершені: {filteredOrders.length}шт</div>
      </div>
      {filteredOrders.map((order) => (
        <div
          key={order._id}
          className={clsx(
            "line my-4 rounded-sm bg-gray-800 p-4",
            order.status === "completed" && "line-through",
          )}
        >
          <Order
            order={order}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
      ))}
    </>
  );
};

export default Page;
