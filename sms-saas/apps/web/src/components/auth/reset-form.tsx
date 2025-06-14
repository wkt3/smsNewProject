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
import { ResetSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import Link from "next/link";
import { reset } from "@/actions/reset";

const ResetForm = () => {

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    //clear all error and success messages
    setError("");
    setSuccess("");
    // here these values comes from sever action/login
    //have to start transition for smooth ui and experience
    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error);
        //TODO:Add when we add confirmation sent
        setSuccess(data?.success);
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Forgot Password!👽"
      backButtonLabel="Back to Login"
      backButtonHref="/login"
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
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
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Reset Password Email
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

export default ResetForm;
