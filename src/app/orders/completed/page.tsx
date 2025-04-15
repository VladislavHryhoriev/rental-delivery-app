"use client";
import Loader from "@/components/shared/loader";
import Order from "@/components/layout/order";
import Empty from "@/components/shared/empty";
import { useOrders } from "@/hooks/useOrders";
import clsx from "clsx";

const Page = () => {
  const { data: orders, isLoading } = useOrders("completed");

  if (isLoading) return <Loader />;

  if (!orders || orders.length === 0) {
    return <Empty title="Немає завершених замовлень" />;
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
