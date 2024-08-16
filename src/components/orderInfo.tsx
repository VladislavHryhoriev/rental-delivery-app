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
    <>
      <div className="mb-2 text-center text-xl">
        <h1>
          №{order.order_num} {order.user}
        </h1>
        <p className="text-sm text-green-400">
          {type} | {deliveryType}
        </p>
      </div>
      <div>
        <div className="overflow-hidden rounded-md">
          <div className="bg-slate-700 p-2">
            <p>{order.tool}</p>
            <p className="mt-2 flex items-center rounded-md bg-red-950 p-2">
              <IoMdPin className="inline-block text-xl text-red-400" />
              <span className="ml-1">{order.address}</span>
            </p>
            <p className="mt-2 flex items-center rounded-md bg-green-950 p-2">
              <FaPhoneSquareAlt className="inline-block text-xl text-green-400" />
              <a className="ml-1 text-blue-400" href={`tel:${order.phone}`}>
                {order.phone}
              </a>
            </p>
          </div>

          <div className="mt-2 bg-slate-700 p-2">
            <p>
              Оренда:{" "}
              <span className="text-green-400">{order.cost_rental}</span>
            </p>
            {order.cost_deposit && order.type !== "contract" && (
              <p>
                {order.type === "contract+deposit" && "Частковий залог: "}
                {order.type === "deposit" && "Залог: "}
                <span className="text-green-400">{order.cost_deposit}</span>
              </p>
            )}
            <p>
              Доставка:{" "}
              <span className="text-green-400">{order.cost_delivery}</span>
            </p>
          </div>
        </div>
        <p className="txt- mt-4 text-sm text-orange-400">{order.comment}</p>
      </div>
    </>
  );
};

export default OrderInfo;
