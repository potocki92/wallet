import { Link } from "react-router-dom";

type ButtonProps = {
  buttonText: string;
  isLinkButton?: boolean | false;
  link?: string;
} & (TransparentBorderColor | BorderColor);

type TransparentBorderColor = {
  buttonColor?: "transparent";
  borderColor?: "#4A56E2";
};

type BorderColor = {
    buttonColor?: string;
    borderColor?: string;
}
const Button = (props: ButtonProps) => {
  return (
    <>
      <button
        className={`bg-[${props.buttonColor}] rounded-[20px] border border-[${props.borderColor}] max-w-[300px] w-full h-[50px]`}
        type="submit"
      >
        {props.isLinkButton ? (
          <Link to={props.link || ""}>{props.buttonText}</Link>
        ) : (
          props.buttonText
        )}
      </button>
    </>
  );
};

export default Button;
