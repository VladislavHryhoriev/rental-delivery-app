import Input from "@/components/form/input";
import clsx from "clsx";
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

type Props = {
  buttons: IButtons;
  inputValues: IInitialInputValues;
  setInputValues: React.Dispatch<React.SetStateAction<IInitialInputValues>>;
};

const Inputs = ({ buttons, inputValues, setInputValues }: Props) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <h2 className="text-center text-lg font-medium text-gray-300">
            Основна інформація
          </h2>
          <div className="space-y-2">
            <div className="relative flex items-center">
              <IoTime className="absolute left-3 text-2xl text-gray-400" />
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
              <AiOutlineFieldNumber className="absolute left-3 text-2xl text-gray-400" />
              <Input
                placeholder="Номер замовлення"
                name="order_num"
                value={inputValues.order_num.value}
                inputValues={inputValues}
                setInputValues={setInputValues}
              />
            </div>
            <div className="relative flex items-center">
              <MdDriveFileRenameOutline className="absolute left-3 text-2xl text-gray-400" />
              <Input
                placeholder="ПІБ"
                name="user"
                value={inputValues.user.value}
                inputValues={inputValues}
                setInputValues={setInputValues}
              />
            </div>
            <div className="relative flex items-center">
              <FaTools className="absolute left-3 text-2xl text-gray-400" />
              <Input
                placeholder="Інструмент"
                name="tool"
                value={inputValues.tool.value}
                inputValues={inputValues}
                setInputValues={setInputValues}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-center text-lg font-medium text-gray-300">
            Адреса
          </h2>
          <div className="space-y-2">
            <div className="relative flex items-center">
              <FaLocationDot className="absolute left-3 text-2xl text-gray-400" />
              <Input
                placeholder="Адреса доставки"
                name="address"
                value={inputValues.address.value}
                inputValues={inputValues}
                setInputValues={setInputValues}
              />
            </div>
            <div className="relative flex items-center">
              <FaLocationCrosshairs className="absolute left-3 text-2xl text-gray-400" />
              <Input
                placeholder="Посилання на карту"
                name="coords"
                value={inputValues.coords.value}
                inputValues={inputValues}
                setInputValues={setInputValues}
              />
            </div>
            <div className="relative flex items-center">
              <FaSquarePhone className="absolute left-3 text-2xl text-gray-400" />
              <Input
                placeholder="Номер телефону"
                name="phone"
                value={inputValues.phone.value}
                inputValues={inputValues}
                setInputValues={setInputValues}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-center text-lg font-medium text-gray-300">
            Вартість
          </h2>
          <div className="space-y-2">
            <div className="relative flex items-center">
              <FaDollarSign className="absolute left-3 text-2xl text-gray-400" />
              <Input
                placeholder="Вартість доставки"
                name="cost_delivery"
                value={inputValues.cost_delivery.value}
                inputValues={inputValues}
                setInputValues={setInputValues}
              />
            </div>
            <div className="relative flex items-center">
              <FaDollarSign className="absolute left-3 text-2xl text-gray-400" />
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
              <FaDollarSign className="absolute left-3 text-2xl text-gray-400" />
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
        </div>

        <div className="relative space-y-2">
          <h2 className="text-center text-lg font-medium text-gray-300">
            Коментар
          </h2>
          <div className="relative">
            <FaCommentAlt className="absolute left-3 top-3 text-2xl text-gray-400" />
            <textarea
              className="w-full resize-none rounded-lg bg-gray-700 px-10 py-2 text-center outline-none transition-colors placeholder:text-gray-400 focus:bg-gray-600"
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
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Inputs;
