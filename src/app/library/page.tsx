"use client";

import styles from './Library.module.css'
import { useAppSelector } from "../redux/hooks";
import BookCard from '@/components/bookCard';
import UserNotLoggedIn from '@/components/UserNotLoggedIn';
import Sidebar from '@/components/sidebar';

export default function LibraryPage() {
    const { user, isLoading } = useAppSelector((state) => state.auth);
    const savedBooks = useAppSelector((state) => state.favorites.items);

    if (isLoading) {
        return <div className={styles.loadingContainer}>Loading...</div>;
    }

    // TEACHABLE MOMENT: The "Layout Shell"
    // We want the Sidebar and Header to stay visible regardless of auth state
    return (
        <div className="layout-wrapper">
            <Sidebar />
            <div className="main-content">
                
                <div className={styles.container}>
                    {!user ? (
                        <UserNotLoggedIn />
                    ) : (
                        <>
                            <h1 className={styles.title}>Saved Books</h1>

                            {savedBooks.length > 0 ? (
                                <>
                                    <p className={styles.subtitle}>
                                        {savedBooks.length} {savedBooks.length === 1 ? 'book' : 'books'}
                                    </p>
                                    <div className={styles.grid}>
                                        {savedBooks.map((book) => (
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
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
