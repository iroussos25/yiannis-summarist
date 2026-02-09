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

   // 1. Add this Ref at the top of your SuccessPage component
const hasRun = useRef(false);

useEffect(() => {
  const upgradeUser = async () => {
    // Check our Ref 'Lock' - if it's already true, go away!
    if (hasRun.current) return;
    
    if (user?.uid && db) {
      hasRun.current = true; // Set the lock to true immediately
      
      try {
        console.log("DORI DEBUG: Single-fire upgrade starting...");
        const userRef = doc(db, "users", user.uid);
        
        await updateDoc(userRef, {
          subscriptionStatus: "premium",
          isPremium: true
        });

        console.log("Check 3: Firebase Update Successful!");
        dispatch(setAuthState({ 
          user: user, 
          isPremium: true 
        }));
        
      } catch (error) {
        console.error("Check 3: Firebase Update FAILED", error);
        hasRun.current = false; // Reset lock only if it actually fails
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
