'use server';

import { books } from '@/lib/data';
import { revalidatePath } from 'next/cache';

type NewChapter = {
  title: string;
  content: string;
  summary?: string;
};

// NOTE: This is a mock implementation. In a real application, you would save to a database.
// For now, we'll add to the first book in the list.
export async function saveChapter(chapter: NewChapter) {
  if (books.length === 0) {
    // In a real app, we might create a new book here or handle this case differently.
    // For now, we can create a default book if none exist.
    books.push({
      id: 'new-book',
      title: 'My First Book',
      author: 'New Author',
      chapters: [],
    });
  }
  
  const book = books[0];
  const newChapter = {
    ...chapter,
    id: (book.chapters.length + 1).toString(),
  };

  book.chapters.push(newChapter);

  // Revalidate paths to update the UI
  revalidatePath('/author/dashboard');
  revalidatePath(`/books/${book.id}/chapters/${newChapter.id}`);
  revalidatePath('/'); // To update the navigation
}
