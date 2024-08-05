import Input from "@/components/form/input";
import clsx from "clsx";
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

const formInputNodes = [
  {
    icon: <IoTime className="absolute ml-2 text-2xl" />,
    placeholder: "Дата та година",
    name: "datetime",
    template: "_15.06 10:00",
  },
  {
    icon: <FaTableCells className="absolute ml-2 text-2xl" />,
    placeholder: "Замовлення та ПІБ",
    name: "order",
    template: "_Іванов Іван Іванович",
  },
  {
    icon: <FaTools className="absolute ml-2 text-2xl" />,
    placeholder: "Інструмент",
    name: "tool",
    template: "_Бетономешалка",
  },
  {
    icon: <FaLocationDot className="absolute ml-2 text-2xl" />,
    placeholder: "Адреса доставки",
    name: "address",
    template: "_Вінниця, вул. Юності 10",
  },
  {
    icon: <FaLocationCrosshairs className="absolute ml-2 text-2xl" />,
    placeholder: "Координати",
    name: "coords",
    template: "_https://maps.app.goo.gl/UTDh6coFXgzkz117A",
  },
  {
    icon: <FaDollarSign className="absolute ml-2 text-2xl" />,
    placeholder: "Вартість доставки",
    name: "cost",
    template: "_1000",
  },
  {
    icon: <FaSquarePhone className="absolute ml-2 text-2xl" />,
    placeholder: "Номер телефону",
    name: "phone",
    template: "_0680000000",
  },
  {
    icon: <FaCommentAlt className="absolute ml-2 text-2xl" />,
    placeholder: "Коментар",
    name: "comment",
    template: "_Отдать залог 2000, забрать за доставку 350грн",
  },
];

type Props = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
};

const Form = ({ handleSubmit, status, setStatus }: Props) => {
  const [inputValues, setInputValues] = useState(
    formInputNodes.reduce(
      (acc, node) => {
        acc[node.name] = "";
        return acc;
      },
      {} as Record<string, string>,
    ),
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string,
  ) => {
    setInputValues({ ...inputValues, [name]: e.target.value });
  };

  const handleShowTemplate = () => {
    const newInputValues = formInputNodes.reduce(
      (acc, node) => {
        acc[node.name] = node.template;
        return acc;
      },
      {} as Record<string, string>,
    );
    setInputValues(newInputValues);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 flex flex-col gap-4 bg-gray-800 p-4"
    >
      <div className="relative flex justify-evenly">
        <button
          type="button"
          className={clsx("rounded-md px-8 py-2", {
            "bg-green-700": status === "process",
            "bg-gray-600 hover:bg-gray-700": status !== "process",
          })}
          onClick={() => setStatus("process")}
        >
          Активный
        </button>
        <button
          type="button"
          className={clsx("rounded-md px-8 py-2", {
            "bg-green-700": status === "completed",
            "bg-gray-600 hover:bg-gray-700": status !== "completed",
          })}
          onClick={() => setStatus("completed")}
        >
          Завершенный
        </button>
      </div>

      {formInputNodes.map((node, i) => (
        <div key={i} className="relative flex items-center">
          {node.icon}
          <Input
            placeholder={node.placeholder}
            name={node.name}
            value={inputValues[node.name]}
            onChange={(e) => handleInputChange(e, node.name)}
          />
        </div>
      ))}

      <div className="flex justify-evenly">
        <button
          type="button"
          className="rounded-md bg-blue-700 px-8 py-2 hover:bg-blue-800"
          onClick={handleShowTemplate}
        >
          <HiTemplate className="text-2xl" />
        </button>
        <button
          type="submit"
          className="rounded-md bg-green-700 px-16 py-2 hover:bg-green-800"
        >
          <FaPlus className="text-2xl" />
        </button>
      </div>
    </form>
  );
};

export default Form;
