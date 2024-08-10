import { IOrder } from "@/models/order.model";
import moment from "moment";
import { FaCheck } from "react-icons/fa";
import { MdError } from "react-icons/md";

const types = {
  contract: "Договір",
  deposit: "Залог",
  "contract+deposit": "Договір + Залог",
};

const OrderInfo = ({ order }: { order: IOrder }) => {
  const type = types[order.deliveryType];

  return (
    <div className="flex justify-between">
      <div>
        <h1 className="mb-2 text-center text-xl sm:text-left">{type}</h1>
        <p>Час: {moment(order.datetime).format("DD.MM hh:mm")}</p>
        <p>Замовлення: {order.order}</p>
        <p>Інструмент: {order.tool}</p>
        <p>Адреса: {order.address}</p>
        <p>Вартість доставки: {order.cost}</p>
        <a
          href={order.coords}
          target="_blank"
          className="text-blue-500 underline"
        >
          Відкрити карту
        </a>
        <p>Телефон: {order.phone}</p>
        <p>Комментар: {order.comment}</p>
      </div>
      <div>
        {order.status === "completed" ? (
          <FaCheck className="text-green-500" />
        ) : (
          <MdError className="text-red-500" />
        )}
      </div>
    </div>
  );
};

export default OrderInfo;
