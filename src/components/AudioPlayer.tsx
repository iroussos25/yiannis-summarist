"use client";

import { useAppSelector } from "@/app/redux/hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./AudioPlayer.module.css";
import Image from "next/image";
import { IoPlayBackSharp, IoPlayForwardSharp } from "react-icons/io5";
import { AiFillAlipayCircle, AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";


export default function AudioPlayer() {

const book = useAppSelector((state) => state.book.activeBook);
const audioRef = useRef<HTMLAudioElement | null>(null)
const [currentTime, setCurrentTime] = useState(0);
const playAnimationRef = useRef<number | null>(null);

const [isPlaying, setIsPlaying] = useState(false);
const [timeProgress, setTimeProgress] = useState(0);
const [duration, setDuration] = useState(0);

const repeat = useCallback(() => {
    if (audioRef.current) {
        const currentTime = audioRef.current.currentTime;
        setTimeProgress(currentTime);
        playAnimationRef.current = requestAnimationFrame(repeat);
    }
}, []);

    useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
      playAnimationRef.current = requestAnimationFrame(repeat);
    } else {
      audioRef.current?.pause();
      if (playAnimationRef.current) cancelAnimationFrame(playAnimationRef.current);
    }
  }, [isPlaying, book, repeat]);

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
    }
  };

    if (!book) return null;
    
 return (

    <div className={styles.audioPlayerWrapper}>
        <audio
        ref={audioRef}
        src={book.audioLink || "https://soundhelix.com"}
        onEnded={() => setIsPlaying(false)}
        />
         <div className={styles.audioPlayerContent}>
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

         <div className={styles.controls}>
          <button onClick={() => audioRef.current!.currentTime -= 10}><IoPlayBackSharp /></button>
          <button onClick={() => setIsPlaying(!isPlaying)} className={styles.mainToggle}>
            {isPlaying ? <AiFillPauseCircle size={48} /> : <AiFillPlayCircle size={48} />}
          </button>
          <button onClick={() => audioRef.current!.currentTime += 10}><IoPlayForwardSharp /></button>
        </div>
      </div>
    </div>
  );
}

function formatTime(time: number) {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

    