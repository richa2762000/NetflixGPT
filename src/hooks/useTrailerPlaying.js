import { useCallback, useEffect } from "react";
import { API_OPTIONS } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/store/moviesSlice";

const useTrailerPlaying = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  const getMovieVideos = useCallback(async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json, "json");
    const filterData = json.results.filter((video) => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];
    // console.log(trailer, "trailer");
    dispatch(addTrailerVideo(trailer));
  }, [dispatch]);
  useEffect(() => {
    !trailerVideo && getMovieVideos();
  }, [getMovieVideos]);
};
export default useTrailerPlaying;
