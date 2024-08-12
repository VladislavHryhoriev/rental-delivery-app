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
        <div>
          <h1 className="mb-2 text-center text-xl sm:text-left">{type}</h1>
          <p>{order.order}</p>
          <p>Інструмент: {order.tool}</p>
          <p>Адреса: {order.address}</p>
          <p>Вартість доставки: {order.cost}</p>
          <p>Телефон: {order.phone}</p>
          <p className="txt- mt-4">Комментар: {order.comment}</p>
        </div>
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
