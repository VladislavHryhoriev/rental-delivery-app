import { IOrder } from "@/models/order.model";
import clsx from "clsx";
import { FaCheck } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdEdit, MdError } from "react-icons/md";

type Props = {
  orders: IOrder[];
  setIsDone: (id: string) => void;
};

const Orders = ({ orders, setIsDone }: Props) => {
  return (
    <>
      {orders.map((delivery) => (
        <div
          key={delivery._id}
          className={clsx(
            "line my-4 rounded-md bg-gray-800 p-4",
            delivery.isDone && "line-through opacity-50",
          )}
        >
          <div className="flex justify-between">
            <div>
              <p>Час: {delivery.datetime}</p>
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
              {delivery.isDone ? (
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
                delivery.isDone && "bg-yellow-600 active:bg-yellow-700",
              )}
              onClick={() => setIsDone(delivery.id)}
            >
              {delivery.isDone ? <IoMdArrowRoundBack /> : <FaCheck />}
            </button>
            <button className="rounded-md bg-red-800 px-4 py-2">
              <MdEdit />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Orders;
