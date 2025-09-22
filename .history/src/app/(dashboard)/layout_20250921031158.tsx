

export default function DashboardLayout({children} : { children : React.ReactNode}){
    return(

            <main className="w-full relative">
  
                    {children}
                </Suspense>
                <ProtectedPage/>
            </main>
        </SidebarProvider>
    )
}