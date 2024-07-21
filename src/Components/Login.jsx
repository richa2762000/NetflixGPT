import { Link } from "react-router-dom";
import Header from "./Header";
import { useRef, useState } from "react";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
const Login = () => {
  const [emails, setEmails] = useState("");
  const [passwords, setPasswords] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState();
  const [isSignInForm, setIsSignInForm] = useState(false);
  const email = useRef(null);
  const password = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
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
    // console.log(email.current.value,password.current.value)
    const message = checkValidData(email.current.value, password.current.value);
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
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // sign in logic
    }
  };
  return (
    <>
      <div className=" min-h-screen  bg-gray-100">
        <Header />
        <div className="absolute w-full">
          <img
            className="w-full"
            src="https://pics.craiyon.com/2023-10-06/af443785af7b47f7b2b813985f840805.webp"
            alt="logo"
          />
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="absolute top-1/2 left-1/2 w-full max-w-sm p-12 bg-black text-white rounded shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4">
            {!isSignInForm ? "Sign In" : "Sign Up"}
          </h2>
          {isSignInForm && (
            <input
              type="text"
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
            type="text"
            ref={password}
            placeholder="Password"
            value={passwords}
            className="block w-full p-2 mb-4 bg-gray-800 border border-gray-600 rounded text-white"
            onChange={(e) => setPasswords(e.target.value)}
          />
          {isSignInForm && (
            <input
              type="text"
              placeholder="+91 -"
              value={phone}
              className="block w-full p-2 mb-4 bg-gray-800 border border-gray-600 rounded text-white"
              onChange={(e) => setPhone(e.target.value)}
            />
          )}
          <p className="text-red-600">{errorMessage}</p>

          {!isSignInForm && (
            <div className="flex items-center mb-4">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-gray-400">
                Remember Me
              </label>
            </div>
          )}
          <button
            className="cursor-pointer w-full py-2 bg-red-500 rounded text-white"
            onClick={handleButton}
          >
            {!isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          {!isSignInForm && (
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
              {!isSignInForm
                ? "New to Netflix? Sign Up Now."
                : "Already Registerd ? Sign In Now"}
            </label>
          </div>
          {!isSignInForm && (
            <div className="mt-4 text-gray-400">
              <label>
                This page is protected by Google reCAPTCHA to ensure you're not
                a bot.
              </label>
            </div>
          )}
        </form>
      </div>
    </>
  );
};
export default Login;
