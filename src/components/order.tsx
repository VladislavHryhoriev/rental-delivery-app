import SetToEditButton from "@/components/setToEditButton";
import { IOrder } from "@/models/order.model";
import moment from "moment";
import { usePathname } from "next/navigation";
import { FaMapLocationDot } from "react-icons/fa6";
import OrderInfo from "./orderInfo";
import SetStatusButton from "./setStatusButton";
import SetToDeleteButton from "./setToDeleteButton";

type Props = {
  order: IOrder;
};

const Order = ({ order }: Props) => {
  const time = moment(order.datetime).format("HH:mm DD.MM");
  const path = usePathname();

  return (
    <div className="rounded-lg bg-gray-800/50 p-6 shadow-lg transition-colors hover:bg-gray-900">
      <OrderInfo order={order} />
      <div className="flex items-center justify-between border-t border-gray-700 pt-4">
        <a
          title="Открыть на карте"
          href={order.coords}
          target="_blank"
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          <FaMapLocationDot className="text-lg" />
          <span className="text-sm">На карте</span>
        </a>
        <div className="flex items-center gap-2">
          {path.includes("process") && (
            <>
              <SetStatusButton
                order={order}
                status="completed"
                title="Завершити"
              />
              <SetToEditButton order={order} />
            </>
          )}

          {path.includes("completed") && (
            <>
              <SetStatusButton
                order={order}
                status="process"
                title="Відновити"
              />
              <SetToDeleteButton order={order} />
            </>
          )}
        </div>
        <div className="flex flex-col items-end">
          <p className="text-lg font-medium text-blue-400">{time}</p>
          <p className="text-xs text-gray-500">{order.createdAt}</p>
        </div>
      </div>
    </div>
  );
};

export default Order;
