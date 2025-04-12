import SetToEditButton from "@/components/setToEditButton";
import { IOrder } from "@/models/order.model";
import moment from "moment";
import { usePathname } from "next/navigation";
import { FaMapLocationDot } from "react-icons/fa6";
import OrderInfo from "./orderInfo";
import SetToCompletedButton from "./setToCompletedButton";
import SetToDeleteButton from "./setToDeleteButton";
import SetToProcessButton from "./setToProcessButton";

type Props = {
  order: IOrder;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const Order = ({ order, isLoading, setIsLoading }: Props) => {
  const time = moment(order.datetime).format("HH:mm DD.MM");
  const path = usePathname();

  return (
    <div className="space-y-4">
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
              <SetToCompletedButton
                order={order}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
              <SetToEditButton order={order} />
            </>
          )}

          {path.includes("completed") && (
            <>
              <SetToProcessButton
                order={order}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
              <SetToDeleteButton
                order={order}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
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
