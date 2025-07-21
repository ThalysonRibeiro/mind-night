import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";


export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full in-h-screen px-4 sm:px-6 lg:px-8 relative">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}