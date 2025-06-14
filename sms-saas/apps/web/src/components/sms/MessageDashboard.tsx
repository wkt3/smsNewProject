"use client";

import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Message = {
  id: string;
  to: string;
  content: string;
  createdAt: string;
};

export default function MessageDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isPending, startTransition] = useTransition();

  const fetchMessages = async () => {
    const res = await fetch("/api/messages");
    const data = await res.json();
    setMessages(data.messages || []);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    startTransition(async () => {
      await fetch(`/api/messages/${id}`, { method: "DELETE" });
      fetchMessages(); // refresh
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📄 Sent Messages</h1>

      {messages.length === 0 && (
        <p className="text-zinc-500">No messages sent yet.</p>
      )}

      <div className="space-y-4">
        {messages.map((msg) => (
          <Card key={msg.id} className="bg-white dark:bg-zinc-900">
            <CardContent className="p-4 space-y-2">
              <p>
                <strong>To:</strong> {msg.to}
              </p>
              <p>
                <strong>Message:</strong> {msg.content}
              </p>
              <p className="text-sm text-zinc-500">
                Sent: {new Date(msg.createdAt).toLocaleString()}
              </p>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(msg.id)}
                disabled={isPending}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
