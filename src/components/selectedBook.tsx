"use client";

import Image from "next/image";
import styles from "./SelectedBook.module.css";
import { AiFillPlayCircle } from "react-icons/ai";
import { Book } from "@/lib/api";
import { useAppDispatch } from "@/app/redux/hooks";
import { setActiveBook } from "@/app/redux/bookSlice";
import Link from "next/link";
import { MdAccessTime } from "react-icons/md";

export default function SelectedBook({ book }: { book: Book }) {
  const dispatch = useAppDispatch();

  return (
    <Link href={`/book/${book.id}`} className={styles.selectedBookCard}>
      {/* LEFT SIDE: Subtitle Only */}
      <div className={styles.leftContent}>
        <div className={styles.subTitle}>{book.subTitle}</div>
      </div>

      {/* CENTER: Vertical Divider */}
      <div className={styles.divider}></div>

      {/* RIGHT SIDE: Image + Info Column */}
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
                dispatch(setActiveBook(book));
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
