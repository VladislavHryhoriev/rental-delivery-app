import { IOrder } from "@/models/order.model";
import updateStatus from "@/utils/api/update-status";
import clsx from "clsx";
import { FaCheck } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";

type Props = {
  order: IOrder;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const AcceptButton = ({ order, isLoading, setIsLoading }: Props) => {
  const setToCompleted = async (id: string) => {
    setIsLoading(true);

    const ok = await updateStatus(id, "completed");
    console.log(ok);

    setIsLoading(false);
  };

  return (
    <button
      className={clsx(
        "rounded-sm bg-green-600 px-4 py-2 active:bg-green-700",
        order.status === "completed" && "bg-yellow-600 active:bg-yellow-700",
        isLoading && "bg-gray-700",
      )}
      onClick={() => setToCompleted(order._id)}
      disabled={isLoading}
    >
      {order.status === "completed" ? <IoMdArrowRoundBack /> : <FaCheck />}
    </button>
  );
};

export default AcceptButton;
