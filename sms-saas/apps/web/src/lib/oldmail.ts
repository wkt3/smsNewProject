import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain=process.env.NEXT_PUBLIC_APP_URL

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Your Security 2FA Code is",
    html: `<p>Your 2FA Code is ${token}</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink =`${domain}/newPassword?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your Account Password",
    html: `<p> Click <a href=" ${resetLink} "> 👆HERE </a> to Reset your Account Password!🔁/p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink =`${domain}/newVerification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your Account Verification",
    html: `<p> Click <a href=" ${confirmLink} "> 👆 HERE </a> to Confirm your Account Verification ⏲⏳</p>`,
  });
};
