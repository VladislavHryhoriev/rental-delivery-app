import clsx from "clsx";

type Props = {
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  activeStatus: string;
  text: string;
};

const StatusButton = ({ status, setStatus, activeStatus, text }: Props) => {
  return (
    <button
      type="button"
      className={clsx("w-full rounded-md px-4 py-2", {
        "bg-green-700": status === activeStatus,
        "bg-gray-700 hover:bg-gray-800 active:bg-gray-800":
          status !== activeStatus,
      })}
      onClick={() => setStatus(activeStatus)}
    >
      {text}
    </button>
  );
};

export default StatusButton;
