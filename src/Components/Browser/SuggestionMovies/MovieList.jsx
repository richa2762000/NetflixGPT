import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-4 md:px-6 bg-black">
      <h1 className="text-2xl md:text-3xl py-2 md:py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll space-x-2 md:space-x-4">
        {movies?.map((movie) => (
          <div key={movie.id} className="flex-shrink-0">
            <MovieCard posterPath={movie.poster_path} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
