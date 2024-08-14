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
  return (
    <button
      type="button"
      className={clsx("w-full rounded-sm px-4 py-2", {
        "bg-green-700": deliveryType === activeDeliveryType,
        "bg-gray-700 hover:bg-gray-800 active:bg-gray-800":
          deliveryType !== activeDeliveryType,
      })}
      onClick={() =>
        setButtons((prev: IButtons) => ({
          ...prev,
          deliveryType: activeDeliveryType,
        }))
      }
    >
      {text}
    </button>
  );
};

export default DeliveryTypeButton;
