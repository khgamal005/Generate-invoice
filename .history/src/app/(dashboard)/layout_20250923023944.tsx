import { ProtectedPage } from "@/components/CheckAuth";


export default function DashboardLayout({children} : { children : React.ReactNode}){
    return(
          <SidebarProvider>
                
          </SidebarProvider>

            <main className="w-full relative">
  
                    {children}
                    <ProtectedPage/>

            </main>
    )
}