"use client";

import Image from "next/image";
import styles from "./SelectedBook.module.css";
import { AiFillPlayCircle } from "react-icons/ai";
import { Book } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { setActiveBook } from "@/app/redux/bookSlice";
import Link from "next/link";
import { MdAccessTime } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function SelectedBook({ book }: { book: Book }) {
  const dispatch = useAppDispatch();
      const router = useRouter();
   const { user, isLoading: authLoading } = useAppSelector((state) => state.auth);
      

   const handleListenNow = (book: Book | null) => {
    if (!book) return;
  
    dispatch(setActiveBook(book));
    router.push(`/player/${book.id}?type=audio`);
  };

  return (
    <Link href={`/book/${book.id}`} className={styles.selectedBookCard}>
      <div className={styles.leftContent}>
        <div className={styles.subTitle}>{book.subTitle}</div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.rightContent}>
        <div className={styles.imageWrapper}>
          <Image 
            src={book.imageLink} 
            alt={book.title} 
            width={120} 
            height={120} 
            className={styles.image}
          />
        </div>

        <div className={styles.infoColumn}>
          <div className={styles.title}>{book.title}</div>
          <div className={styles.author}>{book.author}</div>
          
          <div className={styles.controlsRow}>
            <div 
              className={styles.playContainer} 
              onClick={(e) => {
                e.preventDefault();
                handleListenNow(book);
              }}
            >
              <AiFillPlayCircle size={40} className={styles.playIcon} />
              <span className={styles.playText}>Listen to summary</span>
            </div>
            <div className={styles.duration}>
              <MdAccessTime size={18} />
              <span>{book.duration || "0:00"}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
