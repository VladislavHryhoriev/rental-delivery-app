import { IOrder } from "@/models/order.model";
import clsx from "clsx";
import { FaCheck } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";

type Props = {
  delivery: IOrder;
  handler: (id: string) => void;
};

const MoveBackButton = ({ delivery, handler }: Props) => {
  return (
    <button
      className={clsx(
        "rounded-sm bg-green-600 px-4 py-2 active:bg-green-700",
        delivery.status === "completed" && "bg-yellow-600 active:bg-yellow-700",
      )}
      onClick={() => handler(delivery._id)}
    >
      {delivery.status === "completed" ? <IoMdArrowRoundBack /> : <FaCheck />}
    </button>
  );
};

export default MoveBackButton;
