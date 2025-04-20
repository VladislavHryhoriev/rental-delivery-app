import { IOrder } from "@/models/order.model";
import { MapPin, Smartphone } from "lucide-react";
import Link from "next/link";

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
    <div className="flex flex-col gap-6 rounded-lg bg-gray-900">
      <div className="flex items-center justify-between gap-2">
        <span className="text-lg font-bold text-gray-100">
          №{order.order_num}
        </span>
        <span className="rounded-md bg-green-900/30 px-2 py-1 text-xs text-green-400">
          {type} | {deliveryType}
        </span>
      </div>
      <div>
        <span className="text-gray-300">{order.user}</span>
        <p className="mt-1 text-xs text-gray-400">{order.tool}</p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Link
          href={`tel:${order.phone}`}
          className="flex items-center gap-2 rounded-md bg-gray-800/50 px-3 py-1.5 text-blue-400 transition-colors hover:bg-gray-800 hover:text-blue-300"
        >
          <Smartphone />
          <span>{order.phone}</span>
        </Link>
        <Link
          href={order.coords}
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center gap-2 rounded-md bg-gray-800/50 px-3 py-1.5 text-red-400 transition-colors hover:bg-gray-800 hover:text-red-300"
        >
          <MapPin />
          <span>{order.address}</span>
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm *:rounded-md *:bg-gray-800/50 *:px-3 *:py-1.5">
        <div>
          <span className="text-gray-400">Оренда:</span>
          <span className="ml-1 text-green-400">{order.cost_rental}</span>
        </div>
        {order.cost_deposit && order.type !== "contract" && (
          <div>
            <span className="text-gray-400">
              {order.type === "contract+deposit"
                ? "Частоковий Залог:"
                : "Залог:"}
            </span>
            <span className="ml-1 text-green-400">{order.cost_deposit}</span>
          </div>
        )}
        <div>
          <span className="text-gray-400">Доставка:</span>
          <span className="ml-1 text-green-400">{order.cost_delivery}</span>
        </div>
      </div>

      {order.comment && (
        <div className="mt-3 border-t border-gray-800 py-3">
          <p className="text-sm text-gray-400">Коментар:</p>
          <p className="mt-1 text-gray-300">{order.comment}</p>
        </div>
      )}
    </div>
  );
};

export default OrderInfo;
