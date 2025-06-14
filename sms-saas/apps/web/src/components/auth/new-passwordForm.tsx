"use client";
import * as z from "zod";
import React, { useState, useTransition } from "react";

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
import { Button } from "../ui/button";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import Link from "next/link";
import { NewPasswordSchema } from "@/schemas";
import { useRouter, useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/new-password";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { Input } from "../ui/input";

const NewPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    //clear all error and success messages
    setError("");
    setSuccess("");
    // here these values comes from sever action/login
    //have to start transition for smooth ui and experience
    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        //TODO:Add when we add confirmation sent
        setSuccess(data?.success);
        router.push("/login");
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Enter New Password!👽"
      backButtonLabel="Back to Login"
      backButtonHref="/login"
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Reset Password
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

export default NewPasswordForm;
