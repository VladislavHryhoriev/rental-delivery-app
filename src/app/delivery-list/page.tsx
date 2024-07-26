"use client";
import { useDeliveryStore } from "@/store/store";
import clsx from "clsx";
import { FaCheck } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdEdit, MdError } from "react-icons/md";

const Page = () => {
  const { deliveries, setIsDone } = useDeliveryStore();

  return (
    <div>
      <div className="mb-4">Доставок: {deliveries.length}шт</div>
      {deliveries.map((delivery) => (
        <div
          key={delivery.id}
          className={clsx(
            "line my-4 rounded-md bg-gray-800 p-4",
            delivery.isDone && "line-through opacity-50",
          )}
        >
          <div className="flex justify-between">
            <div>
              <p>{delivery.type}</p>
              <p>Час: {delivery.datetime}</p>
              <p>Година: {delivery.order}</p>
              <p>Інструмент: {delivery.tool}</p>
              <p>Вартість доставки: {delivery.cost}</p>
              <a
                href={delivery.coordinates}
                className="text-blue-500 underline"
              >
                Открыть карту
              </a>
              <p>{delivery.phone}</p>
              <p>{delivery.comments}</p>
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
    </div>
  );
};

export default Page;
