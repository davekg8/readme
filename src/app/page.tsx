import { redirect } from 'next/navigation';
import { getBooks } from '@/actions/library';

export default async function Home() {
  const books = await getBooks();

  if (books.length > 0 && books[0].chapters.length > 0) {
    const firstBook = books[0];
    // Sort chapters by ID (assuming they are numeric strings) to get the first one
    const firstChapter = [...firstBook.chapters].sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10))[0];
    redirect(`/books/${firstBook.id}/chapters/${firstChapter.id}`);
  }

  return (
    <div className="flex h-screen w-full items-center justify-center p-4">
      <div className="text-center">
        <h1 className="font-headline text-3xl text-accent">Welcome to ScrollScribe</h1>
        <p className="mt-2 text-lg text-muted-foreground">No books have been published yet. Check back soon!</p>
      </div>
    </div>
  );
}
