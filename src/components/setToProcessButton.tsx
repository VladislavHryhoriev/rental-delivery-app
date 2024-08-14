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

  return (
    <button
      title="Вернуть в активные"
      className={clsx(
        "rounded-s-md bg-yellow-600 px-4 py-2 active:bg-yellow-700",
        isLoading && "bg-gray-700",
      )}
      onClick={() => setToProcess(order._id)}
      disabled={isLoading}
    >
      <IoMdArrowRoundBack />
    </button>
  );
};

export default SetToProcessButton;
