import { IOrder } from "@/models/order.model";
import deleteOrder from "@/utils/api/delete-order";
import { MdDeleteForever } from "react-icons/md";

type Props = {
  order: IOrder;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const SetToDeleteButton = ({ order, isLoading, setIsLoading }: Props) => {
  const setToDelete = async (id: string) => {
    setIsLoading(true);
    const ok = await deleteOrder(id);
    console.log(ok);
    setIsLoading(false);
  };

  const handleClick = () => {
    setToDelete(order._id);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-500 disabled:opacity-50"
    >
      {isLoading ? "..." : "Видалити"}
    </button>
  );
};

export default SetToDeleteButton;
