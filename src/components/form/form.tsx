"use client";
import Input from "@/components/form/input";
import createOrder from "@/utils/api/create-order";
import moment from "moment-timezone";
import { useState } from "react";
import { FaCommentAlt, FaDollarSign, FaPlus, FaTools } from "react-icons/fa";
import {
  FaLocationCrosshairs,
  FaLocationDot,
  FaSquarePhone,
  FaTableCells,
} from "react-icons/fa6";
import { HiTemplate } from "react-icons/hi";
import { IoTime } from "react-icons/io5";
import DeliveryTypeButton from "./deliveryTypeButton";
import StatusButton from "./statusButton";

const formInputNodes = [
  {
    icon: <IoTime className="absolute ml-2 text-2xl" />,
    placeholder: "Дата та час",
    name: "datetime",
    type: "datetime-local",
  },
  {
    icon: <FaTableCells className="absolute ml-2 text-2xl" />,
    placeholder: "Замовлення та ПІБ",
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
    placeholder: "Координати",
    name: "coords",
    type: "text",
  },
  {
    icon: <FaDollarSign className="absolute ml-2 text-2xl" />,
    placeholder: "Вартість доставки",
    name: "cost",
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
    template: "2024-12-31T10:00",
  },
  order: { value: "", template: "_Іванов Іван Іванович" },
  tool: { value: "", template: "_Бетономешалка" },
  cost: { value: "", template: "_1000" },
  address: { value: "", template: "_Вінниця, вул. Юності 10" },
  coords: { value: "", template: "_https://maps.app.goo.gl/UTDh6coFXgzkz117A" },
  phone: { value: "", template: "_0681234567" },
  comment: { value: "", template: "_Залог 2000, забрать за доставку 350грн" },
};

const Form = () => {
  const [status, setStatus] = useState("process");
  const [deliveryType, setDeliveryType] = useState("contract");
  const [inputValues, setInputValues] =
    useState<IInitialInputValues>(initialInputValues);

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
    await createOrder(e, status, deliveryType);
    setInputValues(initialInputValues);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 flex flex-col gap-4 bg-gray-800 p-4"
    >
      {formInputNodes.map((node, i) => (
        <div key={i} className="relative flex items-center">
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

      <div className="relative flex gap-2 bg-slate-600 p-2">
        <StatusButton
          status={status}
          setStatus={setStatus}
          activeStatus="process"
          text="Активний"
        />
        <StatusButton
          status={status}
          setStatus={setStatus}
          activeStatus="completed"
          text="Завершений"
        />
      </div>

      <div className="relative bg-slate-600 p-2">
        <div className="mb-2 flex gap-2">
          <DeliveryTypeButton
            deliveryType={deliveryType}
            setDeliveryType={setDeliveryType}
            activedeliveryType="contract"
            text="Договір"
          />
          <DeliveryTypeButton
            deliveryType={deliveryType}
            setDeliveryType={setDeliveryType}
            activedeliveryType="deposit"
            text="Залог"
          />
        </div>
        <DeliveryTypeButton
          deliveryType={deliveryType}
          setDeliveryType={setDeliveryType}
          activedeliveryType="contract+deposit"
          text="Договір + Залог"
        />
      </div>

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
