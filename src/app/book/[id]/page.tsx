'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Book, fetchBookById } from '@/lib/api';
import styles from './BookDetails.module.css';
import Image from 'next/image';
import { AiOutlineStar, AiOutlineClockCircle, AiOutlineAudio } from "react-icons/ai";
import { HiOutlineLightBulb, HiOutlineBookOpen } from "react-icons/hi";
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/app/redux/hooks';
import { setActiveBook } from '@/app/redux/bookSlice';

export default function BookDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  const handleStartReading = () => {
    if (book) {
        dispatch(setActiveBook(book));
        router.push(`/player/${book.id}`);
    }
  };

  const handleStartListening = () => {
    if (book) {
        dispatch(setActiveBook(book));
        router.push(`/player/${book.id}?type=audio`)
    }
  };

  useEffect(() => {
    if (id) {
      fetchBookById(id as string)
        .then(setBook)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!book) return <div className={styles.error}>Book not found.</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContent}>
        <main className={styles.container}>
          <div className={styles.innerContent}>
            {/* LEFT COLUMN: TEXT INFO */}
            <div className={styles.infoLeft}>
              <h1 className={styles.title}>{book.title} ({book.type})</h1>
              <p className={styles.author}>{book.author}</p>
              
              {/* STATS BAR (Matches Sample) */}
              <div className={styles.statsRow}>
                <div className={styles.stat}><AiOutlineStar /> {book.rating} ({book.totalRating} ratings)</div>
                <div className={styles.stat}><AiOutlineClockCircle /> {book.duration}</div>
                <div className={styles.stat}><AiOutlineAudio /> {book.type}</div>
                <div className={styles.stat}><HiOutlineLightBulb /> {book.keyIdeas} Key ideas</div>
              </div>

              {/* READ & LISTEN BUTTONS */}
              <div className={styles.buttonGroup}>
                <button className={styles.readBtn} onClick={handleStartReading}>
                  <HiOutlineBookOpen /> Read
                </button>
                <button className={styles.listenBtn} onClick={handleStartListening}>
                  <AiOutlineAudio /> Listen
                </button>
              </div>

              <div className={styles.descriptionSection}>
                <h3 className={styles.sectionTitle}>What's it about?</h3>
                <div className={styles.tags}>
                  {book.tags?.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
                </div>
                <p className={styles.descriptionText}>{book.bookDescription}</p>
              </div>
            </div>

            {/* RIGHT COLUMN: BOOK COVER */}
            <div className={styles.infoRight}>
              <div className={styles.imageContainer}>
                <Image src={book.imageLink} alt={book.title} width={300} height={450} priority />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
