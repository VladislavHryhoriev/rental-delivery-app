import { IOrder } from "@/models/order.model";

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
    <>
      <div className="mb-2 text-center text-xl">
        <h1>
          №{order.order_num} {order.order}
        </h1>
        <p className="text-sm text-gray-200">
          {type} | {deliveryType}
        </p>
      </div>
      <div>
        <div className="rounded-md bg-slate-700 p-2">
          <p>Інструмент: {order.tool}</p>
          <p>Адреса: {order.address}</p>
          <p>
            Телефон:{" "}
            <a className="text-blue-500" href={`tel:${order.phone}`}>
              {order.phone}
            </a>
          </p>
        </div>

        <div className="mt-4 rounded-md bg-slate-700 p-2">
          <p>
            Оренда: <span>{order.cost_rental}</span>
          </p>
          {order.cost_deposit && order.type !== "contract" && (
            <p>
              {order.type === "contract+deposit" && "Частковий залог: "}
              {order.type === "deposit" && "Залог: "}
              <span>{order.cost_deposit}</span>
            </p>
          )}
          <p>
            Доставка: <span>{order.cost_delivery}</span>
          </p>
        </div>
        <p className="txt- mt-4 text-sm text-orange-400">{order.comment}</p>
      </div>
    </>
  );
};

export default OrderInfo;
