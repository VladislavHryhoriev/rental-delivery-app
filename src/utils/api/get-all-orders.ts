import { IOrder } from "@/models/order.model";
import moment from "moment";

const sortOrdersByDate = (orders: IOrder[]) => {
  return orders.sort((a: IOrder, b: IOrder) =>
    moment(a.datetime).diff(moment(b.datetime)),
  );
};

export default async function getAllOrders(
  status: "process" | "completed",
): Promise<IOrder[] | []> {
  try {
    const response = await fetch(`/api/orders/get-all-orders?status=${status}`);

    const data = await response.json();

    return sortOrdersByDate(data);
  } catch (error) {
    console.log(error);
    return [];
  }
}
