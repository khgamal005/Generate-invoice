import { ProtectedPage } from "@/components/CheckAuth";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./_component/DashboardSidebar";
import UserProfileDropDown from "./_component/UserProfileDropdown";
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
            <DashboardSidebar>
                <UserProfileDropDown
                    isFullName
                    isArrowUp
                />
            </DashboardSidebar>
      <main className="w-full relative">
                        <DashboardHeader/>
                <Suspense fallback={<p>Loading...</p>}>
                    {children}
                </Suspense>
        {children}
        <ProtectedPage />
      </main>
    </SidebarProvider>
  );
}
