"use client"

import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
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
  const { user, isLoading } = useUserStore()
  const { isMobile } = useSidebar()

  // Generate initials from fullname
  const getInitials = (fullname?: string) => {
    if (!fullname) return "??"

    const names = fullname.trim().split(" ")

    if (names.length === 1) {
      return names[0][0].toUpperCase()
    }

    return (
      names[0][0].toUpperCase() +
      names[1][0].toUpperCase()
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
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {/* Add profile image here later if your backend provides one */}
                <AvatarImage src="" alt={user?.fullname ?? "User"} />
                <AvatarFallback className="rounded-lg">
                  {getInitials(user?.fullname)}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {user?.fullname ?? "Guest User"}
                </span>

                <span className="truncate text-xs text-muted-foreground">
                  {user?.emailaddress ?? "No Email"}
                </span>
              </div>

              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src="" alt={user?.fullname ?? "User"} />
                  <AvatarFallback className="rounded-lg">
                    {getInitials(user?.fullname)}
                  </AvatarFallback>
                </Avatar>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user?.fullname ?? "Guest User"}
                  </span>

                  <span className="truncate text-xs text-muted-foreground">
                    {user?.emailaddress ?? "No Email"}
                  </span>

                  <span className="truncate text-xs text-blue-500 font-medium">
                    {user?.role ?? "USER"}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconUserCircle />
                Account
              </DropdownMenuItem>

              <DropdownMenuItem>
                <IconCreditCard />
                Billing
              </DropdownMenuItem>

              <DropdownMenuItem>
                <IconNotification />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}