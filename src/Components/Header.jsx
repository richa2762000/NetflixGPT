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
  // we are using header in all the pages so thats why we are use here auth function

  useEffect(() => {
    // checking the auth every loads the page, to check the authentication and setting up our store

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in

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
        // User is signed out

        dispatch(removeUser());
        navigate("/");
      }
    });
    //  Unsubscribe when component unmounts

    return () => unsubscribe();
  }, []);

  const handleGptSearch = () => {
    // Toggle GPT Search
    // we will use store for this so we will create new slice for this.
    dispatch(toggleGptSearchView());
  };
  // lang change

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="absolute w-full px-4 py-4 bg-gradient-to-b from-black z-10 flex justify-between items-center lg:px-8 lg:py-6">
      <div>
        <img className="w-32 lg:w-44" src={headerLogo} alt="logo" />
      </div>
      <div>
        {user && (
          <div>
            <button className="text-white lg:hidden" onClick={toggleMenu}>
              ☰
            </button>

            <div
              className={`lg:flex ${
                menuOpen ? "flex" : "hidden"
              } flex-col items-center space-y-2 lg:flex-row lg:space-y-0 lg:space-x-4`}
            >
              <h2 className="text-white font-bold text-sm lg:text-base">
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
                className="py-2 px-3 bg-gray-900 text-white rounded hover:bg-gray-700 transition duration-300 lg:px-4"
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
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
