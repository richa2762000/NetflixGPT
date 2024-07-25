import useNowPlayingMovies from "../../hooks/useNowPlayingMovies";
import Header from "../Header";
import MainContainer from "./MainContainer";
import SuggestionMovies from "./SuggestionMovies";

const Browse = () => {
  // now i will dispatch my all movies into store
  // FEtch data from TMDB API and update store
  useNowPlayingMovies();
  return (
    <>
      <Header />
      <MainContainer/>
      <SuggestionMovies/>
    </>
  );
};
export default Browse;
