"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./AudioPlayer.module.css";
import Image from "next/image";
import { IoClose, IoPlayBackSharp, IoPlayForwardSharp } from "react-icons/io5";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { clearActiveBook, addToFinished } from "@/app/redux/bookSlice"; // Added addToFinished
import { useRouter, usePathname } from "next/navigation";

const MOCK_AUDIO_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

export default function AudioPlayer() {
  const book = useAppSelector((state) => state.book.activeBook);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playAnimationRef = useRef<number | null>(null);
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const pathname = usePathname();

  const dispatch = useAppDispatch();

  // Logic for when the book finishes
  const handleOnEnded = () => {
    setIsPlaying(false);
    if (book) {
      dispatch(addToFinished(book));
      console.log(`Successfully added to finished: ${book.title}`);
    }
  };

  const repeat = useCallback(() => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      setTimeProgress(currentTime);
      
      if (duration > 0) {
        const progressPercent = (currentTime / duration) * 100;
        audioRef.current.style.setProperty('--range-progress', `${progressPercent}%`);
      }
      
      playAnimationRef.current = requestAnimationFrame(repeat);
    }
  }, [duration]);

  useEffect(() => {
     const audio = audioRef.current;
    
    // IF THE BOOK IS CLEARED, KILL THE AUDIO IMMEDIATELY
    if (!book) {
      if (audio) {
        audio.pause();
        audio.src = ""; // Clear the source so it stops buffering
      }
      setIsPlaying(false);
      return;
    }
    if (!audio || !book) return;

    const targetSrc = book.audioLink || MOCK_AUDIO_URL;
    
    if (audio.src !== targetSrc) {
      audio.src = targetSrc;
      audio.load();
      setTimeProgress(0);
      setIsPlaying(true); 
    }

    if (isPlaying) {
      audio.play()
        .then(() => {
          playAnimationRef.current = requestAnimationFrame(repeat);
        })
        .catch((error) => {
          console.warn("Autoplay blocked or Load failed:", error);
          setIsPlaying(false);
        });
    } else {
      audio.pause();
      if (playAnimationRef.current) cancelAnimationFrame(playAnimationRef.current);
    }

    return () => {
      if (playAnimationRef.current) cancelAnimationFrame(playAnimationRef.current);
    };
  }, [isPlaying, book, repeat]); 

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
      setTimeProgress(audioRef.current.currentTime);
    }
  };

  if (!book) return null;

  const handleClosePlayer = () => {
  // 1. Stop the physical audio first
  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.src = "";
  }
  dispatch(clearActiveBook());
  setIsPlaying(false);
  // 2. Clear local animation frames
  if (playAnimationRef.current) {
    cancelAnimationFrame(playAnimationRef.current);
  }
  // 3. Clear local play state
  // 4. Finally, tell Redux to forget the book
  if (pathname.includes('/player')) {
    router.push('/for-you');
  }
};

    
  return (
    <div className={styles.audioPlayerWrapper}>
      <audio
        ref={audioRef}
        src={book.audioLink || MOCK_AUDIO_URL}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleOnEnded} // Updated handler
      />
      
      <div className={styles.audioPlayerContent}>
        <div className={styles.bookInfo}>
          <div className={styles.imageWrapper}>
            {book.imageLink && (
              <Image src={book.imageLink} alt={book.title} width={56} height={56} />
            )}
          </div>
          <div className={styles.textContainer}>
            <div className={styles.title}>{book.title}</div>
            <div className={styles.author}>{book.author}</div>
          </div>
        </div>

        <div className={styles.controls}>
          <button className={styles.controlBtn} onClick={() => (audioRef.current!.currentTime -= 10)}>
            <IoPlayBackSharp size={24} />
          </button>
          <button onClick={() => setIsPlaying(!isPlaying)} className={styles.mainToggle}>
            {isPlaying ? <AiFillPauseCircle size={48} /> : <AiFillPlayCircle size={48} />}
          </button>
          <button className={styles.controlBtn} onClick={() => (audioRef.current!.currentTime += 10)}>
            <IoPlayForwardSharp size={24} />
          </button>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.progressBarContainer}>
            <span className={styles.time}>{formatTime(timeProgress)}</span>
            <input
              type="range"
              className={styles.rangeInput}
              value={timeProgress}
              max={duration || 0}
              onChange={handleProgressChange}
              style={{'--range-progress': `${(timeProgress / duration) * 100}%`} as any}
            />
            <span className={styles.time}>{formatTime(duration)}</span>
          </div>
          <button className={styles.closeBtn} onClick={handleClosePlayer}>
            <IoClose size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

function formatTime(time: number) {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
