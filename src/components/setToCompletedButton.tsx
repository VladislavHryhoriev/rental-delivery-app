import { IOrder } from "@/models/order.model";
import updateStatus from "@/utils/api/update-status";
import clsx from "clsx";
import { FaCheck } from "react-icons/fa";

type Props = {
  order: IOrder;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const SetToCompletedButton = ({ order, isLoading, setIsLoading }: Props) => {
  const setToCompleted = async (id: string) => {
    setIsLoading(true);
    const ok = await updateStatus(id, "completed");
    console.log(ok);
    setIsLoading(false);
  };

  const handleClick = () => {
    setToCompleted(order._id);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="rounded-md bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-500 disabled:opacity-50"
    >
      {isLoading ? "..." : "Завершити"}
    </button>
  );
};

export default SetToCompletedButton;
