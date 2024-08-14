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

  return (
    <button
      title="Переместить в завершенные"
      className={clsx(
        "rounded-s-md bg-green-600 px-4 py-2 active:bg-green-700",
        isLoading && "bg-gray-700",
      )}
      onClick={() => setToCompleted(order._id)}
      disabled={isLoading}
    >
      <FaCheck />
    </button>
  );
};

export default SetToCompletedButton;
