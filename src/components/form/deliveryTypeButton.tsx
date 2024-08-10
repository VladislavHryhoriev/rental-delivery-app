import clsx from "clsx";

type Props = {
  text: string;
  deliveryType: string;
  activedeliveryType: string;
  setDeliveryType: React.Dispatch<React.SetStateAction<string>>;
};

const DeliveryTypeButton = ({
  text,
  deliveryType,
  activedeliveryType,
  setDeliveryType,
}: Props) => {
  return (
    <button
      type="button"
      className={clsx("w-full rounded-sm px-4 py-2", {
        "bg-green-700": deliveryType === activedeliveryType,
        "bg-gray-700 hover:bg-gray-800 active:bg-gray-800":
          deliveryType !== activedeliveryType,
      })}
      onClick={() => setDeliveryType(activedeliveryType)}
    >
      {text}
    </button>
  );
};

export default DeliveryTypeButton;
