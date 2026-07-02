"use client"

import { useEffect } from "react"
import { IconDotsVertical, IconLogout } from "@tabler/icons-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { useUserStore } from "@/store/user.store"

export function NavUser() {
  const { user, WhoAmI, isLoading } = useUserStore()
  const { isMobile } = useSidebar()

  // only call once when user not loaded
  useEffect(() => {
    if (!user?.id) {
      WhoAmI()
    }
  }, [])

  // initials fallback
  const getInitials = (name?: string) => {
    if (!name) return "??"

    const parts = name.trim().split(" ")

    if (parts.length === 1) {
      return parts[0][0].toUpperCase()
    }

    return (
      parts[0][0].toUpperCase() +
      parts[1][0].toUpperCase()
    )
  }

  if (isLoading) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            Loading...
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage alt={user?.fullname ?? "User"} />

                <AvatarFallback>
                  {getInitials(user?.fullname)}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col text-left">
                <span className="font-medium">
                  {user?.fullname ?? "Guest"}
                </span>

                <span className="text-xs text-muted-foreground">
                  {user?.emailaddress ?? "No email"}
                </span>
              </div>

              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side={isMobile ? "bottom" : "right"}
            align="end"
          >
            <DropdownMenuLabel>
              {user?.role ?? "USER"}
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-red-500">
              <IconLogout className="mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}