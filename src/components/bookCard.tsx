import { Book } from "@/lib/api";
import Link from "next/link";
import styles from "./BookCard.module.css"
import Image from "next/image";
import { AiOutlineCheck, AiOutlinePlayCircle, AiOutlinePlus, AiOutlineStar } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { toggleFavorite } from "@/app/redux/favoritesSlice";


export default function BookCard({ book } :{book: Book }) {

const dispatch = useAppDispatch();

const { user, isPremium} = useAppSelector((state) => state.auth);
const showPremiumPill = book.subscriptionRequired && !isPremium
const favorites = useAppSelector((state) => state.favorites.items);
const isFavorited = favorites.some((fav) => fav.id === book.id);

    return (
        <div className={styles.card}>
            {showPremiumPill && <div className={styles.premiumPill}>Premium</div>}
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
                        <span>{book.duration || "0:00"}</span>
                     </div>
                    <div className={styles.bookStat}>
                        <AiOutlineStar size={18} />
                         <span>{book.averageRating || "0.0"}</span>
                    </div>
                </div>
               </Link>
               <button className={styles.addBtn} onClick={() => dispatch(toggleFavorite(book))} title="Add to Library">
                {isFavorited ? <AiOutlineCheck size={20} color="#2bd880" /> : <AiOutlinePlus size={20} />}
               </button>
                </div>
    )
}