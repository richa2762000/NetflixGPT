export const checkValidData = (email, password, name) => {
  const isNameValid = /^[A-Za-z\s]+$/.test(name);
  const isEmailValid = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      password
    );
  if (!isNameValid) return "Name Can't be empty";

  if (!isEmailValid) return "Email ID is not valid";
  if (!isPasswordValid)
    return (
      <ul>
        <li>Minimum 8 characters in length</li>
        <li>At least one upper case letter</li>
        <li>At least one lower case letter</li>
        <li>At least one digit</li>
        <li>At least one special character or space</li>
      </ul>
    );

  return null;
};
