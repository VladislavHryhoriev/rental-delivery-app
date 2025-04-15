"use client";
import Loader from "@/components/loader";
import Order from "@/components/order";
import { useOrders } from "@/hooks/useOrders";
import clsx from "clsx";

const Page = () => {
  const { data: orders, isLoading } = useOrders("completed");

  if (isLoading) return <Loader />;

  if (!orders || orders.length === 0) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-xl text-gray-400">
        Немає завершених замовлень
      </div>
    );
  }

  return (
    <>
      <div className="mb-4">Завершені: {orders.length}шт</div>
      {orders.map((order) => (
        <Order key={order._id} order={order} />
      ))}
    </>
  );
};

export default Page;
