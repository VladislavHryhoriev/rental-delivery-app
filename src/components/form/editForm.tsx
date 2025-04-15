"use client";
import { useUpdateOrder } from "@/hooks/useUpdateOrder";
import { IOrder } from "@/models/order.model";
import { Loader, SquarePen } from "lucide-react";
import { useState } from "react";
import DeliveryTypeButton from "../shared/deliveryTypeButton";
import TypeButton from "../shared/typeButton";
import { IButtons, IFormData } from "./form";
import Inputs from "./inputs";

const EditForm = ({ order }: { order: IOrder }) => {
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

  const [inputValues, setInputValues] = useState<IFormData>(initialInputValues);

  const { mutate, isPending } = useUpdateOrder();

  const [buttons, setButtons] = useState<IButtons>({
    status: order.status,
    type: order.type,
    deliveryType: order.deliveryType,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    mutate({ id: order._id, formData, buttons });
  };

  return (
    <>
      <h1 className="text-center">Редагування доставки №{order.order_num}</h1>
      <form
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col gap-4 rounded-lg bg-gray-900 p-4 shadow-lg"
      >
        <div className="rounded-lg p-2">
          <div className="mb-2 flex gap-2">
            <TypeButton
              type={buttons.type}
              setButtons={setButtons}
              activeType="contract"
              title="Договір"
            />
            <TypeButton
              type={buttons.type}
              setButtons={setButtons}
              activeType="deposit"
              title="Залог"
            />
          </div>
          <TypeButton
            type={buttons.type}
            setButtons={setButtons}
            activeType="contract+deposit"
            title="Договір + Залог"
          />
        </div>

        <div className="flex gap-2 rounded-lg p-2">
          <DeliveryTypeButton
            deliveryType={buttons.deliveryType}
            setButtons={setButtons}
            activeDeliveryType="forward"
            title="Привезти"
          />
          <DeliveryTypeButton
            deliveryType={buttons.deliveryType}
            setButtons={setButtons}
            activeDeliveryType="back"
            title="Забрати"
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
            className="flex flex-[4] justify-center rounded-lg bg-yellow-600 py-2 transition-colors hover:bg-yellow-700"
          >
            {isPending ? <Loader className="animate-spin" /> : <SquarePen />}
          </button>
        </div>
      </form>
    </>
  );
};

export default EditForm;
