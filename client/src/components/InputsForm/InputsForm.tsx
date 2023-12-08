import { FunctionComponent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { signIn, register } from "../../api/auth/operations";
import { useAppDispatch } from "../../api/hooks";
import Button from "../Button/Button";

interface InputsFormProps {
  buttonText: string;
  formType: "login" | "register";
}

const InputsForm: FunctionComponent<InputsFormProps> = (
  props: InputsFormProps
) => {
  const dispatch = useAppDispatch();

  const actionMap: Record<
    InputsFormProps["formType"],
    (email: string, password: string) => void
  > = {
    login: (email, password) => dispatch(signIn({ email, password })),
    register: (email, password) => dispatch(register({ email, password })),
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const { email, password } = form.elements as any;

    try {
      const performAction = actionMap[props.formType];
      if (performAction) {
        performAction(email.value, password.value);
      }
    } catch (error) {
      console.log(error);

      console.error(error);
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
        <div>
          <Button buttonText={props.buttonText} buttonColor="#24CCA7" borderColor="#24CCA7"/>
          {props.formType === "login" ? (
            <Button buttonText={"Register"} isLinkButton={true} link={"/register"}/>
            ) : (
                <Button buttonText={"Log In"} isLinkButton={true} link={"/"}/>
          )}
        </div>
      </form>
    </>
  );
};

export default InputsForm;
