import { IButtons } from "@/components/form/form";
import { IOrder } from "@/models/order.model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type Response = { updated: IOrder } | { error: string };

type Props = {
  id: string;
  formData: FormData;
  buttons: IButtons;
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ id, formData, buttons }: Props) => {
      formData.append("_id", id);

      for (const element in buttons) {
        formData.append(element, buttons[element as keyof IButtons]);
      }

      const data = Object.fromEntries(formData);

      const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error updating order");

      const json: Response = await res.json();
      return json;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders", "process"] });
      queryClient.invalidateQueries({ queryKey: ["orders", "completed"] });
      router.replace(`/orders/process`);
    },
  });
};
