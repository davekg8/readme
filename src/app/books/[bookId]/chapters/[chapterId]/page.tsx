import { getChapter } from "@/actions/library";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

type ChapterPageProps = {
  params: {
    bookId: string;
    chapterId: string;
  };
};

export default async function ChapterPage({ params }: ChapterPageProps) {
  const data = await getChapter(params.bookId, params.chapterId);

  if (!data) {
    notFound();
  }

  const { book, chapter, prevChapter, nextChapter } = data;

  return (
    <main className="container mx-auto max-w-4xl py-8 md:py-12">
      <div className="mb-8 text-center">
        <p className="font-headline text-primary">{book.title}</p>
        <h1 className="text-4xl md:text-5xl font-bold font-headline mt-1 text-accent">
          {chapter.title}
        </h1>
        <p className="text-muted-foreground mt-2">by {book.author}</p>
      </div>
      <Card className="shadow-lg border-border/50">
        <CardContent className="p-6 md:p-10">
          <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed whitespace-pre-wrap font-body">
            {chapter.content}
          </div>
        </CardContent>
        {chapter.summary && (
            <CardFooter className="flex flex-col items-start gap-2 pt-4 border-t">
                <Badge variant="outline">AI Generated Summary</Badge>
                <p className="text-sm text-muted-foreground italic">{chapter.summary}</p>
            </CardFooter>
        )}
      </Card>

      <div className="mt-8 flex justify-between items-center">
        <div>
          {prevChapter && (
            <Button asChild variant="outline">
              <Link href={`/books/${book.id}/chapters/${prevChapter.id}`}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Link>
            </Button>
          )}
        </div>
        <div>
          {nextChapter && (
            <Button asChild>
              <Link href={`/books/${book.id}/chapters/${nextChapter.id}`}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}
