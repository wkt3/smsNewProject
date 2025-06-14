"use server";
import * as z from "zod";

import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/nodemailer";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }
  //extract validated fields
  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  //check this email is not taken already
  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });
  //we have existing user means this email already taken
  if (existingUser) {
    return { error: "Email already taken by someOne😒📩😒" };
  }
  //not taken  create  this user with this particular email
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  //TODO:send verification token email
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation Email sent Successfully✅✅✅" };
};
