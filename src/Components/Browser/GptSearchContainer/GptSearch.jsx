import GptMovieSuggestion from "./GptMovieSuggestion";
import GptSearchMovies from "./GptSearchMovies";

const GptSearch = () => {
  return (
    <>
      <div className="">
        <GptSearchMovies />
        <GptMovieSuggestion />
      </div>
    </>
  );
};
export default GptSearch;
