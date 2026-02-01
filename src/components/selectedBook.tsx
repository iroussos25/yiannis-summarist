import Image from "next/image";
import Link from "next/link";
import styles from "./SelectedBook.module.css";
import { AiFillAlipayCircle } from "react-icons/ai";
import { Book } from "@/lib/api";




export default function SelectedBook({ book } : { book: Book}) {
    return (
       <>
        <div className={styles.forYouTitle}>Selected just for you</div>
    <Link href={`/book/${book.id}`} className={styles.selectedBook}>
    <div className={styles.selectedBookSubTitle}>{book.subtitle}</div>
    <div className={styles.selectedBookLine}></div>
    <div className={styles.selectedBookContent}></div>
    <figure className={styles.bookImageWrapper}>
        <Image 
        src={book.imageLink}
        alt="book"
        width={140}
        height={140}
        priority
        className={styles.bookImage}
        />
    </figure>
    <div className={styles.selectedBookText}>
        <div className={styles.selectedBookTitle}>{book.title}</div>
        <div className={styles.SelectedBookAuthor}>{book.author}</div>
        <div className={styles.selectedBookDurationWrapper}>
            <div className={styles.selectedBookIcon}>
                <AiFillAlipayCircle size={20}/>
            </div>
            {book.audioDuration && (
            <div className={styles.selectedBookDuration}>{book.audioDuration}</div>)}
        </div>

    </div>
    </Link>

       </>
    )
}