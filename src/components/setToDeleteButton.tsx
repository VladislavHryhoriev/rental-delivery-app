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

  return (
    <button
      title="Удалить"
      onClick={() => setToDelete(order._id)}
      className="rounded-e-md bg-red-800 px-4 py-2 active:bg-red-900"
    >
      <MdDeleteForever />
    </button>
  );
};

export default SetToDeleteButton;
