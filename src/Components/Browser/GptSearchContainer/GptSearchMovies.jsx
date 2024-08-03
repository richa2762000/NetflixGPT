import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../../../utils/languageConstant";
import openai from "../../../utils/openai";
import { API_OPTIONS, loginBgLogo } from "../../../utils/constant";
import { addGptMovieResults } from "../../../utils/store/gptSlice";

const GptSearchMovies = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const langKey = useSelector((store) => store.lang.langConfig);
  const searchText = useRef(null);
  //   search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };
  const handleGptSearch = async () => {
    console.log(searchText.current.value);
    // setInput("");
    // make an api call to gpt api and get movie results
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query:" +
      searchText.current.value +
      ". only give me names of 5 movies, comma separated like the example results given ahead. Example Results: Gadar, Kill, Pushpa2, Kalki, Dhamaal";
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    console.log(gptResults.choices?.[0]?.message?.content);
    const gptMovies = gptResults.choices
      ? gptResults.choices?.[0]?.message?.content.split(",")
      : "no movie found";
    //   for each movie i will search TMDB API
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    //  it will return promise not result because it async [Promise,Promise,Promise,Promise,Promise]
    const tmdbResults = await Promise.all(promiseArray);
    // promise.all -> it will wait for promisearray to get all the results

    // console.log(tmdbResults);
    dispatch(
      addGptMovieResults({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src={loginBgLogo}
            alt="background"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <form
          className="z-10 w-full max-w-md bg-black p-8 rounded-lg shadow-lg"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="mb-4 flex space-x-4">
            <input
              type="text"
              ref={searchText}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder={lang[langKey].gptSearchPlaceholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={handleGptSearch}
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
