"use client";

import styles from './Library.module.css';
import { useAppSelector } from "../redux/hooks";
import BookCard from '@/components/bookCard';
import UserNotLoggedIn from '@/components/UserNotLoggedIn';

export default function LibraryPage() {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const allSavedBooks = useAppSelector((state) => state.favorites.items);
  const finishedBooks = useAppSelector((state) => state.book.finishedBooks);
  const booksToRead = allSavedBooks.filter((savedBook: any) => 
    !finishedBooks.some((finishedBook: any) => finishedBook.id === savedBook.id)
);

  if (isLoading) {
    return <div className={styles.loadingContainer}>Loading...</div>;
  }

 
  if (!user) {
    return <UserNotLoggedIn />;
  }

  return (
    <div className={styles.container}>
      {/* SECTION 1: SAVED BOOKS */}
      <h1 className={styles.title}>Saved Books</h1>

      {allSavedBooks.length > 0 ? (
        <>
          <p className={styles.subtitle}>
            {allSavedBooks.length} {allSavedBooks.length === 1 ? 'book' : 'books'}
          </p>
          <div className={styles.grid}>
            {allSavedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}></div>
          <h2 className={styles.emptyTitle}>Your Library is empty</h2>
          <p className={styles.emptyText}>
            When you save your favorite books, they will appear here.
          </p>
        </div>
      )}

      {/* SECTION 2: FINISHED BOOKS */}
      {finishedBooks.length > 0 && (
        <div className={styles.finishedSection}>
          <h2 className={styles.title} style={{ marginTop: '40px' }}>Finished Books</h2>
          <p className={styles.subtitle}>
            {finishedBooks.length} {finishedBooks.length === 1 ? 'book' : 'books'}
          </p>
          <div className={styles.grid}>
            {finishedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
