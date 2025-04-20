import SetToEditButton from "@/components/shared/setToEditButton";
import { IOrder } from "@/models/order.model";
import { Check, Undo2 } from "lucide-react";
import moment from "moment";
import { usePathname } from "next/navigation";
import OrderInfo from "./orderInfo";
import SetStatusButton from "../shared/setStatusButton";
import SetToDeleteButton from "../shared/setToDeleteButton";

type Props = {
  order: IOrder;
};

const Order = ({ order }: Props) => {
  const time = moment(order.datetime).format("HH:mm DD.MM");
  const path = usePathname();

  return (
    <div className="rounded-lg bg-gray-900 p-6">
      <OrderInfo order={order} />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-blue-400">{time}</p>
          <p className="text-xs text-gray-700">{order.createdAt}</p>
        </div>
        <div className="flex items-center gap-2">
          {path.includes("process") && (
            <>
              <SetStatusButton
                order={order}
                status="completed"
                icon={<Check />}
              />
              <SetToEditButton order={order} />
            </>
          )}

          {path.includes("completed") && (
            <>
              <SetStatusButton
                order={order}
                status="process"
                icon={<Undo2 />}
              />
              <SetToDeleteButton order={order} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
