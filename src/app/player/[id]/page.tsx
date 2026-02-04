"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import styles from './Player.module.css'
import { useEffect, useState } from "react";
import { fetchBookById } from "@/lib/api";
import { setActiveBook } from "@/app/redux/bookSlice";
import { useParams } from "next/navigation";


export default function PlayerPage() {

    const { id } = useParams();
    const book = useAppSelector((state) => state.book.activeBook);
    const dispatch = useAppDispatch();

    const [fontSize, setFontSize] = useState(16);
    const [isDarkMode, setIsDarkMode] = useState(false)
    

    useEffect(() => {
        if (book && book.id === id) return;
        const hydrateBook = async () => {
            try {
                const data = await fetchBookById(id as string);
                dispatch(setActiveBook(data));
            } catch (error) {
                console.error("Could not recover book data after refresh:", error)
            }
        };
        if (id) hydrateBook();
    }, [id, book, dispatch]);

    if (!book) return <div>No active book found. Please select a book first.</div>

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

            {/* The Actual Reader */}
            <div className={styles.readerContainer}>
                <h1 className={styles.title}>{book.title}</h1>
                <div 
                    className={styles.summaryText} 
                    style={{ fontSize: `${fontSize}px` }}
                >
                    {/* We use the 'summary' field here for the full content */}
                    {book.summary}
                </div>
            </div>
        </div>
    );
}