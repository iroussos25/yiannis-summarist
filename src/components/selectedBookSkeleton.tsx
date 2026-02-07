"use client";

import Skeleton from "./skeleton";
import styles from "./SelectedBook.module.css";

export default function SelectedBookSkeleton() {
  return (
    <div className={styles.selectedBookCard} style={{ cursor: 'default' }}>
      <div className={styles.leftContent}>
        <Skeleton width="100%" height="14px" marginBottom="8px" />
        <Skeleton width="80%" height="14px" marginBottom="8px" />
        <Skeleton width="90%" height="14px" />
      </div>

      <div className={styles.divider}></div>

      <div className={styles.rightContent}>
        <div className={styles.imageWrapper}>
          <Skeleton width="120px" height="120px" borderRadius="4px" />
        </div>

        <div className={styles.infoColumn}>
          <Skeleton width="140px" height="18px" marginBottom="8px" />
          <Skeleton width="100px" height="14px" marginBottom="16px" />
          
          <div className={styles.controlsRow}>
            <Skeleton width="40px" height="40px" borderRadius="50%" />
            <Skeleton width="60px" height="14px" />
          </div>
        </div>
      </div>
    </div>
  );
}
