import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logIn, register } from "../../api/auth/operations";

const InputsForm = ({ buttonText, formType }) => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { email, password } = form.elements;

    if (formType === "login") {
      dispatch(logIn({ email: email.value, password: password.value }));
    } else if (formType === "register") {
      dispatch(
        register({
          email: email.value,
          password: password.value,
        })
      );
    }

    form.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:
          <input type="email" name="email" />
        </label>
        <label htmlFor="password">
          Password:
          <input type="password" name="password" />
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
