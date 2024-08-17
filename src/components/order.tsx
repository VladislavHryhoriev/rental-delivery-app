import SetToEditButton from "@/components/setToEditButton";
import { IOrder } from "@/models/order.model";
import moment from "moment";
import { FaMapLocationDot } from "react-icons/fa6";
import SetToCompletedButton from "./setToCompletedButton";
import OrderInfo from "./orderInfo";
import SetToDeleteButton from "./setToDeleteButton";
import { usePathname } from "next/navigation";
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
    <>
      <OrderInfo order={order} />
      <div className="mt-4 flex items-center justify-between">
        <a
          title="Открыть на карте"
          href={order.coords}
          target="_blank"
          className="rounded-md bg-blue-500 px-4 py-2 text-xl active:bg-blue-600"
        >
          <FaMapLocationDot />
        </a>
        <div className="text-xl">
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
        <p className="text-right text-blue-400">{time}</p>
      </div>
      <p className="mt-4 text-right text-xs text-zinc-700">{order.createdAt}</p>
    </>
  );
};

export default Order;
