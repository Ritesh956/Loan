import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Command } from "@/components/Command"
import { AlertDialogDemo } from "@/components/AlertDialog"
import { ThemeToggle } from "@/components/ThemeToggle"
import { ThemeProvider } from "@/components/ThemeProvider"
import type React from "react"
import { UserProfileDropdown } from "@/components/UserProfileDropdown"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "Loan Management System",
  description: "Compare, Simulate, and Manage Your Loans with Ease",
}

// Mock user data
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  bank: "Example Bank",
  avatarUrl: "/placeholder.svg?height=40&width=40",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans min-h-screen bg-background`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <div className="fixed inset-0 z-[-1]">
              <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/50 bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_80%_80% at 50% 50%,#000 70%,transparent 100%)]" />
            </div>
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-14 items-center">
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                  <div className="w-full flex-1 md:w-auto md:flex-none">
                    <Command />
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertDialogDemo />
                    <ThemeToggle />
                    <UserProfileDropdown user={mockUser} />
                  </div>
                </div>
              </div>
            </header>
            <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">{children}</main>
            <footer className="py-6 md:px-8 md:py-0">
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
        </ThemeProvider>
      </body>
    </html>
  )
}

