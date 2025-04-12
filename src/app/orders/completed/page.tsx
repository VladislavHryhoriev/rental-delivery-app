"use client";
import Order from "@/components/order";
import { IOrder } from "@/models/order.model";
import getAllOrders from "@/utils/api/get-all-orders";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

const Page = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const orders = await getAllOrders("completed");
      setOrders(orders);
      setFilteredOrders(orders);
      setIsFetching(false);
    };

    fetchData();
  }, [isLoading]);

  if (isFetching) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <BeatLoader color="#4ade80" />
          <span className="text-gray-400">Завантаження...</span>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-xl text-gray-400">
        Немає завершених замовлень
      </div>
    );
  }

  return (
    <>
      <div className="mb-4">
        <div>Завершені: {filteredOrders.length}шт</div>
      </div>
      {filteredOrders.map((order) => (
        <div
          key={order._id}
          className={clsx(
            "line my-4 rounded-sm bg-gray-800/50 p-4",
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
