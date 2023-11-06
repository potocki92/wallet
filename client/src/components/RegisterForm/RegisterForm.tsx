import React from "react";
import InputsForm from "../InputsForm/InputsForm";

const RegisterForm: React.FC = () => {
  return (
    <div>
      <InputsForm buttonText="Register" formType="register" />
    </div>
  );
};

export default RegisterForm;
