import { IButtons, IFormData } from "@/components/form/form";
import { IOrder } from "@/models/order.model";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Response = { created: IOrder } | { error: string };

type Props = {
  inputValues: IFormData;
  buttons: IButtons;
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ inputValues, buttons }: Props) => {
      const data = {
        ...buttons,
        ...Object.fromEntries(
          Object.entries(inputValues).map(([key, value]) => [key, value.value]),
        ),
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json: Response = await res.json();
      return json;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders", "process"] });
      queryClient.invalidateQueries({ queryKey: ["orders", "completed"] });
    },
  });
};
