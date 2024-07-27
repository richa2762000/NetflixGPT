import useNowPlayingMovies from "../../hooks/useNowPlayingMovies";
import usePopularMovies from "../../hooks/usePopularMovies";
import useTopRatedMovies from "../../hooks/useTopRatedMovies";
import useUpcomingMovies from "../../hooks/useUpcomingMovies";
import Header from "../Header";
import MainContainer from "./MainContainer";
import SuggestionMovies from "./SuggestionMovies/SuggestionMovies";

const Browse = () => {
  // now i will dispatch my all movies into store
  // FEtch data from TMDB API and update store
  // we wil fetch our nowplaying and popular movies and we wil update our store
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  return (
    <>
      <Header />
      <MainContainer />
      <SuggestionMovies />
    </>
  );
};
export default Browse;
