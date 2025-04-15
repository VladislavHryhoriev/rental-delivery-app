import { IOrder } from "@/models/order.model";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteOrder } from "@/hooks/useDeleteOrder";

type Props = {
  order: IOrder;
};

const SetToDeleteButton = ({ order }: Props) => {
  const { mutate, isPending } = useDeleteOrder();

  return (
    <button
      onClick={() => mutate(order._id)}
      disabled={isPending}
      className="rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-500 disabled:opacity-50"
    >
      {isPending ? "..." : "Видалити"}
    </button>
  );
};

export default SetToDeleteButton;
