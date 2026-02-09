"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import styles from './Player.module.css';
import { useEffect, useState } from "react";
import { fetchBookById } from "@/lib/api";
import { setActiveBook, clearActiveBook } from "@/app/redux/bookSlice";
import { useParams, useRouter } from "next/navigation";
import AudioPlayer from "@/components/AudioPlayer";
import UserNotLoggedIn from "@/components/UserNotLoggedIn";

export default function PlayerPage() {
    const { user, isLoading, isPremium } = useAppSelector((state) => state.auth);
    const book = useAppSelector((state) => state.book.activeBook);
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [fontSize, setFontSize] = useState(16);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // 1. AUTH GUARD: Check login status first
    useEffect(() => {
        if (!isLoading && !user) {
            // UserNotLoggedIn component handles the UI, so no router push needed here
        }
    }, [user, isLoading]);

    // 2. PREMIUM GUARD: Evict non-premium users
    useEffect(() => {
        if (!isLoading && user && !isPremium) {
            console.log("Access Denied: Premium required.");
            dispatch(clearActiveBook()); // Kill the audio state
            router.push('/plan');        // Boot them to the pricing page
        }
    }, [isPremium, user, isLoading, dispatch, router]);

    // 3. HYDRATION: Fetch book if missing on refresh
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

    // --- RENDER LOGIC ---

    if (isLoading) return <div className="loading-state">Loading...</div>;
    
    if (!user) return <UserNotLoggedIn />;

    // If logged in but NOT premium, show nothing (the useEffect will redirect them)
    if (!isPremium) return null;

    if (!book) return <div className="loading-state">Fetching book details...</div>;

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
