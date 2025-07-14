'use server';

import { firestore } from '@/lib/firebase';
import type { Timestamp } from 'firebase-admin/firestore';

export type Chapter = {
  id: string;
  title: string;
  content: string;
  summary?: string;
  createdAt: string; // Changed to string for serialization
};

export type Book = {
  id: string;
  title: string;
  author: string;
  chapters: Chapter[];
};

// Helper function to serialize Firestore Timestamps
function serializeChapter(chapter: any): Chapter {
    const { createdAt, ...rest } = chapter;
    return {
        ...rest,
        // Convert Timestamp to ISO string, or handle if it's already a string/date
        createdAt: createdAt instanceof Date 
            ? createdAt.toISOString() 
            : (createdAt?.toDate?.().toISOString() || new Date().toISOString()),
    } as Chapter;
}


// Fetch all books from Firestore using Admin SDK
export async function getBooks(): Promise<Book[]> {
  const booksCollection = firestore.collection('books');
  const snapshot = await booksCollection.get();
  if (snapshot.empty) {
    return [];
  }
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
        id: doc.id,
        title: data.title,
        author: data.author,
        chapters: data.chapters ? data.chapters.map(serializeChapter) : [],
    }
  }) as Book[];
}


// Fetch a single chapter from Firestore using Admin SDK
export const getChapter = async (bookId: string, chapterId: string) => {
  const bookRef = firestore.collection('books').doc(bookId);
  const bookDoc = await bookRef.get();

  if (!bookDoc.exists) {
    return null;
  }

  const bookData = bookDoc.data();
  if (!bookData) return null;

  const book: Book = {
      id: bookDoc.id,
      title: bookData.title,
      author: bookData.author,
      chapters: bookData.chapters ? bookData.chapters.map(serializeChapter) : [],
  };
  
  // Sort chapters by their ID (as numbers)
  const sortedChapters = [...book.chapters].sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));

  const chapterIndex = sortedChapters.findIndex(c => c.id === chapterId);
  
  if (chapterIndex === -1) {
    return null;
  }

  const chapter = sortedChapters[chapterIndex];
  const prevChapter = chapterIndex > 0 ? sortedChapters[chapterIndex - 1] : null;
  const nextChapter = chapterIndex < sortedChapters.length - 1 ? sortedChapters[chapterIndex + 1] : null;

  return { book, chapter, prevChapter, nextChapter };
};
