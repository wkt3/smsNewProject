import React from "react";
import CardWrapper from "./card-wrapper";
import { BsExclamationTriangleFill } from "react-icons/bs";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops!! Something Went Wrong!!"
      backButtonLabel="Back To Sign-In"
      backButtonHref="/login"
    >
      <div className="flex flex-col items-center justify-center ">
        <BsExclamationTriangleFill className="w-20 h-20 text-orange-400" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
