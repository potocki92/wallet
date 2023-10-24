import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logIn, register } from "../../api/auth/operations";
import {
  selectIsLoggedIn,
  selectUser,
} from "../../api/auth/selectors";

const InputsForm = ({ buttonText, formType }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { email, password } = form.elements;

    if (formType === "login") {
      dispatch(logIn({ email: email.value, password: password.value }));

      console.log(user, isLoggedIn);
    } else if (formType === "register") {
      dispatch(
        register({
          email: email.value,
          password: password.value,
        })
      );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:
          <input type="email" name="email" id="email" />
        </label>
        <label htmlFor="password">
          Password:
          <input type="password" name="password" id="password" />
        </label>
        <button type="submit">{buttonText}</button>
        {formType === "login" ? (
          <span>
            Don't have an account?<Link to={"/register"}>SignUp</Link>
          </span>
        ) : (
          <span>
            Do you have an account? <Link to={"/login"}>SignIn</Link>
          </span>
        )}
      </form>
    </>
  );
};

export default InputsForm;
