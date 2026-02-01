import { Book } from "@/lib/api";
import Link from "next/link";
import styles from "./BookCard.module.css"
import Image from "next/image";
import { AiOutlinePlayCircle, AiOutlineStar } from "react-icons/ai";


export default function BookCard({ book } :{book: Book }) {
    return (
        <Link href={`/book/${book.id}`} className={styles.bookCard}>
            <figure className={styles.bookImageWrapper}>
                <Image
                src={book.imageLink}
                alt={book.title}
                    width={172}
                    height={172}
                    className={styles.bookImage}
                    />
                    </figure>
                    <div className={styles.bookTitle}>{book.title}</div>
                    <div className={styles.bookAuthor}>{book.author}</div>
                    <div className={styles.bookSubtitle}>{book.subTitle}</div>
                    <div className={styles.bookStats}>
                    <div className={styles.bookStat}>
                        <AiOutlinePlayCircle size={18} />
                        <span>{book.audioDuration || "0:00"}</span>
                     </div>
                    <div className={styles.bookStat}>
                        <AiOutlineStar size={18} />
                         <span>{book.averageRating || "0.0"}</span>
                    </div>
                </div>
               </Link>
    )
}