import { useUpdateStatus } from "@/hooks/useUpdateStatus";
import { IOrder } from "@/models/order.model";
import { Ellipsis } from "lucide-react";

type Props = {
  order: IOrder;
  status: "process" | "completed";
  icon: React.ReactNode;
};

const SetStatusButton = ({ order, status, icon }: Props) => {
  const { mutate, isPending } = useUpdateStatus();

  return (
    <button
      onClick={() => mutate({ id: order._id, status })}
      disabled={isPending}
      className="rounded-md bg-green-500/90 px-4 py-2 text-white transition-colors hover:bg-green-700"
    >
      {isPending ? <Ellipsis /> : icon}
    </button>
  );
};

export default SetStatusButton;
