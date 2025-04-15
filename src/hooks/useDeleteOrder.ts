import { IOrder } from "@/models/order.model";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Response = { deleted: IOrder } | { error: string };

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/orders/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Error updating status");

      const data: Response = await res.json();

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders", "process"] });
      queryClient.invalidateQueries({ queryKey: ["orders", "completed"] });
    },
  });
};
