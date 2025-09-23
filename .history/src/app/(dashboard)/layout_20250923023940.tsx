import { ProtectedPage } from "@/components/CheckAuth";


export default function DashboardLayout({children} : { children : React.ReactNode}){
    return(
        

            <main className="w-full relative">
  
                    {children}
                    <ProtectedPage/>

            </main>
    )
}