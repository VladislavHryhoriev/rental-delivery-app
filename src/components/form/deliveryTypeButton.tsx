import clsx from "clsx";
import { IButtons } from "./form";

type Props = {
  text: string;
  deliveryType: string;
  activeDeliveryType: "forward" | "back";
  setButtons: React.Dispatch<React.SetStateAction<IButtons>>;
};

const DeliveryTypeButton = ({
  text,
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
          ? "bg-green-600 text-white"
          : "bg-gray-700 text-gray-300 hover:bg-gray-600",
      )}
    >
      {text}
    </button>
  );
};

export default DeliveryTypeButton;
