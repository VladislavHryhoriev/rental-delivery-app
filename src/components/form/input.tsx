import { IFormData } from "./form";

type Props = {
  type?: string | "text";
  name: string;
  placeholder: string;
  value: string;
  inputValues: IFormData;
  setInputValues: React.Dispatch<React.SetStateAction<IFormData>>;
};

const Input = ({
  type = "text",
  name,
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
      className="block w-full rounded-lg bg-gray-800 px-10 py-3 text-center outline-none transition-colors placeholder:text-gray-400 focus:bg-gray-700/70"
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
