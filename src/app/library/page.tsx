'use client';

import styles from './Library.module.css';
import { useAppSelector } from "../redux/hooks";
import BookCard from '@/components/bookCard';
import UserNotLoggedIn from '@/components/UserNotLoggedIn';
import BookCardSkeleton from '@/components/bookCardSkeleton'; // Ensure this exists

export default function LibraryPage() {
  const { user, isLoading: authLoading } = useAppSelector((state) => state.auth);
  const allSavedBooks = useAppSelector((state) => state.favorites.items);
  const finishedBooks = useAppSelector((state) => state.book.finishedBooks);

  // 1. AUTH GUARD: If no user, show login prompt
  if (!authLoading && !user) {
    return <UserNotLoggedIn />;
  }

  return (
    <div className={styles.container}>
      {/* SECTION 1: SAVED BOOKS */}
      <h1 className={styles.title}>Saved Books</h1>

      {/* 2. THE STABLE COUNTER: Stays at the top-left regardless of content */}
      <p className={styles.subtitle}>
        {authLoading ? "Checking..." : `${allSavedBooks.length} ${allSavedBooks.length === 1 ? 'book' : 'books'}`}
      </p>

      {/* 3. CONTENT AREA: Skeleton -> Grid -> Empty State */}
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
        /* Empty State logic (Centering should be handled by this specific class) */
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}></div>
          <h2 className={styles.emptyTitle}>Your Library is empty</h2>
          <p className={styles.emptyText}>
            When you save your favorite books, they will appear here.
          </p>
        </div>
      )}

      {/* SECTION 2: FINISHED BOOKS */}
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
