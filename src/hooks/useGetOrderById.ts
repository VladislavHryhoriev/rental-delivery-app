import { IOrder } from "@/models/order.model";
import { useQuery } from "@tanstack/react-query";

export const useGetOrderById = (id: string) =>
  useQuery<IOrder>({
    queryKey: ["order", id],
    queryFn: async () => {
      const response = await fetch(`/api/orders/${id}`);
      if (!response.ok) throw new Error("Ошибка при получении заказа");

      const data: IOrder = await response.json();

      return data;
    },
  });
