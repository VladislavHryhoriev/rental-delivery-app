import clsx from "clsx";
import { IButtons } from "./form";

type Props = {
  status: string;
  setButtons: React.Dispatch<React.SetStateAction<IButtons>>;
  activeStatus: "process" | "completed";
  text: string;
};

const StatusButton = ({ status, setButtons, activeStatus, text }: Props) => {
  return (
    <button
      type="button"
      className={clsx("w-full px-4 py-2", {
        "bg-green-700": status === activeStatus,
        "bg-gray-700 hover:bg-gray-800 active:bg-gray-800":
          status !== activeStatus,
      })}
      onClick={() =>
        setButtons((prev: IButtons) => ({ ...prev, status: activeStatus }))
      }
    >
      {text}
    </button>
  );
};

export default StatusButton;
