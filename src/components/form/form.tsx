"use client";
import createOrder from "@/utils/api/create-order";
import { LayoutTemplate, Plus } from "lucide-react";
import moment from "moment-timezone";
import { useState } from "react";
import DeliveryTypeButton from "../shared/deliveryTypeButton";
import TypeButton from "../shared/typeButton";
import Inputs from "./inputs";

export interface IFormData {
  datetime: { value: string; template: string };
  order_num: { value: string; template: string };
  user: { value: string; template: string };
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

const initialData: IFormData = {
  datetime: {
    value: moment().tz("Europe/Kyiv").format("YYYY-MM-DDTHH:mm"),
    template: moment().tz("Europe/Kyiv").format("YYYY-MM-DDTHH:mm"),
  },
  order_num: { value: "", template: "12345" },
  user: { value: "", template: "Петров Іван Степанович" },
  tool: { value: "", template: "Болгарка INTERTOOL 230мм (DT-0290) 220В" },
  cost_delivery: { value: "", template: "300" },
  cost_rental: { value: "", template: "1000" },
  cost_deposit: { value: "", template: "500" },
  address: { value: "", template: "Вінниця, вул. Юності 10" },
  coords: { value: "", template: "https://maps.app.goo.gl/UTDh6coFXgzkz117A" },
  phone: { value: "", template: "0681234567" },
  comment: { value: "", template: "Тестовий коментар..." },
};

export interface IButtons {
  status: "process" | "completed";
  type: "contract" | "deposit" | "contract+deposit";
  deliveryType: "forward" | "back";
}

const Form = () => {
  const [inputValues, setInputValues] = useState<IFormData>(initialData);
  const [buttons, setButtons] = useState<IButtons>({
    status: "process",
    type: "contract",
    deliveryType: "forward",
  });

  const handleShowTemplate = () => {
    for (const node in initialData) {
      setInputValues((prev) => ({
        ...prev,
        [node]: {
          value: (initialData as IFormData)[node].template,
          template: (initialData as IFormData)[node].template,
        },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createOrder(inputValues, buttons);
    setInputValues(initialData);
  };

  return (
    <>
      <h1 className="text-center">Створити нову доставку</h1>
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
            type="button"
            className="flex flex-1 justify-center rounded-lg bg-blue-600 py-2 transition-colors hover:bg-blue-700"
            onClick={handleShowTemplate}
          >
            <LayoutTemplate />
          </button>
          <button
            type="submit"
            className="flex flex-[4] justify-center rounded-lg bg-green-600 py-2 transition-colors hover:bg-green-700"
          >
            <Plus />
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
