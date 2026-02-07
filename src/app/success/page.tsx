"use client";

import Link from "next/link";
import styles from "./Success.module.css";
import { AiFillCheckCircle } from "react-icons/ai";

export default function SuccessPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <AiFillCheckCircle className={styles.icon} />
        <h1 className={styles.title}>Welcome to Summarist Premium!</h1>
        <p className={styles.text}>
          Your payment was successful. You now have full access to all book
          summaries and audio versions.
        </p>
        <Link href="/for-you" className={styles.button}>
          Finish setup & start reading
        </Link>
      </div>
    </div>
  );
}
