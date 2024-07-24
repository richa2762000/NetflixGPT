import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

const useLogin = () => {
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
              // setSnackbarMessage("Login successful!");
              // setOpenSnackbar(true);
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
              // setSnackbarMessage("Login failed. Please try again.");
              // setOpenSnackbar(true);
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
          // setSnackbarMessage("Login successful!");
          // setOpenSnackbar(true);
        })
        .catch((error) => {
          setErrorMessage(error.code + "-" + error.message);
          // setSnackbarMessage("Login failed. Please try again.");
          // setOpenSnackbar(true);
        });
    }
  };

  // for close the snackbar
  // const handleCloseSnackbar = () => {
  //   setOpenSnackbar(false);
  // };
};
export default useLogin;
