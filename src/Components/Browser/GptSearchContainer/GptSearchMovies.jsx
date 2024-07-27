import { useState } from "react";
import { useSelector } from "react-redux";
import lang from "../../../utils/languageConstant";

const GptSearchMovies = () => {
  const [input, setInput] = useState("");
  const langKey = useSelector((store) => store.lang.langConfig);
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="mb-4 flex space-x-4">
            <input
              type="text"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder={lang[langKey].gptSearchPlaceholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {lang[langKey].search}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default GptSearchMovies;
