import { IMG_CDN_URL } from "../../../utils/constant";

const MovieCard = ({ posterPath }) => {
  return (
    <div className="w-48 h-72 md:w-64 md:h-96 lg:w-72 lg:h-108 bg-gray-800 rounded-lg overflow-hidden">
      <img
        alt="Movie Poster"
        src={IMG_CDN_URL + posterPath}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default MovieCard;
