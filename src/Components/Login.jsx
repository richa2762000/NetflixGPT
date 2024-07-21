import { Link, useNavigate } from "react-router-dom";
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

const Login = () => {
  const navigate = useNavigate();
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
          // update profile logic

          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              // Profile updated!

              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
              navigate("/browse");
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
          console.log(user);
          navigate("/browse");
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
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f562aaf4-5dbb-4603-a32b-6ef6c2230136/dh0w8qv-9d8ee6b2-b41a-4681-ab9b-8a227560dc75.jpg/v1/fill/w_1192,h_670,q_70,strp/the_netflix_login_background__canada__2024___by_logofeveryt_dh0w8qv-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvZjU2MmFhZjQtNWRiYi00NjAzLWEzMmItNmVmNmMyMjMwMTM2XC9kaDB3OHF2LTlkOGVlNmIyLWI0MWEtNDY4MS1hYjliLThhMjI3NTYwZGM3NS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.LOYKSxIDqfPwWHR0SSJ-ugGQ6bECF0yO6Cmc0F26CQs"
            alt="background"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full max-w-sm p-12 bg-black text-white rounded shadow-lg relative z-10"
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
