import clsx from "clsx";
import { IButtons } from "../form/form";

type Props = {
  title: string;
  type: "contract" | "deposit" | "contract+deposit";
  activeType: "contract" | "deposit" | "contract+deposit";
  setButtons: React.Dispatch<React.SetStateAction<IButtons>>;
};

const TypeButton = ({ title, type, activeType, setButtons }: Props) => {
  const handleClick = () => {
    setButtons((prev: IButtons) => ({ ...prev, type: activeType }));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(
        "w-full rounded-lg px-4 py-2 text-center transition-colors",
        type === activeType
          ? "bg-red-500/80 text-white"
          : "bg-gray-800 text-gray-400 hover:bg-gray-700/50",
      )}
    >
      {title}
    </button>
  );
};

export default TypeButton;
