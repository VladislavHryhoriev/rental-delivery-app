import { BeatLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <BeatLoader color="#4ade80" />
        <span className="text-gray-400">Завантаження...</span>
      </div>
    </div>
  );
};

export default Loader;
