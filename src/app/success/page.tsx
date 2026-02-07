"use client";
import Link from "next/link";
import { AiFillCheckCircle } from "react-icons/ai";
import styles from "./Success.module.css";

export default function SuccessPage() {
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

