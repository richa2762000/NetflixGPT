import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  return (
    <header className="absolute w-full px-8 py-4 bg-gradient-to-b from-black z-10 flex justify-between items-center">
      <div>
        <img
          className="w-44"
          src="https://images.jifo.co/91235341_1696499245237.png"
          alt="logo"
        />
      </div>
      {user && (
        <div className="flex items-center space-x-4">
          <h2 className="text-white font-bold">{user.displayName}</h2>
          <button
            onClick={handleSignOut}
            className="text-white font-bold py-2 px-4 bg-red-500 rounded hover:bg-red-600 transition"
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
