"use client";
import Link from "next/link";
import { AiFillCheckCircle } from "react-icons/ai";
import styles from "./Success.module.css";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import { setPremium } from "../redux/authSlice";

import { db } from "@/lib/firebase"; 
import { doc, updateDoc } from "firebase/firestore";

export default function SuccessPage() {
   const dispatch = useAppDispatch();
   const user = useAppSelector((state) => state.auth.user);

   useEffect(() => {
  const upgradeUser = async () => {
    // 1. Log to debug - look for these in your browser console!
    console.log("Check 1: user.uid is", user?.uid);
    console.log("Check 2: db exists?", !!db);

    if (user?.uid && db) {
      try {
        // We use the full path to avoid internal 'collection' errors
        const userRef = doc(db, "users", user.uid);
        
        await updateDoc(userRef, {
          subscriptionStatus: "premium",
          isPremium: true
        });

        console.log("Check 3: Firebase Update Successful!");
        dispatch(setPremium(true));
        
      } catch (error) {
        console.error("Check 3: Firebase Update FAILED", error);
      }
    }
  };

  // Only run if the user is definitely logged in
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
