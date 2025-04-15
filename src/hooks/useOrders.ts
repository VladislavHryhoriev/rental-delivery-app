import { IOrder } from "@/models/order.model";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

const sortOrdersByDate = (orders: IOrder[]) => {
  return orders.sort((a: IOrder, b: IOrder) =>
    moment(a.datetime).diff(moment(b.datetime)),
  );
};

export const useOrders = (status: "process" | "completed") =>
  useQuery<IOrder[]>({
    queryKey: ["orders", status],
    queryFn: async () => {
      const response = await fetch(`/api/orders?status=${status}`);
      if (!response.ok) throw new Error("Ошибка при получении заказов");
      const data: IOrder[] = await response.json();

      return sortOrdersByDate(data);
    },
  });
