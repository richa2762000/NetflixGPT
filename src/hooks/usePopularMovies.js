import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { useCallback, useEffect } from "react";
import { addPopularMovies } from "../utils/store/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movies.popularMovies);
  const getPopularMovies = useCallback(async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json.results, "popular");
    dispatch(addPopularMovies(json.results));
  }, [dispatch]); // Dependency array with dispatch

  useEffect(() => {
    !popularMovies && getPopularMovies();
  }, [getPopularMovies]); // Dependency array with getPopularMovies
};

export default usePopularMovies;

// useEffect hook correctly runs when the dependencies change, you should include getPopularMovies in the dependency array. Since getPopularMovies is an async function defined within the component, you can use the useCallback hook to memoize it. Here’s how you can update your usePopularMovies hook:
