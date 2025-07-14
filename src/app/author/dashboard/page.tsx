import { AuthorDashboardForm } from "@/components/author-dashboard-form";
import { QuillIcon } from "@/components/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AuthorDashboardPage() {
  return (
    <main className="container py-8">
      <div className="flex items-center gap-4 mb-8">
        <QuillIcon className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-4xl font-headline font-bold text-accent">
            Author Dashboard
          </h1>
          <p className="text-muted-foreground">
            Compose new chapters and generate summaries with AI.
          </p>
        </div>
      </div>
      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle>Chapter Editor</CardTitle>
          <CardDescription>
            Write a new chapter for your book. Use the AI tool to generate a
            concise summary.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AuthorDashboardForm />
        </CardContent>
      </Card>
    </main>
  );
}
