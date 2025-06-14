import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const smsSchema = z.object({
  to: z.string().min(10).max(15),
  message: z.string().min(1).max(160),
});

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = smsSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const { to, message } = parsed.data;

  // Save to DB
  const saved = await db.msg.create({
    data: {
      userId: session.user.id,
      to,
      content: message,
    },
  });

  try {
    const res = await fetch("http://localhost:5000/send-sms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, message }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to send via microservice" },
        { status: 500 }
      );
    }
  } catch (e) {
    return NextResponse.json(
      { error: "SMS microservice unreachable" },
      { status: 500 }
    );
  }
  

  return NextResponse.json({ success: true, saved });
}
