import { firestore } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export type Chapter = {
  id: string;
  title: string;
  content: string;
  summary?: string;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  chapters: Chapter[];
};

// Fetch all books from Firestore
export async function getBooks(): Promise<Book[]> {
  const booksCollection = collection(firestore, 'books');
  const snapshot = await getDocs(booksCollection);
  if (snapshot.empty) {
    return [];
  }
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Book[];
}


// Fetch a single chapter from Firestore
export const getChapter = async (bookId: string, chapterId: string) => {
  const bookRef = doc(firestore, 'books', bookId);
  const bookDoc = await getDoc(bookRef);

  if (!bookDoc.exists()) {
    return null;
  }

  const book = { id: bookDoc.id, ...bookDoc.data() } as Book;
  
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
