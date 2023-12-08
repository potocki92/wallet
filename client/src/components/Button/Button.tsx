import { Link } from "react-router-dom";

type ButtonProps = {
  buttonText: string;
  isLinkButton?: boolean | false;
  link?: string;
  buttonColor?: string;
};
const Button = ({
  buttonColor = "transparent",
  isLinkButton,
  link,
  buttonText,
}: ButtonProps) => {
  const borderColor = buttonColor === "transparent" ? "#4A56E2" : buttonColor;
  return (
    <>
      {isLinkButton ? (
        <Link to={link || ""}>
          <button
            className={`bg-[${buttonColor}] rounded-[20px] border border-[${borderColor}] max-w-[300px] w-full h-[50px]`}
            type="submit"
          >
            {buttonText}
          </button>
        </Link>
      ) : (
        <button
          className={`bg-[${buttonColor}] rounded-[20px] border border-[${borderColor}] max-w-[300px] w-full h-[50px]`}
          type="submit"
        >
          {buttonText}
        </button>
      )}
    </>
  );
};

export default Button;
