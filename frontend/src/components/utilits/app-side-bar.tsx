"use client"

import * as React from "react"
import {
  IconDashboard,
  IconSchool,
  IconUsers,
  IconUser,
  IconBooks,
  IconClipboardList,
  IconCalendarCheck,
  IconFileCertificate,
  IconReportAnalytics,
  IconWallet,
  IconHome,
  IconInnerShadowTop,
} from "@tabler/icons-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Students",
      url: "/students",
      icon: IconUsers,
    },
    {
      title: "Classes",
      url: "/classes",
      icon: IconSchool,
    },
    {
      title: "Student Classes",
      url: "/student-classes",
      icon: IconClipboardList,
    },
    {
      title: "Teachers",
      url: "/teachers",
      icon: IconUser,
    },
    {
      title: "Monthly Fees",
      url: "/monthly-fees",
      icon: IconWallet,
    },
    {
      title: "Family",
      url: "/family",
      icon: IconHome,
    },
    {
      title: "Attendance",
      url: "/attendance",
      icon: IconCalendarCheck,
    },
    {
      title: "Subjects",
      url: "/subjects",
      icon: IconBooks,
    },
    {
      title: "Exams",
      url: "/exams",
      icon: IconClipboardList,
    },
    {
      title: "Results",
      url: "/results",
      icon: IconFileCertificate,
    },
    {
      title: "Reports",
      url: "/reports",
      icon: IconReportAnalytics,
    },
  ],
}

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="/">
                <IconInnerShadowTop className="size-5" />
                <span className="text-base font-semibold">
                  School Management
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}