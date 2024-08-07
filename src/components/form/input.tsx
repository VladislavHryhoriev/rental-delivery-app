type Props = {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ type, name, placeholder, value, onChange }: Props) => {
  return (
    <input
      className="block w-full bg-slate-600 px-4 py-2 text-center outline-none"
      type={type}
      name={name}
      placeholder={placeholder}
      required
      autoComplete="off"
      onChange={(e) => onChange(e)}
      value={value}
    />
  );
};

export default Input;
