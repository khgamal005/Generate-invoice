import { ProtectedPage } from "@/components/CheckAuth";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./_component/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
                    <DashboardSideba>

            </DashboardSidebar>
      <main className="w-full relative">
        {children}
        <ProtectedPage />
      </main>
    </SidebarProvider>
  );
}
