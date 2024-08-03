import { useDispatch } from "react-redux";

const useGptSearchMovies = ()=>{
    const dispatch = useDispatch();
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
  
}
export default useGptSearchMovies;