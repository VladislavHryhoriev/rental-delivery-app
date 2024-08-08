"use client";
import { IOrder } from "@/models/order.model";
import getAllOrders from "@/utils/api/get-all-orders";
import updateStatus from "@/utils/api/update-status";
import clsx from "clsx";
import moment from "moment";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdEdit, MdError } from "react-icons/md";

const Orders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const orders = await getAllOrders("process");
      const sortedOrders = orders.sort((a: IOrder, b: IOrder) => {
        return moment(a.datetime).diff(moment(b.datetime));
      });

      setFilteredOrders(sortedOrders);
      setOrders(sortedOrders);
    };
    fetchData();
    setLoading(false);
  }, [loading]);

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

  const setToCompleted = async (id: string) => {
    setLoading(true);
    const ok = await updateStatus(id, "completed");
    console.log(ok);
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
          <option value="after-tomorrow">Послезавтра</option>
        </select>
      </div>
      {filteredOrders.map((delivery) => (
        <div
          key={delivery._id}
          className={clsx(
            "line my-4 rounded-md bg-gray-800 p-4",
            delivery.status === "completed" && "line-through opacity-50",
          )}
        >
          <div className="flex justify-between">
            <div>
              <p>Час: {moment(delivery.datetime).format("DD.MM hh:mm")}</p>
              <p>Замовлення: {delivery.order}</p>
              <p>Інструмент: {delivery.tool}</p>
              <p>Адреса: {delivery.address}</p>
              <p>Вартість доставки: {delivery.cost}</p>
              <a
                href={delivery.coords}
                target="_blank"
                className="text-blue-500 underline"
              >
                Відкрити карту
              </a>
              <p>Телефон: {delivery.phone}</p>
              <p>Комментар: {delivery.comment}</p>
            </div>
            <div>
              {delivery.status === "completed" ? (
                <FaCheck className="text-green-500" />
              ) : (
                <MdError className="text-red-500" />
              )}
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <button
              className={clsx(
                "rounded-md bg-green-600 px-4 py-2 active:bg-green-700",
                delivery.status === "completed" &&
                  "bg-yellow-600 active:bg-yellow-700",
              )}
              onClick={() => setToCompleted(delivery._id)}
            >
              {delivery.status === "completed" ? (
                <IoMdArrowRoundBack />
              ) : (
                <FaCheck />
              )}
            </button>
            <button className="rounded-md bg-red-800 px-4 py-2 active:bg-red-900">
              <MdEdit />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Orders;
