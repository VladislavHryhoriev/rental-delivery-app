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
        <h1>{type}</h1>
        <p className="text-sm">({deliveryType})</p>
      </div>
      <div>
        <p>{order.order}</p>
        <p>Інструмент: {order.tool}</p>
        <p>Адреса: {order.address}</p>
        <p>Телефон: {order.phone}</p>

        <div className="mt-4 flex justify-between gap-2 rounded-md bg-slate-700 p-2">
          <p className="flex flex-col items-center">
            <span>Доставка</span>
            <span>{order.cost_delivery}</span>
          </p>
          <p className="flex flex-col items-center">
            <span>Оренда</span>
            <span>{order.cost_rental}</span>
          </p>
          {order.cost_deposit && (
            <p className="flex flex-col items-center">
              <span>Застава</span>
              <span>{order.cost_deposit}</span>
            </p>
          )}
        </div>
        <p className="txt- mt-4 text-sm text-orange-400">{order.comment}</p>
      </div>
    </>
  );
};

export default OrderInfo;
