import { ProtectedPage } from "@/components/CheckAuth";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
                    <DashboardSideba/>

      <main className="w-full relative">
        {children}
        <ProtectedPage />
      </main>
    </SidebarProvider>
  );
}
