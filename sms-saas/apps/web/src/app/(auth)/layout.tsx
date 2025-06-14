import React from "react";


export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <main className="h-full flex items-center justify-center">
        {children}
      </main>
  );
}
