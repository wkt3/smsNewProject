"use client";
import React, { useCallback, useEffect, useState } from "react";
import CardWrapper from "./card-wrapper";
import { RiseLoader } from "react-spinners";
import { useRouter, useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import FormSuccess from "../form-success";
import FormError from "../form-error";

const NewVerificationForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing Token");
      return;
    }
    newVerification(token)
      .then((data) => {
        setError(data.error);
        router.push("/register")
        setSuccess(data.success);
        router.push("/login");
      })
      .catch(() => {
        setError("Something Went Wrong!❌❌❌");
      });
  }, [token]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSubmit();
    }, 500);
    return () => clearTimeout(timer);
  }, [onSubmit]);
  return (
    <CardWrapper
      headerLabel="Confirming your Verification"
      backButtonLabel="Back to Login"
      backButtonHref="/login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <RiseLoader />}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
