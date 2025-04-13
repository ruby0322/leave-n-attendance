"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, ClipboardList, Home, PieChart, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Leave Requests", href: "/leave-requests", icon: ClipboardList },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Team", href: "/team", icon: Users },
  { name: "Reports", href: "/reports", icon: PieChart },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-background md:flex md:w-64 md:flex-col">
      <div className="flex flex-col h-full">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Calendar className="h-6 w-6" />
            <span>Leave System</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="flex flex-col gap-1 px-2">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn("justify-start", pathname === item.href ? "bg-secondary" : "")}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.name}
                </Link>
              </Button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
