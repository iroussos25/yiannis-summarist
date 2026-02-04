"use client";

import { useAppSelector } from "@/app/redux/hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./AudioPlayer.module.css";
import Image from "next/image";
import { IoPlayBackSharp, IoPlayForwardSharp } from "react-icons/io5";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";

const MOCK_AUDIO_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

export default function AudioPlayer() {
  const book = useAppSelector((state) => state.book.activeBook);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playAnimationRef = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const repeat = useCallback(() => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      setTimeProgress(currentTime);
      
      if (duration > 0) {
        const progressPercent = (currentTime / duration) * 100;
        // Allows you to style the 'filled' part of the slider in CSS
        audioRef.current.style.setProperty('--range-progress', `${progressPercent}%`);
      }
      
      playAnimationRef.current = requestAnimationFrame(repeat);
    }
  }, [duration]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !book) return;

    const targetSrc = book.audioLink || MOCK_AUDIO_URL;
    
    // Logic to update source if it changes
    if (audio.src !== targetSrc) {
      audio.src = targetSrc;
      audio.load();
      setTimeProgress(0);
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
    
  return (
    <div className={styles.audioPlayerWrapper}>
      <audio
        ref={audioRef}
        src={book.audioLink || MOCK_AUDIO_URL}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className={styles.audioPlayerContent}>
        <div className={styles.bookInfo}>
          <div className={styles.imageWrapper}>
            {book.imageLink && (
              <Image src={book.imageLink} alt={book.title} width={48} height={48} />
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

        <div className={styles.progressBar}>
          <span className={styles.time}>{formatTime(timeProgress)}</span>
          <input
            type="range"
            className={styles.rangeInput}
            value={timeProgress}
            max={duration || 0}
            onChange={handleProgressChange}
          />
          <span className={styles.time}>{formatTime(duration)}</span>
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
