"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import styles from './Player.module.css';
import { useEffect, useState } from "react";
import { fetchBookById } from "@/lib/api";
import { setActiveBook, clearActiveBook } from "@/app/redux/bookSlice";
import { useParams, useRouter } from "next/navigation";
import AudioPlayer from "@/components/AudioPlayer";
import UserNotLoggedIn from "@/components/UserNotLoggedIn";
import Skeleton from "@/components/skeleton";

export default function PlayerPage() {
    const { user, isLoading, isPremium } = useAppSelector((state) => state.auth);
    const book = useAppSelector((state) => state.book.activeBook);
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [fontSize, setFontSize] = useState(16);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (!isLoading && user && !isPremium) {
            dispatch(clearActiveBook()); 
            router.push('/plan');        
        }
    }, [isPremium, user, isLoading, dispatch, router]);

    useEffect(() => {
        if (book && book.id === id) return;
        const hydrateBook = async () => {
            try {
                const data = await fetchBookById(id as string);
                if (data) dispatch(setActiveBook(data));
            } catch (error) {
                console.error("Hydration failed:", error);
            }
        };
        if (id && !book && user && isPremium) {
            hydrateBook();
        }
    }, [id, book, user, isPremium, dispatch]);


    if (isLoading) return <div className="loading-state">Loading...</div>;
    
    if (!user) return <UserNotLoggedIn />;

    if (!isPremium) return null;

    if (!book) {
        return (
            <div className={styles.playerPageWrapper}>
                <div className={styles.settingsBar}>
                    <Skeleton width="100%" height="40px" borderRadius="4px" />
                </div>
                <div className={styles.readerContainer}>
                    <Skeleton width="70%" height="32px" marginBottom="32px" />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <Skeleton width="100%" height="18px" />
                        <Skeleton width="100%" height="18px" />
                        <Skeleton width="95%" height="18px" />
                        <Skeleton width="100%" height="18px" />
                        <Skeleton width="40%" height="18px" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`${styles.playerPageWrapper} ${isDarkMode ? styles.darkTheme : ""}`}>
            <div className={styles.settingsBar}>
                <div className={styles.fontSizeControls}>
                    <button onClick={() => setFontSize(prev => Math.max(prev - 2, 12))}>A-</button>
                    <span>Font Size</span>
                    <button onClick={() => setFontSize(prev => Math.min(prev + 2, 32))}>A+</button>
                </div>
                <button className={styles.themeToggle} onClick={() => setIsDarkMode(!isDarkMode)}>
                    {isDarkMode ? "Light Mode" : "Dark Mode"}
                </button>
            </div>

            <div className={styles.readerContainer}>
                <h1 className={styles.title}>{book.title}</h1>
                <div 
                    className={styles.summaryText} 
                    style={{ fontSize: `${fontSize}px` }}
                >
                    {book.summary}
                </div>
            </div>
            <AudioPlayer />
        </div>
    );
}
