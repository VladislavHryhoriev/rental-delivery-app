"use client";
import Order from "@/components/layout/order";
import Empty from "@/components/shared/empty";
import Loader from "@/components/shared/loader";
import { useOrders } from "@/hooks/useOrders";

const Page = () => {
  const { data: orders, isLoading, isFetching } = useOrders("completed");

  if (isLoading || isFetching) return <Loader />;

  if (!orders || orders.length === 0) {
    return <Empty title="Немає завершених замовлень" />;
  }

  return (
    <>
      <div className="mb-4">Завершені: {orders.length}шт</div>
      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <Order key={order._id} order={order} />
        ))}
      </div>
    </>
  );
};

export default Page;
