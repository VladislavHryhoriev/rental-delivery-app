const Empty = ({ title }: { title: string }) => {
  return (
    <div className="flex h-[50vh] items-center justify-center text-center text-xl text-gray-400">
      {title}
    </div>
  );
};

export default Empty;
