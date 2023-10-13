import React from "react";
import { Link } from "react-router-dom";

const InputsForm = ({
  buttonText,
  formType,
}: {
  buttonText: string;
  formType: string;
}) => {
  return (
    <>
      <form>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
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
