import { IMG_CDN_URL } from "../../../utils/constant";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="w-36 h-52 md:w-48 md:h-72 lg:w-64 lg:h-96 bg-gray-800 rounded-lg overflow-hidden">
      <img
        alt="Movie Poster"
        src={IMG_CDN_URL + posterPath}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default MovieCard;
