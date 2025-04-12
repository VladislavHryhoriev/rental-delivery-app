/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Order from "@/components/order";
import { IOrder } from "@/models/order.model";
import getAllOrders from "@/utils/api/get-all-orders";
import moment from "moment";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

const Page = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const orders = await getAllOrders("process");
      setOrders(orders);
      setFilteredOrders(orders);
      setIsFetching(false);
    };

    fetchData();
  }, [isLoading]);

  const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    const today = moment().format("YYYY-MM-DD");
    const tomorrow = moment().add(1, "day").format("YYYY-MM-DD");
    const afterTomorrow = moment().add(2, "day").format("YYYY-MM-DD");

    if (target.value === "all") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((order) => {
        const orderDate = moment(order.datetime).format("YYYY-MM-DD");

        if (target.value === "today") return orderDate === today;
        if (target.value === "tomorrow") return orderDate === tomorrow;
        if (target.value === "after-tomorrow")
          return orderDate === afterTomorrow;

        if (target.value === "forward") return order.deliveryType === "forward";
        if (target.value === "back") return order.deliveryType === "back";
      });
      setFilteredOrders(filtered);
    }
  };

  if (isFetching)
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <BeatLoader color="#991b1b" />
      </div>
    );

  if (orders.length === 0) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-xl text-gray-400">
        Немає замовлень в процесі
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between rounded-lg bg-gray-900 p-4 shadow-lg">
        <div className="space-y-1">
          <div className="text-lg font-medium text-gray-200">
            В процесі: {orders.length}шт
          </div>
          <div className="text-sm text-gray-400">
            Відсортовані: {filteredOrders.length}шт
          </div>
        </div>
        <select
          onChange={handleChange}
          className="rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-gray-200 focus:border-red-500 focus:outline-none"
          defaultValue="all"
        >
          <option value="all">Усі</option>
          <optgroup label="По днях:">
            <option value="today">Сьогодні</option>
            <option value="tomorrow">Завтра</option>
            <option value="after-tomorrow">Післязавтра</option>
          </optgroup>
          <optgroup label="По типу:">
            <option value="forward">Привезти</option>
            <option value="back">Забрати</option>
          </optgroup>
        </select>
      </div>

      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order._id}
            className="rounded-lg bg-gray-800/50 p-6 shadow-lg transition-colors hover:bg-gray-900"
          >
            <Order
              order={order}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
