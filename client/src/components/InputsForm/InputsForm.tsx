import React from "react";
import { Link } from "react-router-dom";
import { signIn, register } from "../../api/auth/operations";
import { selectIsLoggedIn, selectUser } from "../../api/auth/selectors";
import { useAppDispatch, useAppSelector } from "../../api/hooks";

interface InputsFormProps {
  buttonText: string;
  formType: "login" | "register";
}
const InputsForm: React.FC<InputsFormProps> = ({ buttonText, formType }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const { email, password } = form.elements as any;

    console.log(email.value, password);
    
    if (formType === "login") {
      try {
        dispatch(signIn({ email: email.value, password: password.value }));

        console.log(user, isLoggedIn);
      } catch (error) {
        console.error(error);
      }
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
