const VideoTitle = ({ title, overview }) => {
  return (
    <div className="relative z-10 text-white p-6 md:p-12">
      <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">{title}</h1>
      <p className="text-base md:text-lg mb-4 md:mb-6 w-full lg:w-1/2">{overview}</p>
      <div className="flex space-x-2 md:space-x-4">
        <button className="bg-red-600 text-white px-4 md:px-6 py-2 rounded-md shadow-md hover:bg-red-700 transition duration-300">
          Play
        </button>
        <button className="bg-gray-800 text-white px-4 md:px-6 py-2 rounded-md shadow-md hover:bg-gray-700 transition duration-300">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
