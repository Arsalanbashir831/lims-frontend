import { AppSidebar } from "@/components/shared/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AuthProvider } from "@/context/AuthContext"


export default function Layout({ children }) {
  return (
    // <AuthProvider>

    <SidebarProvider>
      <AppSidebar />
      <main className="bg-white w-full">
        {children}
      </main>
    </SidebarProvider>
    // </AuthProvider>
  )
}
