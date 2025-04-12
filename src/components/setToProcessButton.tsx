import { IOrder } from "@/models/order.model";
import updateStatus from "@/utils/api/update-status";
import clsx from "clsx";
import { IoMdArrowRoundBack } from "react-icons/io";

type Props = {
  order: IOrder;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const SetToProcessButton = ({ order, isLoading, setIsLoading }: Props) => {
  const setToProcess = async (id: string) => {
    setIsLoading(true);
    const ok = await updateStatus(id, "process");
    console.log(ok);
    setIsLoading(false);
  };

  const handleClick = () => {
    setToProcess(order._id);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="rounded-md bg-yellow-600 px-4 py-2 text-white transition-colors hover:bg-yellow-500 disabled:opacity-50"
    >
      {isLoading ? "..." : "В процес"}
    </button>
  );
};

export default SetToProcessButton;
