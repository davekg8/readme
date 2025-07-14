'use server';

import { firestore } from '@/lib/firebase';
import { collection, addDoc, query, getDocs, orderBy, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

type NewChapter = {
  title: string;
  content: string;
  summary?: string;
};

// NOTE: This now saves to Firestore.
export async function saveChapter(chapter: NewChapter) {
  const booksCollection = collection(firestore, 'books');
  const q = query(booksCollection, orderBy('title'),_limit(1));
  const querySnapshot = await getDocs(q);

  let bookId;

  if (querySnapshot.empty) {
    // In a real app, we might have a dedicated "Create Book" flow.
    // For now, let's create a default book if none exist.
    const newBook = {
      title: 'My First Book',
      author: 'New Author',
      chapters: [],
    };
    const docRef = await addDoc(booksCollection, newBook);
    bookId = docRef.id;
  } else {
    bookId = querySnapshot.docs[0].id;
  }

  const bookRef = doc(firestore, 'books', bookId);
  const chapterCount = (querySnapshot.docs[0]?.data().chapters || []).length;

  const newChapterData = {
    ...chapter,
    id: (chapterCount + 1).toString(),
    createdAt: new Date(),
  };

  await updateDoc(bookRef, {
    chapters: arrayUnion(newChapterData)
  });


  // Revalidate paths to update the UI
  revalidatePath('/author/dashboard');
  revalidatePath(`/books/${bookId}/chapters/${newChapterData.id}`);
  revalidatePath('/'); // To update the navigation
}
