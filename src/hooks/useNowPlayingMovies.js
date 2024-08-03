import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addNowPlayingMovies } from "../utils/store/moviesSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );
  const getNowPlayingMovies = useCallback(async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    console.log(json.results);
    dispatch(addNowPlayingMovies(json.results));
  },[dispatch]);
  // for api call
  useEffect(() => {
    // if in my nowplayingmovies dont have any data so then it will called -> thats is memoization
    !nowPlayingMovies && getNowPlayingMovies();
  }, [getNowPlayingMovies]);
};
export default useNowPlayingMovies;
