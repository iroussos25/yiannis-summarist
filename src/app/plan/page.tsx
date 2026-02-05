"use client";
import { useState } from "react";
import styles from "./Plan.module.css";
import { AiOutlineFileText, AiOutlineBulb, AiOutlineAudio } from "react-icons/ai";

export default function PlanPage() {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <div className={styles.wrapper}>
      <div className={styles.planContainer}>
        <h1 className={styles.header}>Get unlimited access to many amazing books to read</h1>
        
        {/* Features Section */}
        <div className={styles.features}>
          <div className={styles.feature}>
            <AiOutlineFileText size={40} />
            <p><strong>Key ideas in 15 minutes</strong><br/>Learn more in less time</p>
          </div>
          <div className={styles.feature}>
            <AiOutlineBulb size={40} />
            <p><strong>Key insights for every book</strong><br/>Grasp complex topics easily</p>
          </div>
          <div className={styles.feature}>
            <AiOutlineAudio size={40} />
            <p><strong>Listen on the go</strong><br/>Audio versions for every title</p>
          </div>
        </div>

        {/* Pricing Toggle */}
        <div className={styles.pricingSelection}>
          <div 
            className={`${styles.planOption} ${isYearly ? styles.active : ""}`}
            onClick={() => setIsYearly(true)}
          >
            <div className={styles.radio}></div>
            <div className={styles.planDetails}>
              <p className={styles.planTitle}>Premium Yearly</p>
              <p className={styles.planPrice}>$99.99/year</p>
              <p className={styles.planNote}>7-day free trial included</p>
            </div>
          </div>

          <div 
            className={`${styles.planOption} ${!isYearly ? styles.active : ""}`}
            onClick={() => setIsYearly(false)}
          >
            <div className={styles.radio}></div>
            <div className={styles.planDetails}>
              <p className={styles.planTitle}>Premium Monthly</p>
              <p className={styles.planPrice}>$9.99/month</p>
              <p className={styles.planNote}>No trial included</p>
            </div>
          </div>
        </div>

        <button className={styles.ctaButton}>
          {isYearly ? "Start your 7-day free trial" : "Subscribe now"}
        </button>
      </div>
    </div>
  );
}
