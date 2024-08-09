import { MdEdit } from "react-icons/md";

const EditButton = () => {
  return (
    <button className="rounded-md bg-red-800 px-4 py-2 active:bg-red-900">
      <MdEdit />
    </button>
  );
};

export default EditButton;
