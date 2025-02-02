import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Command } from "@/components/Command"
import { AlertDialogDemo } from "@/components/AlertDialog"
import { ThemeToggle } from "@/components/ThemeToggle"
import { ThemeProvider } from "@/components/ThemeProvider"
import { SidebarDropdown } from "@/components/SidebarDropdown"
import { SidebarProvider } from "@/components/ui/sidebar"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Loan Management System",
  description: "Compare, Simulate, and Manage Your Loans with Ease",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SidebarProvider>
            <div className="flex min-h-screen flex-col">
              <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center">
                  <SidebarDropdown />
                  <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                      <Command />
                    </div>
                    <AlertDialogDemo />
                    <ThemeToggle />
                  </div>
                </div>
              </header>
              <main className="flex-1">
                <div className="container mx-auto py-6 px-4 md:px-6 lg:px-8">{children}</div>
              </main>
              <footer className="border-t py-6 md:px-8 md:py-0">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                  <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    Built by the Loan Management System team. The source code is available on{" "}
                    <a
                      href="https://github.com/yourusername/loan-management-system"
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium underline underline-offset-4"
                    >
                      GitHub
                    </a>
                    .
                  </p>
                </div>
              </footer>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

