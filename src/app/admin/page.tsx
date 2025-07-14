import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Shield } from "lucide-react"

export default function AdminPage() {
  return (
    <main className="container py-8">
      <div className="flex items-center gap-4 mb-8">
        <Shield className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-4xl font-headline font-bold text-accent">Admin Panel</h1>
          <p className="text-muted-foreground">Site-wide management and configuration.</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Under Construction</CardTitle>
          <CardDescription>
            This section is currently under development.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            The administration panel will provide tools to manage users, books, and overall site settings. Please check back later for updates.
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
