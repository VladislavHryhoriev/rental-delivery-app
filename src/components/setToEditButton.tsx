import { IOrder } from "@/models/order.model";
import { useRouter } from "next/navigation";

const SetToEditButton = ({ order }: { order: IOrder }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/orders/edit/${order._id}`);
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-md bg-gray-700 px-4 py-2 text-white transition-colors hover:bg-gray-600"
    >
      Редагувати
    </button>
  );
};

export default SetToEditButton;
