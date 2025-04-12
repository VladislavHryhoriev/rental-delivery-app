import clsx from "clsx";
import { IButtons } from "./form";

type Props = {
  text: string;
  type: "contract" | "deposit" | "contract+deposit";
  activeType: "contract" | "deposit" | "contract+deposit";
  setButtons: React.Dispatch<React.SetStateAction<IButtons>>;
};

const TypeButton = ({ text, type, activeType, setButtons }: Props) => {
  const handleClick = () => {
    setButtons((prev: IButtons) => ({
      ...prev,
      type: activeType,
    }));
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(
        "w-full rounded-lg px-4 py-2 text-center transition-colors",
        type === activeType
          ? "bg-green-600 text-white"
          : "bg-gray-700 text-gray-300 hover:bg-gray-600",
      )}
    >
      {text}
    </button>
  );
};

export default TypeButton;
