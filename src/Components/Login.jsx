import { Link } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(false);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
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
        <form className="absolute top-1/2 left-1/2 w-full max-w-sm p-12 bg-black text-white rounded shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            {!isSignInForm ? "Sign In" : "Sign Up"}
          </h2>
          {isSignInForm && (
            <input
              type="text"
              placeholder="Full Name"
              className="block w-full p-2 mb-4 bg-gray-800 border border-gray-600 rounded text-white"
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            className="block w-full p-2 mb-4 bg-gray-800 border border-gray-600 rounded text-white"
          />
          <input
            type="password"
            placeholder="Password"
            className="block w-full p-2 mb-4 bg-gray-800 border border-gray-600 rounded text-white"
          />
          {isSignInForm && (
            <input
              type="number"
              placeholder="+91 -"
              className="block w-full p-2 mb-4 bg-gray-800 border border-gray-600 rounded text-white"
            />
          )}
          {!isSignInForm && (
            <div className="flex items-center mb-4">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-gray-400">
                Remember Me
              </label>
            </div>
          )}
          <button className="w-full py-2 bg-red-500 rounded text-white">
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
