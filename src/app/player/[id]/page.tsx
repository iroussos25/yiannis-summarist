"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import styles from './Player.module.css'
import { useEffect } from "react";
import { fetchBookById } from "@/lib/api";
import { setActiveBook } from "@/app/redux/bookSlice";
import { useParams } from "next/navigation";


export default function PlayerPage() {

    const { id } = useParams();
    const book = useAppSelector((state) => state.book.activeBook);
    const dispatch = useAppDispatch();
    

    useEffect(() => {
        if (book) return;
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
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1>{book.title}</h1>
                <p>{book.bookDescription}</p>
            </div>
        </div>
    )
}