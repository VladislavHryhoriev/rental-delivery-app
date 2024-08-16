import clsx from "clsx";
import { IButtons } from "./form";

type Props = {
  text: string;
  type: "contract" | "deposit" | "contract+deposit";
  activeType: "contract" | "deposit" | "contract+deposit";
  setButtons: React.Dispatch<React.SetStateAction<IButtons>>;
};

const TypeButton = ({ text, type, activeType, setButtons }: Props) => {
  return (
    <button
      type="button"
      className={clsx("w-full rounded-sm px-4 py-2", {
        "bg-green-700": type === activeType,
        "bg-gray-700 hover:bg-gray-800 active:bg-gray-800": type !== activeType,
      })}
      onClick={() =>
        setButtons((prev: IButtons) => ({
          ...prev,
          type: activeType,
        }))
      }
    >
      {text}
    </button>
  );
};

export default TypeButton;
