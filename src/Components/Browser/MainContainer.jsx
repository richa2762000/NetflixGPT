import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  // Fetching data from the store
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (movies === null) return null;
  const mainMovie = movies[0];
  const { original_title, overview, id } = mainMovie;

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black">
      <VideoBackground movieId={id} />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <VideoTitle title={original_title} overview={overview} />
      </div>
    </div>
  );
};

export default MainContainer;
