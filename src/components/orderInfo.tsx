import { IOrder } from "@/models/order.model";
import moment from "moment";
import { FaCheck } from "react-icons/fa";
import { MdError } from "react-icons/md";

const types = {
  contract: "Договір",
  deposit: "Консультація",
  "contract+deposit": "Договір + Застава",
};

const OrderInfo = ({ delivery }: { delivery: IOrder }) => {
  const type = types[delivery.deliveryType];

  return (
    <div className="flex justify-between">
      <div>
        <h1 className="mb-2 text-center text-xl">{type}</h1>
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
  );
};

export default OrderInfo;
