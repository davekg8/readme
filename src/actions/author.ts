'use server';

import { firestore } from '@/lib/firebase';
import { revalidatePath } from 'next/cache';

type NewChapter = {
  title: string;
  content: string;
  summary?: string;
};

// NOTE: This now saves to Firestore.
export async function saveChapter(chapter: NewChapter) {
  const booksCollection = firestore.collection('books');
  const querySnapshot = await booksCollection.orderBy('title').limit(1).get();

  let bookId;
  let bookDoc;

  if (querySnapshot.empty) {
    // In a real app, we might have a dedicated "Create Book" flow.
    // For now, let's create a default book if none exist.
    const newBook = {
      title: 'My First Book',
      author: 'New Author',
      chapters: [],
    };
    const docRef = await booksCollection.add(newBook);
    bookId = docRef.id;
    bookDoc = await docRef.get();
  } else {
    bookDoc = querySnapshot.docs[0];
    bookId = bookDoc.id;
  }

  const bookRef = firestore.collection('books').doc(bookId);
  const chapterCount = (bookDoc.data()?.chapters || []).length;

  const newChapterData = {
    ...chapter,
    id: (chapterCount + 1).toString(),
    createdAt: new Date(),
  };

  // In Admin SDK, we use FieldValue for arrayUnion
  const admin = await import('firebase-admin');
  await bookRef.update({
    chapters: admin.firestore.FieldValue.arrayUnion(newChapterData)
  });


  // Revalidate paths to update the UI
  revalidatePath('/author/dashboard');
  revalidatePath(`/books/${bookId}/chapters/${newChapterData.id}`);
  revalidatePath('/'); // To update the navigation
}
