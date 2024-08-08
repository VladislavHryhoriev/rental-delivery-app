"use client";
import { IOrder } from "@/models/order.model";
import deleteOrder from "@/utils/api/delete-order";
import getAllOrders from "@/utils/api/get-all-orders";
import updateStatus from "@/utils/api/update-status";
import clsx from "clsx";
import moment from "moment";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdDeleteForever, MdError } from "react-icons/md";

const Page = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const orders = await getAllOrders("completed");
      const sortedOrders = orders.sort((a: IOrder, b: IOrder) => {
        return moment(a.datetime).diff(moment(b.datetime));
      });

      setOrders(sortedOrders);
    };
    fetchData();
    setLoading(false);
  }, [loading]);

  const setToProcess = async (id: string) => {
    setLoading(true);
    const ok = await updateStatus(id, "process");
    console.log(ok);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    const ok = await deleteOrder(id);
    console.log(ok);
  };

  return (
    <>
      <div className="mb-4">
        <div>Завершені: {orders.length}шт</div>
      </div>
      {orders.map((delivery) => (
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
              <a href={delivery.coords} className="text-blue-500 underline">
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
              onClick={() => setToProcess(delivery._id)}
            >
              {delivery.status === "completed" ? (
                <IoMdArrowRoundBack />
              ) : (
                <FaCheck />
              )}
            </button>

            <button
              onClick={() => handleDelete(delivery._id)}
              className="rounded-md bg-red-800 px-4 py-2 active:bg-red-900"
            >
              <MdDeleteForever />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Page;
