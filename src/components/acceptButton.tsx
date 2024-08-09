import { IOrder } from "@/models/order.model";
import clsx from "clsx";
import { FaCheck } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";

type Props = {
  delivery: IOrder;
  setToCompleted: (id: string) => void;
};

const AcceptButton = ({ delivery, setToCompleted }: Props) => {
  return (
    <button
      className={clsx(
        "rounded-md bg-green-600 px-4 py-2 active:bg-green-700",
        delivery.status === "completed" && "bg-yellow-600 active:bg-yellow-700",
      )}
      onClick={() => setToCompleted(delivery._id)}
    >
      {delivery.status === "completed" ? <IoMdArrowRoundBack /> : <FaCheck />}
    </button>
  );
};

export default AcceptButton;
