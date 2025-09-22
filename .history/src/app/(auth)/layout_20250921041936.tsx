// import { UnprotectedPage } from "@/components/CheckAuth";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex justify-center items-center flex-col min-h-dvh h-dvh overflow-auto relative p-4">
   <div class="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
     <div className="z-10 relative">
         {children}
     </div>
     {/* <UnprotectedPage/> */}
    </main>
  );
}
