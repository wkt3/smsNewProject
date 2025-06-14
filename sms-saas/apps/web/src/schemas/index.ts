import * as z from "zod";
import { UserRole } from "@prisma/client";

// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);


export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(1)),
    newPassword: z
      .string()
      .min(8, { message: "Must have at least 8 character eg:= Capital3*" })
      .regex(passwordValidation, {
        message:
          "Required lowerCase, UpperCase, Number, Special-Character with 8 characters",
      }),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "New Password Required",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "Password Required",
      path: ["password"],
    }
  );

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(1, { message: "Must have at least 1 character" })
    .regex(passwordValidation, {
      message: "Required lowerCase UpperCase Number Special-Character",
    }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email Required!",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email Required!",
  }),
  password: z.string().min(1, {
    message: "Password Required!",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email Required!",
  }),
  name: z
    .string()
    .min(2, {
      message: "Minimum 2 Characters Required!",
    })
    .max(25, {
      message: "Maximum 25 characters allowed for name",
    }),
  password: z
    .string()
    .min(8, { message: "Must have at least 8 character eg:= Capital3*" })
    .regex(passwordValidation, {
      message:
        "Minimum 8 Characters Required(1.lowerCase, 1.UpperCase, 1.Number, 1.Special-Character) for eg:- John_123*#",
    }),
});
