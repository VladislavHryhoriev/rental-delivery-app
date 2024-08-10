import AcceptButton from "@/components/acceptButton";
import EditButton from "@/components/editButton";
import OrderInfo from "@/components/orderInfo";
import { IOrder } from "@/models/order.model";
import clsx from "clsx";

type Props = {
  filteredOrders: IOrder[];
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const Orders = ({ filteredOrders, isLoading, setIsLoading }: Props) => {
  return (
    <>
      {filteredOrders.map((order) => (
        <div
          key={order._id}
          className={clsx(
            "line my-4 rounded-sm bg-gray-800 p-4",
            order.status === "completed" && "line-through opacity-50",
          )}
        >
          <OrderInfo order={order} />
          <div className="mt-4 flex justify-center gap-4">
            <AcceptButton
              order={order}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
            <EditButton />
          </div>
        </div>
      ))}
    </>
  );
};

export default Orders;
