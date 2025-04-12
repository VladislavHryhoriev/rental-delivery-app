import { IOrder } from "@/models/order.model";
import { BsFillPhoneFill } from "react-icons/bs";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { IoMdPin } from "react-icons/io";

const types = {
  contract: "Договір",
  deposit: "Залог",
  "contract+deposit": "Договір + Залог",
};

const deliveryTypes = { forward: "Привезти", back: "Забрати" };

const OrderInfo = ({ order }: { order: IOrder }) => {
  const type = types[order.type];
  const deliveryType = deliveryTypes[order.deliveryType];

  return (
    <div className="rounded-lg bg-gray-900 p-4">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-100">
              #{order.order_num}
            </span>
            <span className="text-sm text-gray-400">{order.user}</span>
          </div>
          <p className="mt-1 text-gray-300">{order.tool}</p>
        </div>
        <span className="rounded bg-gray-800/50 px-2 py-1 text-xs text-green-400">
          {type} | {deliveryType}
        </span>
      </div>

      <div className="mb-3 flex items-center gap-4">
        <a
          href={`tel:${order.phone}`}
          className="flex items-center gap-2 rounded-md bg-gray-800/50 px-3 py-1.5 text-blue-400 transition-colors hover:bg-gray-800 hover:text-blue-300"
        >
          <FaPhoneSquareAlt className="text-base" />
          <span>{order.phone}</span>
        </a>
        <a
          href={order.coords}
          target="_blank"
          className="flex items-center gap-2 rounded-md bg-gray-800/50 px-3 py-1.5 text-red-400 transition-colors hover:bg-gray-800 hover:text-red-300"
        >
          <IoMdPin className="text-base" />
          <span>{order.address}</span>
        </a>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <div className="rounded-md bg-gray-800/50 px-3 py-1.5">
          <span className="text-gray-400">Оренда:</span>
          <span className="ml-1 text-green-400">{order.cost_rental}</span>
        </div>
        {order.cost_deposit && order.type !== "contract" && (
          <div className="rounded-md bg-gray-800/50 px-3 py-1.5">
            <span className="text-gray-400">
              {order.type === "contract+deposit" ? "Залог:" : "Залог:"}
            </span>
            <span className="ml-1 text-green-400">{order.cost_deposit}</span>
          </div>
        )}
        <div className="rounded-md bg-gray-800/50 px-3 py-1.5">
          <span className="text-gray-400">Доставка:</span>
          <span className="ml-1 text-green-400">{order.cost_delivery}</span>
        </div>
      </div>

      {order.comment && (
        <div className="mt-3 border-t border-gray-800 pt-3">
          <p className="text-sm text-gray-400">Коментар:</p>
          <p className="mt-1 text-gray-300">{order.comment}</p>
        </div>
      )}
    </div>
  );
};

export default OrderInfo;
