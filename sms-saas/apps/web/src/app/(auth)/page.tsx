import Image from "next/image";

export default function AuthHome() {
  return (
    <section className="flex h-full flex-col items-center justify-between p-10">
      <Image
        src="/images/appstore.png"
        alt="WKT3 Logo"
        width={100}
        height={100}
        className="mt-24"
      />
      <h1 className="text-4xl font-bold">Welcome to wkt3!</h1>
      <p className="mt-4 text-lg">
        This is a simple game where you can play with the WKT3 format.
      </p>
    </section>
  );
}
