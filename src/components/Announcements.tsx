const Annonucements = () => {
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4">
        <div className="bg-smSkyLight p-4 rounded-md">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor sit</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2025-01-01
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Lorem ipsum dolor sit amet. Quo fugiat tempora ad ipsum quisquam et
            consequatur internos ut architecto...
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="bg-smPurpleLight p-4 rounded-md">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor sit</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2025-01-01
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Lorem ipsum dolor sit amet. Quo fugiat tempora ad ipsum quisquam et
            consequatur internos ut architecto...
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="bg-smYellowLight p-4 rounded-md">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor sit</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2025-01-01
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Lorem ipsum dolor sit amet. Quo fugiat tempora ad ipsum quisquam et
            consequatur internos ut architecto...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Annonucements;
