"use client";
import { IOrder } from "@/models/order.model";
import updateOrder from "@/utils/api/update-order";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import DeliveryTypeButton from "./deliveryTypeButton";
import { IButtons, IInitialInputValues } from "./form";
import Inputs from "./inputs";
import TypeButton from "./typeButton";
import { useRouter } from "next/navigation";

const EditForm = ({ order }: { order: IOrder }) => {
  const router = useRouter();

  const initialInputValues = {
    datetime: { value: order.datetime, template: "" },
    order_num: { value: order.order_num, template: "" },
    user: { value: order.user, template: "" },
    tool: { value: order.tool, template: "" },
    cost_delivery: { value: order.cost_delivery, template: "" },
    cost_rental: { value: order.cost_rental, template: "" },
    cost_deposit: { value: order.cost_deposit, template: "" },
    address: { value: order.address, template: "" },
    coords: { value: order.coords, template: "" },
    phone: { value: order.phone, template: "" },
    comment: { value: order.comment, template: "" },
  };

  const [inputValues, setInputValues] =
    useState<IInitialInputValues>(initialInputValues);

  const [buttons, setButtons] = useState<IButtons>({
    status: order.status,
    type: order.type,
    deliveryType: order.deliveryType,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateOrder(order._id, e, buttons);
    router.replace(`/orders/process`);
  };

  return (
    <>
      <h1 className="text-center">Редагування доставки №{order.order_num}</h1>
      <form
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col gap-4 rounded-md bg-gray-800 p-4"
      >
        <div className="rounded-md bg-slate-600 p-2">
          <div className="mb-2 flex gap-2">
            <TypeButton
              type={buttons.type}
              setButtons={setButtons}
              activeType="contract"
              text="Договір"
            />
            <TypeButton
              type={buttons.type}
              setButtons={setButtons}
              activeType="deposit"
              text="Залог"
            />
          </div>
          <TypeButton
            type={buttons.type}
            setButtons={setButtons}
            activeType="contract+deposit"
            text="Договір + Залог"
          />
        </div>

        <div className="flex gap-2 rounded-md bg-slate-600 p-2">
          <DeliveryTypeButton
            deliveryType={buttons.deliveryType}
            setButtons={setButtons}
            activeDeliveryType="forward"
            text="Привезти"
          />
          <DeliveryTypeButton
            deliveryType={buttons.deliveryType}
            setButtons={setButtons}
            activeDeliveryType="back"
            text="Забрати"
          />
        </div>

        <Inputs
          buttons={buttons}
          inputValues={inputValues}
          setInputValues={setInputValues}
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex flex-[4] justify-center rounded-md bg-yellow-700 py-2 hover:bg-yellow-800 active:bg-yellow-900"
          >
            <FaEdit className="text-2xl" />
          </button>
        </div>
      </form>
    </>
  );
};

export default EditForm;
