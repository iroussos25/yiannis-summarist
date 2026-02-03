'use client'

import { Book, fetchBookById } from "@/lib/api";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import styles from './BookDetails.module.css';
import Header from "@/components/header";
import Image from "next/image";
import Footer from "@/components/footer";



export default function BookDetailsPage() {
const params = useParams();
const bookId = params.id as string;

const [book, setBook] = useState<Book | null>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
    async function getBookData() {
        try {
            const data = await fetchBookById(bookId);
            setBook(data);
        } catch (error) {
            console.error("Failed to load book:", error);
        } finally {
            setLoading(false);
        }
    }
    
    if (bookId) {
        getBookData();
    }
}, [bookId]);

if (loading) return <div className={styles.loading}>Loading...</div>;
if (!book) return <div className={styles.error}>Book not found.</div>;

return (
    <div className={styles.pageWrapper}>
        <Header/>
        <main className={styles.container}>
            <div className={styles.bookContent}>
                <div className={styles.imageWrapper}>
                    <Image
                        src={book.imageLink}
                        alt={book.title}
                        width={200}
                        height={300}
                        priority
                        />
                      </div>
            </div>
            <div className={styles.details}>
                <h1 className={styles.title}>{book.title}</h1>
                <p className={styles.author}>{book.author}</p>
                <p className={styles.description}>{book.bookDescription}</p>

            </div>
            
        </main>
        <Footer/>
    </div>
)

}