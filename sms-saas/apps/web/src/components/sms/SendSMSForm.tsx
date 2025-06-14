"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import debounce from "lodash.debounce";

const smsSchema = z.object({
  to: z.string().min(10, "Phone number is required").max(15),
  message: z.string().min(1, "Message cannot be empty").max(160),
});

type SMSFormValues = z.infer<typeof smsSchema>;

export default function SendSMSForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<SMSFormValues>({
    resolver: zodResolver(smsSchema),
    mode: "onChange",
  });

  const onSubmit = debounce((data: SMSFormValues) => {
    setError("");
    setSuccess(false);

    startTransition(async () => {
      const res = await fetch("/api/send-sms", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Failed to send SMS");
      } else {
        setSuccess(true);
        reset();
      }
    });
  }, 500);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto mt-8 p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-md"
    >
      <h2 className="text-xl font-bold">Send SMS</h2>

      <div>
        <Input
          placeholder="Mobile number (e.g., +918123456789)"
          {...register("to")}
        />
        {errors.to && (
          <p className="text-sm text-red-500">{errors.to.message}</p>
        )}
      </div>

      <div>
        <Textarea
          placeholder="Enter your message..."
          {...register("message")}
        />
        {errors.message && (
          <p className="text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Sending..." : "Send Message"}
      </Button>

      {success && (
        <p className="text-sm text-green-600 mt-2">✅ SMS sent successfully!</p>
      )}
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
    </form>
  );
}
