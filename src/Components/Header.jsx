import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addUser, removeUser } from "../utils/store/userSlice";
import { SUPPORTED_LANGUAUES, headerLogo } from "../utils/constant";
import { toggleGptSearchView } from "../utils/store/gptSlice";
import { changeLanguage } from "../utils/store/langSlice";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleGptSearch = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="relative w-full px-4 py-4 bg-gradient-to-b from-black z-10 flex justify-between items-center lg:px-8 lg:py-6">
      <div>
        <img className="w-32 lg:w-44" src={headerLogo} alt="logo" />
      </div>
      <div className="lg:hidden">
        <button
          className="text-white text-2xl"
          onClick={toggleMenu}
        >
          ☰
        </button>
      </div>
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 lg:bg-transparent lg:static lg:h-auto lg:flex lg:items-center lg:justify-between lg:w-auto lg:bg-gradient-to-b from-black ${
          menuOpen ? "flex" : "hidden"
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:space-x-4 p-4 lg:p-0">
          {user && (
            <>
              <h2 className="text-white font-bold text-sm lg:text-base mb-4 lg:mb-0">
                {user.displayName}
              </h2>
              {showGptSearch && (
                <select
                  className="p-2 m-2 bg-gray-900 text-white rounded lg:p-3"
                  onChange={handleLanguageChange}
                >
                  {SUPPORTED_LANGUAUES.map((lang) => (
                    <option key={lang.identifier} value={lang.identifier}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              )}
              <button
                className="py-2 px-3 bg-gray-900 text-white rounded hover:bg-gray-700 transition duration-300 lg:px-4 mb-4 lg:mb-0"
                onClick={handleGptSearch}
              >
                {showGptSearch ? "HomePage" : "GPT Search"}
              </button>
              <button
                onClick={handleSignOut}
                className="text-white font-bold py-2 px-3 bg-red-500 rounded hover:bg-red-600 transition duration-300 lg:px-4"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
