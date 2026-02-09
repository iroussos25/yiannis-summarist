'use client';

import styles from './Library.module.css';
import { useAppSelector } from "../redux/hooks";
import BookCard from '@/components/bookCard';
import UserNotLoggedIn from '@/components/UserNotLoggedIn';
import BookCardSkeleton from '@/components/bookCardSkeleton'; 

export default function LibraryPage() {
  const { user, isLoading: authLoading } = useAppSelector((state) => state.auth);
  const allSavedBooks = useAppSelector((state) => state.favorites.items);
  const finishedBooks = useAppSelector((state) => state.book.finishedBooks);

  if (!authLoading && !user) {
    return <UserNotLoggedIn />;
  }

  return (
    <div className={styles.container}>

      <h1 className={styles.title}>Saved Books</h1>

      <p className={styles.subtitle}>
        {authLoading ? "Checking..." : `${allSavedBooks.length} ${allSavedBooks.length === 1 ? 'book' : 'books'}`}
      </p>

      {authLoading ? (
        <div className={styles.grid}>
          {Array(4).fill(0).map((_, i) => <BookCardSkeleton key={i} />)}
        </div>
      ) : allSavedBooks.length > 0 ? (
        <div className={styles.grid}>
          {allSavedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}></div>
          <h2 className={styles.emptyTitle}>Your Library is empty</h2>
          <p className={styles.emptyText}>
            When you save your favorite books, they will appear here.
          </p>
        </div>
      )}

{!authLoading && (finishedBooks.length > 0 || authLoading) ? (
  <div className={styles.finishedSection}>
    <h2 className={styles.title} style={{ marginTop: '40px' }}>Finished Books</h2>
    <p className={styles.subtitle}>
      {authLoading ? "Loading..." : `${finishedBooks.length} ${finishedBooks.length === 1 ? 'book' : 'books'}`}
    </p>
    <div className={styles.grid}>
      {authLoading 
        ? Array(2).fill(0).map((_, i) => <BookCardSkeleton key={i} />) 
        : finishedBooks.map((book) => <BookCard key={book.id} book={book} />)
      }
    </div>
  </div>
) : null}

    </div>
  );
}
