"use client";
import { IOrder } from "@/models/order.model";
import moment from "moment";
import { useState } from "react";
import OrderList from "./orderList";

const Orders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<IOrder[]>([]);

  const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    switch (target.value) {
      case "all":
        setFilteredOrders(orders);
        break;

      case "today": {
        const today = moment().format("YYYY-MM-DD");
        const filteredOrders = orders.filter((order) => {
          const orderDate = moment(order.datetime).format("YYYY-MM-DD");

          return orderDate === today;
        });

        setFilteredOrders(filteredOrders);
        break;
      }

      case "tomorrow": {
        const tomorrow = moment().add(1, "day").format("YYYY-MM-DD");
        const filteredOrders = orders.filter((order) => {
          const orderDate = moment(order.datetime).format("YYYY-MM-DD");

          return orderDate === tomorrow;
        });

        setFilteredOrders(filteredOrders);
        break;
      }
      case "after-tomorrow": {
        const afterTomorrow = moment().add(2, "day").format("YYYY-MM-DD");
        const filteredOrders = orders.filter((order) => {
          const orderDate = moment(order.datetime).format("YYYY-MM-DD");

          return orderDate === afterTomorrow;
        });

        setFilteredOrders(filteredOrders);
        break;
      }
      default:
        break;
    }
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div>В процесі: {orders.length}шт</div>
        <select
          onChange={(e) => handleChange(e)}
          className="p-1 hover:border-none"
          defaultValue="all"
        >
          <option value="all">Усі</option>
          <option value="today">Сьогодні</option>
          <option value="tomorrow">Завтра</option>
          <option value="after-tomorrow">Післязавтра</option>
        </select>
      </div>
      <OrderList
        orders={orders}
        setOrders={setOrders}
        filteredOrders={filteredOrders}
        setFilteredOrders={setFilteredOrders}
      />
    </>
  );
};

export default Orders;
