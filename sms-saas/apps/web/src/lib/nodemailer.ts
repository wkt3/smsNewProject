"use server";
import nodemailer from "nodemailer";
import Two2FACode from "@/components/email/Two2FACode";

const domain = process.env.NEXT_PUBLIC_APP_URL;

const SMTP_SERVER_HOST = process.env.EMAIL_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.EMAIL_SERVER_USER;
const SMTP_SERVER_PASSWORD = process.env.EMAIL_SERVER_PASSWORD;
const SITE_MAIL_RECIEVER = process.env.EMAIL_MAIL_RECIEVER;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: SMTP_SERVER_HOST,
  port: 587,
  secure: true,
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD,
  },
});

export async function sendMail({
  email,
  sendTo,
  subject,
  text,
  html,
}: {
  email: string;
  sendTo?: string;
  subject: string;
  text: string;
  html?: string;
}) {
  try {
    const isVerified = await transporter.verify();
    console.log(isVerified);
  } catch (error) {
    console.error(
      "Something Went Wrong",
      SMTP_SERVER_USERNAME,
      SMTP_SERVER_PASSWORD,
      error
    );
    return;
  }
  const info = await transporter.sendMail({
    from: email,
    to: sendTo || SITE_MAIL_RECIEVER,
    subject: subject,
    text: text,
    html: html ? html : "",
  });
  console.log("Message Sent", info.messageId);
  console.log("Mail sent to", sendTo);
  return info;
}

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const twoFactor = await transporter.sendMail({
    from: email,
    to: email || SITE_MAIL_RECIEVER,
    subject: "Your Security 2FA Code is",
    html: `<p>Your 2FA Code is ${token}</p>`,
  });
  console.log("Message Sent", twoFactor.messageId);
  console.log("Mail sent to", email);
  return twoFactor;
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/newPassword?token=${token}`;

  const resetPass = await transporter.sendMail({
    from: email,
    to: email || SITE_MAIL_RECIEVER,
    subject: "Reset your Account Password",
    html: `<p> Click <a href=" ${resetLink} "> Here👆Reset Password🗝️🧾✅ </a> to Reset your Account Password!🔁/p>`,
  });
  console.log("Message Sent", resetPass.messageId);
  console.log("Mail sent to", email);
  return resetPass;
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/newVerification?token=${token}`;

  const veriEmail = await transporter.sendMail({
    from: email,
    to: email || SITE_MAIL_RECIEVER,
    subject: "Confirm your Account Verification",
    html: `<p> Click <a href=" ${confirmLink} "> 👆 HERE </a> to Confirm your Account Verification ⏲⏳</p>`,
  });
  console.log("Message Sent", veriEmail.messageId);
  console.log("Mail sent to", email);
  return veriEmail;
};
