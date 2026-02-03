import Image from "next/image";
import Link from "next/link";
import styles from "./SelectedBook.module.css";
import { AiFillAlipayCircle, AiOutlinePlayCircle } from "react-icons/ai";
import { Book } from "@/lib/api";


export default function SelectedBook({ book } : { book: Book}) {
    return (
       <>
        <div className={styles.forYouTitle}>Selected just for you</div>
    <Link href={`/book/${book.id}`} className={styles.selectedBook}>
    <div className={styles.selectedBookSubTitle}>{book.subTitle}</div>
    <div className={styles.selectedBookLine}></div>
    
    <div className={styles.selectedBookContent}>

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
                <AiOutlinePlayCircle size={20}/>
            </div>
            {book.duration && (
                <div className={styles.selectedBookDuration}>{book.duration}</div>)}
        </div>

    </div>
</div>
    </Link>

       </>
    )
}