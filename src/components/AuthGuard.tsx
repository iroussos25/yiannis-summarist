"use client";
import { useAppSelector } from "@/app/redux/hooks";
import Image from "next/image";
import styles from "./AuthGuard.module.css"; // We'll need to create this
import { useDispatch } from "react-redux";
import { openLoginModal } from "@/app/redux/authSlice"; // Adjust based on your slice actions

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (isLoading) return <div className={styles.loading}>Loading...</div>;

  if (!user) {
    return (
      <div className={styles.container}>
        <Image 
          src='/login.png' // Replace with your actual login/guest asset path
          alt="Login required" 
          width={450} 
          height={400} 
        />
        <h2 className={styles.title}>Log in to your account to see your details.</h2>
        <button 
          className={styles.loginBtn}
          onClick={() => dispatch(openLoginModal())}
        >
          Login
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
