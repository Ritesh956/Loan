"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { User, Settings, CreditCard, LogOut } from "lucide-react"

interface UserProfileCommandProps {
  user: {
    name: string
    email: string
    phone: string
    bank: string
    avatarUrl?: string
  }
}

export function UserProfileCommand({ user }: UserProfileCommandProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "p" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <Button variant="outline" className="relative h-8 w-8 rounded-full" onClick={() => setOpen(true)}>
        <img src={user.avatarUrl || "/placeholder.svg?height=32&width=32"} alt={user.name} className="rounded-full" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Profile">
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>{user.name}</span>
            </CommandItem>
            <CommandItem>
              <span className="mr-2 h-4 w-4">@</span>
              <span>{user.email}</span>
            </CommandItem>
            <CommandItem>
              <span className="mr-2 h-4 w-4">📞</span>
              <span>{user.phone}</span>
            </CommandItem>
            <CommandItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>{user.bank}</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Actions">
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </CommandItem>
            <CommandItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

