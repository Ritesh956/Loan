import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from "lucide-react"

interface UserProfileSidebarProps {
  user: {
    name: string
    email: string
    phone: string
    bank: string
    avatarUrl?: string
  }
}

export function UserProfileSidebar({ user }: UserProfileSidebarProps) {
  return (
    <Card className="w-full md:w-80 h-auto md:h-full overflow-y-auto">
      <CardHeader className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"></div>
          <Avatar className="w-full h-full relative z-10">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>
              <User className="w-16 h-16 text-white" />
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={user.email} readOnly />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" value={user.phone} readOnly />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bank">Bank</Label>
          <Input id="bank" value={user.bank} readOnly />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Edit Profile</Button>
      </CardFooter>
    </Card>
  )
}

