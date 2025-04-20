import { useDeleteOrder } from "@/hooks/useDeleteOrder";
import { IOrder } from "@/models/order.model";
import { Loader, Trash2 } from "lucide-react";

type Props = {
  order: IOrder;
};

const SetToDeleteButton = ({ order }: Props) => {
  const { mutate, isPending } = useDeleteOrder();

  return (
    <button
      onClick={() => mutate(order._id)}
      disabled={isPending}
      className="rounded-md bg-red-500/90 px-4 py-2 text-white transition-colors hover:bg-red-700 disabled:opacity-50"
    >
      {isPending ? <Loader className="animate-spin" /> : <Trash2 />}
    </button>
  );
};

export default SetToDeleteButton;
