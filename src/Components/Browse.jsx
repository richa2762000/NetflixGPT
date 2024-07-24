import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import Header from "./Header";

const Browse = () => {
  // now i will dispatch my all movies into store
  // FEtch data from TMDB API and update store
  useNowPlayingMovies();
  return (
    <>
      <Header />
      
    </>
  );
};
export default Browse;
