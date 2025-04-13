import { AppSidebar } from "@/components/app-sidebar"
import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Inter } from "next/font/google"
import type React from "react"
import { Toaster } from "sonner"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Leave and Attendance System",
  description: "Cloud Native Leave and Attendance System",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex h-screen">
            <div className="flex flex-col flex-1 overflow-hidden">
              <SidebarProvider>
                <AppSidebar />
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                  <Navbar />
                  {children}
                </main>
              </SidebarProvider>
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'

