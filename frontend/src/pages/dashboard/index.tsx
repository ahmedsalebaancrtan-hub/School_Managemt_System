import { SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AppSidebar } from "@/components/utilits/app-side-bar"

export const Dashboard = () => {
  return (
<SidebarProvider>
    <TooltipProvider>
        <AppSidebar/>

    </TooltipProvider>
</SidebarProvider>
  )
}
