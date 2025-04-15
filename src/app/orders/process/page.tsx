/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Loader from "@/components/shared/loader";
import Order from "@/components/layout/order";
import Empty from "@/components/shared/empty";
import { useOrders } from "@/hooks/useOrders";
import { IOrder } from "@/models/order.model";
import filterOrders from "@/utils/filterOrders";
import { useEffect, useState } from "react";

const Page = () => {
  const { data: orders, isLoading } = useOrders("process");
  const [filteredOrders, setFilteredOrders] = useState<IOrder[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    if (orders) setFilteredOrders(filterOrders(selectedFilter, orders));
  }, [orders, selectedFilter]);

  const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(target.value);
  };

  if (isLoading) return <Loader />;

  if (!orders || orders.length === 0) {
    return <Empty title="Немає замовлень в процесі" />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 rounded-lg bg-gray-900 p-4 shadow-lg">
        <div className="flex items-center gap-2">
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
          <optgroup label="По типу доставки:">
            <option value="forward">Привезти</option>
            <option value="back">Забрати</option>
          </optgroup>
          <optgroup label="По типу заказа:">
            <option value="contract">Договір</option>
            <option value="deposit">Залог</option>
            <option value="contract+deposit">Договір + Залог</option>
          </optgroup>
          <optgroup label="Комбіновані:">
            <option value="today+forward">Сьогодні + Привезти</option>
            <option value="today+back">Сьогодні + Забрати</option>
            <option value="tomorrow+forward">Завтра + Привезти</option>
            <option value="tomorrow+back">Завтра + Забрати</option>
          </optgroup>
        </select>
      </div>

      <div className="flex flex-col gap-4">
        {filteredOrders.map((order) => (
          <Order key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Page;
