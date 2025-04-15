import { IOrder } from "@/models/order.model";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Response = { updated: IOrder } | { error: string };

type Props = {
  id: string;
  status: "process" | "completed";
};

export const useUpdateStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: Props) => {
      const res = await fetch(`/api/orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
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
