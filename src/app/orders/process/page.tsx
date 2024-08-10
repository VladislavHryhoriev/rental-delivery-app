/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Orders from "@/components/process/orders";
import { IOrder } from "@/models/order.model";
import getAllOrders from "@/utils/api/get-all-orders";
import moment from "moment";
import { useEffect, useState } from "react";

const Page = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const orders = await getAllOrders("process");
      setOrders(orders);
      setFilteredOrders(orders);
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
      });
      setFilteredOrders(filtered);
    }
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div>В процесі: {orders.length}шт</div>
          <div>Відсортовані: {filteredOrders.length}шт</div>
        </div>
        <select
          onChange={handleChange}
          className="border-none p-1 active:outline-none"
          defaultValue="all"
        >
          <option value="all">Усі</option>
          <option value="today">Сьогодні</option>
          <option value="tomorrow">Завтра</option>
          <option value="after-tomorrow">Післязавтра</option>
        </select>
      </div>

      <Orders
        filteredOrders={filteredOrders}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </>
  );
};

export default Page;
