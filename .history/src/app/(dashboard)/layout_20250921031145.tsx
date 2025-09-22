

export default function DashboardLayout({children} : { children : React.ReactNode}){
    return(

            </DashboardSidebar>
            <main className="w-full relative">
                <DashboardHeader/>
                <Suspense fallback={<p>Loading...</p>}>
                    {children}
                </Suspense>
                <ProtectedPage/>
            </main>
        </SidebarProvider>
    )
}