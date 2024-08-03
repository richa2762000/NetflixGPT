import { useSelector } from "react-redux";
import { youtubeEmbed } from "../../utils/constant";
import useTrailerPlaying from "../../hooks/useTrailerPlaying";

const VideoBackground = ({ movieId }) => {
  // fetching trailer video and updating the store with trailer video data.

  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  useTrailerPlaying(movieId);

  return (
    <div className="absolute inset-0 z-0">
      <iframe
        className="w-full h-full object-cover"
        src={youtubeEmbed + trailerVideo?.key + "?&autoplay=1&mute=1"}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
