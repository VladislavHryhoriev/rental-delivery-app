import { IInitialInputValues } from "./form";

type Props = {
  className?: string;
  type?: string | "text";
  name: string;
  placeholder: string;
  value: string;
  inputValues: IInitialInputValues;
  setInputValues: React.Dispatch<React.SetStateAction<IInitialInputValues>>;
};

const Input = ({
  className,
  type,
  name = "text",
  placeholder,
  value,
  inputValues,
  setInputValues,
}: Props) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: { value, template: (inputValues as any)[name].template },
    }));
  };

  return (
    <input
      className={`block w-full bg-slate-600 px-4 py-2 text-center outline-none ${className}`}
      type={type}
      name={name}
      placeholder={placeholder}
      required
      autoComplete="off"
      onChange={handleInputChange}
      value={value}
    />
  );
};

export default Input;
