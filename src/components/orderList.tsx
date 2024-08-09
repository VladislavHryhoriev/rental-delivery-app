import { IOrder } from "@/models/order.model";
import getAllOrders from "@/utils/api/get-all-orders";
import updateStatus from "@/utils/api/update-status";
import clsx from "clsx";
import moment from "moment";
import { useEffect, useState } from "react";
import AcceptButton from "./acceptButton";
import EditButton from "./editButton";
import OrderInfo from "./orderInfo";

type Props = {
  orders: IOrder[];
  setOrders: React.Dispatch<React.SetStateAction<IOrder[]>>;
  filteredOrders: IOrder[];
  setFilteredOrders: React.Dispatch<React.SetStateAction<IOrder[]>>;
};

const OrderList = ({
  orders,
  setOrders,
  filteredOrders,
  setFilteredOrders,
}: Props) => {
  const [loading, setLoading] = useState(true);

  const setToCompleted = async (id: string) => {
    setLoading(true);
    const ok = await updateStatus(id, "completed");
    console.log(ok);
  };

  useEffect(() => {
    const fetchData = async () => {
      const orders = await getAllOrders("process");
      const sortedOrders = orders.sort((a: IOrder, b: IOrder) => {
        return moment(a.datetime).diff(moment(b.datetime));
      });

      setFilteredOrders(sortedOrders);
      setOrders(sortedOrders);
    };
    fetchData();

    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return filteredOrders.map((delivery) => (
    <div
      key={delivery._id}
      className={clsx(
        "line my-4 rounded-md bg-gray-800 p-4",
        delivery.status === "completed" && "line-through opacity-50",
      )}
    >
      <OrderInfo delivery={delivery} />

      <div className="mt-4 flex justify-center gap-4">
        <AcceptButton delivery={delivery} setToCompleted={setToCompleted} />
        <EditButton />
      </div>
    </div>
  ));
};

export default OrderList;
