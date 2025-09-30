import LogoMinimal from "@/components/LogoMinimal";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { sign } from "crypto";
import Image from "next/image";
import Link from "next/link";
import signature from "@/public/text";

export default function Home() {
  return (
    <>
      <main className="relative lg:min-h-dvh pb-10">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

        <header className="h-14 flex items-center backdrop-blur-2xl px-4">
          <div className="container mx-auto flex items-center justify-between gap-4">
            <LogoMinimal />

            <Link href={"/login"} className={buttonVariants()}>
              Get Started
            </Link>
          </div>
        </header>

        <div className="px-4">
          <div className="flex items-center justify-center mt-14 lg:mt-28 flex-col gap-4">
            <div className="text-2xl font-bold lg:text-5xl">
              Easy Invoicing, Happy Business
            </div>
            <p>We make if effortless so your business stays happy</p>
          </div>
        </div>

        <div className="flex w-full items-center justify-center mt-14 px-4">
          <Image
            src={"/dashboard.png"}
            alt="dashboard"
            width={1000}
            height={700}
            className="rounded shadow-2xl drop-shadow-2xl"
          />
        </div>
      </main>
      <footer className="bg-primary text-white flex justify-center items-center py-8">
        <p className="font-semibold text-lg">
          Made by{" "}
          <Link href={"/"} className="italic hover:underline cursor-pointer">
            <Image
              className="aspect-video h-20 border-2 border-dotted max-h-20 object-scale-down"
              src={signature}
              width={250}
              height={96}
              alt="Signature sign"
            />
          </Link>
        </p>
      </footer>
    </>
  );
}
