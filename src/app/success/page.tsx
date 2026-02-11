"use client";
import Link from "next/link";
import { AiFillCheckCircle } from "react-icons/ai";
import styles from "./Success.module.css";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect, useRef } from "react";

import { db } from "@/lib/firebase"; 
import { doc, updateDoc } from "firebase/firestore";
import { setAuthState } from "../redux/authSlice";

export default function SuccessPage() {
   const dispatch = useAppDispatch();
   const user = useAppSelector((state) => state.auth.user);
   const hasUpgraded = useRef(false);

const hasRun = useRef(false);

useEffect(() => {
  const upgradeUser = async () => {
    if (hasRun.current) return;
    
    if (user?.uid && db) {
      hasRun.current = true; 
      
      try {
        const userRef = doc(db, "users", user.uid);
        
        await updateDoc(userRef, {
          subscriptionStatus: "premium",
          isPremium: true
        });

        dispatch(setAuthState({ 
          user: user, 
          isPremium: true 
        }));
        
      } catch (error) {
        console.error("Check 3: Firebase Update FAILED", error);
        hasRun.current = false; 
      }
    }
  };

  if (user) {
    upgradeUser();
  }
}, [user, dispatch]); 



  return (
    <div className={styles.container}>
      <div className={styles.card}>
      <AiFillCheckCircle className={styles.icon} />
      <h1 className={styles.title}>Payment Successful!</h1>
      <p className={styles.message}>
        You are now a <strong>Premium Member</strong>. Your account has been upgraded instantly.
      </p>
      <Link href="/for-you" className={styles.button}>
        Start Reading Premium Summaries
      </Link>
      </div>
    </div>
  );
}
