import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/store/userSlice";
import { headerLogo } from "../utils/constant";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

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
        const { uid, email, displayName,photoURL } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName,photoURL:photoURL }));
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
  return (
    <header className="absolute w-full px-8 py-4 bg-gradient-to-b from-black z-10 flex justify-between items-center">
      <div>
        <img className="w-44" src={headerLogo} alt="logo" />
      </div>
      {user && (
        <div className="flex items-center space-x-4">
          <h2 className="text-white font-bold">{user.displayName}{user.photoURL}</h2>
          <img src={user.photoURL} alt="loading"/>
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
