"use client";
import * as z from "zod";
import React, { useEffect, useState, useTransition } from "react";

import CardWrapper from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { LoginSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { login } from "@/actions/login";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { getUserByEmail } from "@/data/user";
import { EyeClosedIcon, EyeIcon } from "lucide-react";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already used with different Provider!"
      : "";
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  //watch fields
  const email = form.watch("email");
  const password = form.watch("password");
  const debouncedEmail = useDebounce(email, 1000);
  const debouncedPassword = useDebounce(password, 1000);

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    //clear all error and success messages
    setError("");
    setSuccess("");
    // here these values comes from sever action/login
    //have to start transition for smooth ui and experience
    startTransition(() => {
      //you can send debounced fields here
      console.log("Submitting with debounce: ", {
        email: debouncedEmail,
        password: debouncedPassword,
      });
      login(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Something Went Wrong❌❌❌"));
    });
  };
  useEffect(() => {
    if (!debouncedEmail) return;
    const checkEmail = async () => {
      const data = await getUserByEmail(debouncedEmail);
      console.log("email check", data);
    };
    checkEmail();
  }, [debouncedEmail]);
  return (
    <CardWrapper
      headerLabel="Welcome Back!😊"
      backButtonLabel="Don't have an Account"
      backButtonHref="/register"
      showSocial
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Auth</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "password" : "text"}
                          {...field}
                          disabled={isPending}
                          placeholder="********"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute top-2 right-3 text-gray-500"
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeClosedIcon size={18} />
                          ) : (
                            <EyeIcon size={18} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="johndoe@example.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            {...field}
                            disabled={isPending}
                            placeholder="********"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute top-2 right-3 text-gray-500"
                            tabIndex={-1}
                          >
                            {showPassword ? (
                              <EyeIcon size={18} />
                            ) : (
                              <EyeClosedIcon size={18} />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <div className="relative mb-2">
                        <Button
                          variant="link"
                          size="sm"
                          asChild
                          className="absolute px-0 font-normal float-left "
                        >
                          <Link href="/reset">Forgot Password</Link>
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            {showTwoFactor ? "Confirm" : "Login"}
          </Button>
        </form>
      </Form>
      <p className="text-xs mt-2">
        By creating an account you agree to the{" "}
        <Link className="font-bold underline" href="/terms-services">
          Terms of Service
        </Link>{" "}
        and our
        <Link className="font-bold underline" href="/privacy-policy">
          Privacy Policy
        </Link>{" "}
        . We'll occasionally send you emails about news, products, and services;
        you can opt-out anytime.
      </p>
    </CardWrapper>
  );
};
export default LoginForm;
