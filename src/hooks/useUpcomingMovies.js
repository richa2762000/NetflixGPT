import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addUpcomingMovies } from "../utils/store/moviesSlice";
import { useCallback, useEffect } from "react";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);

  const getUpcomingMovies = useCallback(async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json.results, "toprated");
    dispatch(addUpcomingMovies(json.results));
  }, [dispatch]);
  useEffect(() => {
    !upcomingMovies && getUpcomingMovies();
  }, [getUpcomingMovies]);
};
export default useUpcomingMovies;
