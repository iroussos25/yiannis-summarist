'use client';
import styles from "./ForYou.module.css"
import { useEffect, useState } from "react";
import { Book, fetchRecommendedBooks, fetchSelectedBook, fetchSuggestedBooks } from "@/lib/api";
import SelectedBook from "@/components/selectedBook";
import BookCard from "@/components/bookCard";
import SelectedBookSkeleton from "@/components/selectedBookSkeleton";
import BookCardSkeleton from "@/components/bookCardSkeleton";
import UserNotLoggedIn from "@/components/UserNotLoggedIn"; // 1. Added Import
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export default function ForYouPage() {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
    const [suggestedBooks, setSuggestedBooks] = useState<Book[]>([]);
    const dispatch = useAppDispatch();
    
    const { user, isLoading: authLoading } = useAppSelector((state) => state.auth);

    useEffect(() => {
        const loadData = async () => {
            const [selected, recommended, suggested] = await Promise.all([
                fetchSelectedBook(),
                fetchRecommendedBooks(),
                fetchSuggestedBooks()
            ]);
            setSelectedBook(selected);
            setRecommendedBooks(recommended);
            setSuggestedBooks(suggested);
            setLoading(false);
        };
        loadData();
    }, []);

  useEffect(() => {
    if (loading) return; 

  const timer = setTimeout(() => {
    const containers = document.querySelectorAll(`.${styles.booksWrapper}`);

    const handleWheel = (e: WheelEvent) => {
      const container = e.currentTarget as HTMLElement;
      
      
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;
        const isAtStart = container.scrollLeft <= 0;

        if ((e.deltaY > 0 && !isAtEnd) || (e.deltaY < 0 && !isAtStart)) {
          e.preventDefault();
          container.scrollLeft += e.deltaY;
        }
      }
    };

    containers.forEach(el => el.addEventListener("wheel", handleWheel as any, { passive: false }));
     return () =>  containers.forEach(el =>
        el.removeEventListener("wheel", handleWheel as any));
       
  }, 500); 

  return () => clearTimeout(timer);
}, [loading]); 

if (authLoading) return null; 
    if (!user) return <UserNotLoggedIn />;

    return (
        <div className={styles.wrapper}>
            <div className={styles.mainContent}>
                <main className={styles.container}>
                    <div className={styles.sectionTitle}>Selected Just For You</div>
                    <div className={styles.row}>
                        {loading ? <SelectedBookSkeleton /> : selectedBook && <SelectedBook book={selectedBook} />}
                    </div>

                    <div className={styles.sectionTitle}>Recommended For You</div>
                    <div className={styles.sectionSubtitle}>We think you'll like these</div>
                    <div className={styles.booksWrapper}>
                        {loading ? (
                            Array(5).fill(0).map((_, i) => <BookCardSkeleton key={i} />)
                        ) : (
                            recommendedBooks.slice(0, 5).map((book) => (
                                <BookCard key={book.id} book={book} />
                            ))
                        )}
                    </div>

                    <div className={styles.sectionTitle}>Suggested Books</div>
                    <div className={styles.sectionSubtitle}>Browse those books</div>
                    <div className={styles.booksWrapper}>
                        {loading ? (
                            Array(5).fill(0).map((_, i) => <BookCardSkeleton key={i} />)
                        ) : (
                            suggestedBooks.slice(0, 5).map((book) => (
                                <BookCard key={book.id} book={book} />
                            ))
                        )}
                    </div>           
                </main>
            </div>
        </div>
    );
}