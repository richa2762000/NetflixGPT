const VideoTitle = ({ title, overview }) => {
  return (
    <div className="relative z-10 text-white p-12">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-lg mb-6 w-full lg:w-1/2">{overview}</p>
      <div className="flex space-x-4">
        <button className="bg-red-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-700 transition duration-300">
          Play
        </button>
        <button className="bg-gray-800 text-white px-6 py-2 rounded-md shadow-md hover:bg-gray-700 transition duration-300">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
