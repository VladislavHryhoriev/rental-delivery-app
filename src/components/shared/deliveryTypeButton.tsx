import clsx from "clsx";
import { IButtons } from "../form/form";

type Props = {
  title: string;
  deliveryType: string;
  activeDeliveryType: "forward" | "back";
  setButtons: React.Dispatch<React.SetStateAction<IButtons>>;
};

const DeliveryTypeButton = ({
  title: text,
  deliveryType,
  activeDeliveryType,
  setButtons,
}: Props) => {
  const handleClick = () => {
    setButtons((prev: IButtons) => ({
      ...prev,
      deliveryType: activeDeliveryType,
    }));
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(
        "w-full rounded-lg px-4 py-2 text-center transition-colors",
        deliveryType === activeDeliveryType
          ? "bg-red-500/80 text-white"
          : "bg-gray-700 text-gray-300 hover:bg-gray-700/50",
      )}
    >
      {text}
    </button>
  );
};

export default DeliveryTypeButton;
