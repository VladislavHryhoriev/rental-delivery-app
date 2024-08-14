"use client";
import Input from "@/components/form/input";
import createOrder from "@/utils/api/create-order";
import moment from "moment-timezone";
import { useState } from "react";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { FaCommentAlt, FaDollarSign, FaPlus, FaTools } from "react-icons/fa";
import {
  FaLocationCrosshairs,
  FaLocationDot,
  FaSquarePhone,
} from "react-icons/fa6";
import { HiTemplate } from "react-icons/hi";
import { IoTime } from "react-icons/io5";
import { MdDriveFileRenameOutline } from "react-icons/md";
import DeliveryTypeButton from "./deliveryTypeButton";
import StatusButton from "./statusButton";
import TypeButton from "./typeButton";
import clsx from "clsx";

const formInputNodes = [
  {
    icon: <IoTime className="absolute ml-2 text-2xl" />,
    placeholder: "Дата та час",
    name: "datetime",
    type: "datetime-local",
  },
  {
    icon: <AiOutlineFieldNumber className="absolute ml-2 text-2xl" />,
    placeholder: "Номер замовлення",
    name: "order_num",
    type: "text",
  },
  {
    icon: <MdDriveFileRenameOutline className="absolute ml-2 text-2xl" />,
    placeholder: "ПІБ",
    name: "order",
    type: "text",
  },
  {
    icon: <FaTools className="absolute ml-2 text-2xl" />,
    placeholder: "Інструмент",
    name: "tool",
    type: "text",
  },
  {
    icon: <FaLocationDot className="absolute ml-2 text-2xl" />,
    placeholder: "Адреса доставки",
    name: "address",
    type: "text",
  },
  {
    icon: <FaLocationCrosshairs className="absolute ml-2 text-2xl" />,
    placeholder: "Посилання на карту",
    name: "coords",
    type: "text",
  },
  {
    icon: <FaDollarSign className="absolute ml-2 text-2xl" />,
    placeholder: "Вартість доставки",
    name: "cost_delivery",
    type: "text",
  },
  {
    icon: <FaDollarSign className="absolute ml-2 text-2xl" />,
    placeholder: "Вартість оренди",
    name: "cost_rental",
    type: "text",
  },
  {
    icon: <FaDollarSign className="absolute ml-2 text-2xl" />,
    placeholder: "Вартість залогу",
    name: "cost_deposit",
    type: "text",
  },
  {
    icon: <FaSquarePhone className="absolute ml-2 text-2xl" />,
    placeholder: "Номер телефону",
    name: "phone",
    type: "text",
  },
  {
    icon: <FaCommentAlt className="absolute ml-2 text-2xl" />,
    placeholder: "Коментар",
    name: "comment",
    type: "text",
  },
];

interface IInitialInputValues {
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
  type: string;
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: { value, template: inputValues[name].template },
    }));
  };

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

      {formInputNodes.map((node, i) => (
        <div
          key={i}
          className={clsx("flex items-center", {
            hidden: buttons.type === "contract" && node.name === "cost_deposit",
          })}
        >
          {node.icon}
          <Input
            type={node.type}
            placeholder={node.placeholder}
            name={node.name}
            value={(inputValues as any)[node.name].value}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
      ))}

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
