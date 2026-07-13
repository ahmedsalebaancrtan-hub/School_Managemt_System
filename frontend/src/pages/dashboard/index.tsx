import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AppSidebar } from "@/components/utilits/app-side-bar"
import { Outlet } from "react-router-dom"

export const Dashboard = () => {
  return (
<SidebarProvider>
    <TooltipProvider>
        <AppSidebar/>
        <SidebarTrigger className="-ml-1" />

  <div className="w-full p-4">
    <Outlet/>

  </div>

    </TooltipProvider>
</SidebarProvider>
  )
}
