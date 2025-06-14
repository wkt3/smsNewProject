import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const message = await db.msg.findUnique({
    where: { id: params.id },
  });

  if (!message || message.userId !== session.user.id) {
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
  }

  await db.msg.delete({ where: { id: params.id } });

  return NextResponse.json({ success: true });
}
