"use client";
import createOrder from "@/utils/api/create-order";
import moment from "moment-timezone";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { HiTemplate } from "react-icons/hi";
import DeliveryTypeButton from "./deliveryTypeButton";
import Inputs from "./inputs";
import TypeButton from "./typeButton";

export interface IInitialInputValues {
  datetime: { value: string; template: string };
  order_num: { value: string; template: string };
  order: { value: string; template: string };
  tool: { value: string; template: string };
  cost_delivery: { value: string; template: string };
  cost_rental: { value: string; template: string };
  cost_deposit: { value: string; template: string };
  address: { value: string; template: string };
  coords: { value: string; template: string };
  phone: { value: string; template: string };
  comment: { value: string; template: string };
  [key: string]: { value: string; template: string };
}

const initialInputValues = {
  datetime: {
    value: moment().tz("Europe/Kyiv").format("YYYY-MM-DDTHH:mm"),
    template: moment().tz("Europe/Kyiv").format("YYYY-MM-DDTHH:mm"),
  },
  order_num: { value: "", template: "12345" },
  order: { value: "", template: "Іванов Іван Іванович" },
  tool: { value: "", template: "Бетономешалка" },
  cost_delivery: { value: "", template: "300" },
  cost_rental: { value: "", template: "1000" },
  cost_deposit: { value: "", template: "500" },
  address: { value: "", template: "Вінниця, вул. Юності 10" },
  coords: { value: "", template: "https://maps.app.goo.gl/UTDh6coFXgzkz117A" },
  phone: { value: "", template: "0681234567" },
  comment: { value: "", template: "Залог 2000, забрать за доставку 350грн" },
};

export interface IButtons {
  status: "process" | "completed";
  type: "contract" | "deposit" | "contract+deposit";
  deliveryType: "forward" | "back";
}

const Form = () => {
  const [inputValues, setInputValues] =
    useState<IInitialInputValues>(initialInputValues);

  const [buttons, setButtons] = useState<IButtons>({
    status: "process",
    type: "contract",
    deliveryType: "forward",
  });

  const handleShowTemplate = () => {
    for (const node in initialInputValues) {
      setInputValues((prev) => ({
        ...prev,
        [node]: {
          value: (initialInputValues as IInitialInputValues)[node].template,
          template: (initialInputValues as IInitialInputValues)[node].template,
        },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await createOrder(e, buttons);
    setInputValues(initialInputValues);
  };

  return (
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
          type="button"
          className="flex flex-1 justify-center rounded-md bg-blue-700 py-2 hover:bg-blue-800 active:bg-blue-900"
          onClick={handleShowTemplate}
        >
          <HiTemplate className="text-2xl" />
        </button>
        <button
          type="submit"
          className="flex flex-[4] justify-center rounded-md bg-green-700 py-2 hover:bg-green-800 active:bg-green-900"
        >
          <FaPlus className="text-2xl" />
        </button>
      </div>
    </form>
  );
};

export default Form;
