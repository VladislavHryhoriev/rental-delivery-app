import Input from "@/components/form/input";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { FaCommentAlt, FaDollarSign, FaTools } from "react-icons/fa";
import {
  FaLocationCrosshairs,
  FaLocationDot,
  FaSquarePhone,
} from "react-icons/fa6";
import { IoTime } from "react-icons/io5";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { IButtons, IInitialInputValues } from "./form";
import clsx from "clsx";

type Props = {
  buttons: IButtons;
  inputValues: IInitialInputValues;
  setInputValues: React.Dispatch<React.SetStateAction<IInitialInputValues>>;
};

const Inputs = ({ buttons, inputValues, setInputValues }: Props) => {
  return (
    <>
      <div className="flex flex-col gap-2 overflow-hidden rounded-md">
        <h2 className="text-center">Основна інформація</h2>
        <div className="relative flex items-center">
          <IoTime className="absolute ml-2 text-2xl" />
          <Input
            type="datetime-local"
            placeholder="Дата та час"
            name="datetime"
            value={inputValues.datetime.value}
            inputValues={inputValues}
            setInputValues={setInputValues}
          />
        </div>
        <div className="relative flex items-center">
          <AiOutlineFieldNumber className="absolute ml-2 text-2xl" />
          <Input
            placeholder="Номер замовлення"
            name="order_num"
            value={inputValues.order_num.value}
            inputValues={inputValues}
            setInputValues={setInputValues}
          />
        </div>
        <div className="relative flex items-center">
          <MdDriveFileRenameOutline className="absolute ml-2 text-2xl" />
          <Input
            placeholder="ПІБ"
            name="order"
            value={inputValues.order.value}
            inputValues={inputValues}
            setInputValues={setInputValues}
          />
        </div>
        <div className="relative flex items-center">
          <FaTools className="absolute ml-2 text-2xl" />
          <Input
            placeholder="Інструмент"
            name="tool"
            value={inputValues.tool.value}
            inputValues={inputValues}
            setInputValues={setInputValues}
          />
        </div>
        <div className="relative flex items-center">
          <FaLocationDot className="absolute ml-2 text-2xl" />
          <Input
            placeholder="Адреса доставки"
            name="address"
            value={inputValues.address.value}
            inputValues={inputValues}
            setInputValues={setInputValues}
          />
        </div>
        <div className="relative flex items-center">
          <FaLocationCrosshairs className="absolute ml-2 text-2xl" />
          <Input
            placeholder="Посилання на карту"
            name="coords"
            value={inputValues.coords.value}
            inputValues={inputValues}
            setInputValues={setInputValues}
          />
        </div>
        <div className="relative flex items-center">
          <FaSquarePhone className="absolute ml-2 text-2xl" />
          <Input
            placeholder="Номер телефону"
            name="phone"
            value={inputValues.phone.value}
            inputValues={inputValues}
            setInputValues={setInputValues}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 overflow-hidden rounded-md">
        <h2 className="text-center">Вартість</h2>
        <div className="relative flex items-center">
          <FaDollarSign className="absolute ml-2 text-2xl" />
          <Input
            placeholder="Вартість доставки"
            name="cost_delivery"
            value={inputValues.cost_delivery.value}
            inputValues={inputValues}
            setInputValues={setInputValues}
          />
        </div>
        <div className="relative flex items-center">
          <FaDollarSign className="absolute ml-2 text-2xl" />
          <Input
            placeholder="Вартість оренди"
            name="cost_rental"
            value={inputValues.cost_rental.value}
            inputValues={inputValues}
            setInputValues={setInputValues}
          />
        </div>

        <div
          className={clsx("relative flex items-center", {
            hidden: buttons.type === "contract",
          })}
        >
          <FaDollarSign className="absolute ml-2 text-2xl" />
          <Input
            placeholder={
              buttons.type === "contract+deposit"
                ? "Вартість часткового залогу"
                : "Вартість залогу"
            }
            name="cost_deposit"
            value={inputValues.cost_deposit.value}
            inputValues={inputValues}
            setInputValues={setInputValues}
          />
        </div>
      </div>

      <div className="relative flex overflow-hidden rounded-md">
        <FaCommentAlt className="absolute ml-2 mt-2 text-2xl" />
        <textarea
          className="w-full resize-none overflow-hidden bg-slate-600 px-4 py-2 text-center outline-none"
          rows={2}
          placeholder="Коментар"
          name="comment"
          value={inputValues.comment.value}
          onChange={({ target }) =>
            setInputValues((prev) => ({
              ...prev,
              comment: {
                value: target.value,
                template: inputValues.comment.template,
              },
            }))
          }
          // inputValues={inputValues}
          // setInputValues={setInputValues}
        />
      </div>
    </>
  );
};

export default Inputs;
