import { IOrder } from "@/models/order.model";
import SetToDeleteButton from "../setToDeleteButton";
import SetToProcessButton from "../setToProcessButton";
import OrderInfo from "./orderInfo";
import { FaMapLocationDot } from "react-icons/fa6";
import moment from "moment";

type Props = {
  order: IOrder;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const Order = ({ order, isLoading, setIsLoading }: Props) => {
  const time = moment(order.datetime).format("HH:mm DD.MM");

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
        </div>
        <p className="text-right text-blue-400">{time}</p>
      </div>
    </>
  );
};

export default Order;
