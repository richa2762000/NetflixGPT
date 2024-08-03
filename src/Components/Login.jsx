import { Link } from "react-router-dom";
import Header from "./Header";
import { useRef, useState } from "react";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/store/userSlice";
import { headerUserLogo, loginBgLogo } from "../utils/constant";

const Login = () => {
  const dispatch = useDispatch();

  const [emails, setEmails] = useState("");
  const [passwords, setPasswords] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  // handle signIn/ signUp Form

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setEmails("");
    setFullName("");
    setPasswords("");
    setPhone();
    setErrorMessage("");
  };
  // handle validation the form data

  const handleButton = () => {
    let message = null;
    if (!isSignInForm) {
      message = checkValidData(
        email.current.value,
        password.current.value,
        name.current.value
      );
    } else {
      message = checkValidData(
        email.current.value,
        password.current.value,
        null
      );
    }
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // sign up logic

      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up

          const user = userCredential.user;
          // update profile logic

          updateProfile(user, {
            displayName: name.current.value,
            photoURL: headerUserLogo,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          setErrorMessage(error.code + "-" + error.message);
        });
    } else {
      // sign in logic

      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in

          const user = userCredential.user;
        })
        .catch((error) => {
          setErrorMessage(error.code + "-" + error.message);
        });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 relative">
        <Header />
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src={loginBgLogo}
            alt="background"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full max-w-sm p-12 bg-black text-white rounded shadow-lg relative z-10 opacity-70"
          >
            <h2 className="text-xl font-semibold mb-4">
              {!isSignInForm ? "Sign Up" : "Sign In"}
            </h2>
            {!isSignInForm && (
              <input
                type="text"
                ref={name}
                placeholder="Full Name"
                value={fullName}
                className="block w-full p-2 mb-4 bg-gray-800 border border-gray-600 rounded text-white"
                onChange={(e) => setFullName(e.target.value)}
              />
            )}
            <input
              type="text"
              ref={email}
              placeholder="Email Address"
              value={emails}
              className="block w-full p-2 mb-4 bg-gray-800 border border-gray-600 rounded text-white"
              onChange={(e) => setEmails(e.target.value)}
            />
            <input
              type="password"
              ref={password}
              placeholder="Password"
              value={passwords}
              className="block w-full p-2 mb-4 bg-gray-800 border border-gray-600 rounded text-white"
              onChange={(e) => setPasswords(e.target.value)}
            />
            {!isSignInForm && (
              <input
                type="text"
                placeholder="+91 -"
                value={phone}
                className="block w-full p-2 mb-4 bg-gray-800 border border-gray-600 rounded text-white"
                onChange={(e) => setPhone(e.target.value)}
              />
            )}
            <p className="text-red-600">{errorMessage}</p>
            {isSignInForm && (
              <div className="flex items-center mb-4">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-gray-400">
                  Remember Me
                </label>
              </div>
            )}
            <button
              className="cursor-pointer w-full py-2 bg-red-500 rounded text-white hover:bg-red-600 transition"
              onClick={handleButton}
            >
              {!isSignInForm ? "Sign Up" : "Sign In"}
            </button>
            {isSignInForm && (
              <div className="mt-4">
                <label className="block text-gray-400">
                  <Link to="/forgot-password">Forgot password?</Link>
                </label>
              </div>
            )}
            <div className="mt-4 text-gray-400">
              <label
                onClick={toggleSignInForm}
                className="text-blue-400 hover:underline cursor-pointer"
              >
                {isSignInForm
                  ? "New to Netflix? Sign Up Now."
                  : "Already Registered? Sign In Now"}
              </label>
            </div>
            {isSignInForm && (
              <div className="mt-4 text-gray-400">
                <label>
                  This page is protected by Google reCAPTCHA to ensure you're
                  not a bot.
                </label>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
