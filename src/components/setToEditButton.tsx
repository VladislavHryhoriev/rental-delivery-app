import { IOrder } from "@/models/order.model";
import { useRouter } from "next/navigation";
import { MdEdit } from "react-icons/md";

const SetToEditButton = ({ order }: { order: IOrder }) => {
  const router = useRouter();

  return (
    <button
      title="Редактировать"
      className="rounded-e-md bg-red-800 px-4 py-2 active:bg-red-900"
      onClick={() => router.push(`/orders/edit/${order._id}`)}
    >
      <MdEdit />
    </button>
  );
};

export default SetToEditButton;
