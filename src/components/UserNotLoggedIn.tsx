"use client";
import Image from 'next/image';
import styles from './UserNotLoggedIn.module.css';
import { useAppDispatch } from '@/app/redux/hooks';
import { openLoginModal } from '@/app/redux/authSlice';

export default function UserNotLoggedIn() {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Image 
          src="/login.png" 
          alt="Login required" 
          width={250} 
          height={200}
          className={styles.image}
        />
        <h2 className={styles.title}>Log in to your account to see your details.</h2>
        <button 
          className={styles.loginBtn}
          onClick={() => dispatch(openLoginModal())}
        >
          Login
        </button>
      </div>
    </div>
  );
}
