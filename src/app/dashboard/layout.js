import { AppSidebar } from "@/components/shared/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"


export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-white w-full">
        {/* <SidebarTrigger /> */}
        
        {children}
      </main>
    </SidebarProvider>
  )
}
