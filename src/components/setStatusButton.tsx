import { useUpdateStatus } from "@/hooks/useUpdateStatus";
import { IOrder } from "@/models/order.model";

type Props = {
  order: IOrder;
  status: "process" | "completed";
  title: string;
};

const SetStatusButton = ({ order, status, title }: Props) => {
  const { mutate, isPending } = useUpdateStatus();

  return (
    <button
      onClick={() => mutate({ id: order._id, status })}
      disabled={isPending}
      className="rounded-md bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-500"
    >
      {isPending ? "..." : title}
    </button>
  );
};

export default SetStatusButton;
