import { IOrder } from "@/models/order.model";
import { MdDeleteForever } from "react-icons/md";

type Props = {
  delivery: IOrder;
  handler: (id: string) => void;
};

const DeleteButton = ({ delivery, handler }: Props) => {
  return (
    <button
      onClick={() => handler(delivery._id)}
      className="rounded-sm bg-red-800 px-4 py-2 active:bg-red-900"
    >
      <MdDeleteForever />
    </button>
  );
};

export default DeleteButton;
