import { MdEdit } from "react-icons/md";

const SetToEditButton = () => {
  return (
    <button
      title="Редактировать"
      className="rounded-e-md bg-red-800 px-4 py-2 active:bg-red-900"
    >
      <MdEdit />
    </button>
  );
};

export default SetToEditButton;
