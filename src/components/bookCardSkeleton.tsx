import styles from './BookCard.module.css'
import Skeleton from './skeleton';

export default function BookCardSkeleton() {
  return (
    <div className={styles.bookCard}>
      <div className={styles.card}> 
        <div className={styles.bookImageWrapper}> 
          <Skeleton width="100%" height="100%" borderRadius="4px" /> 
        </div>
        
        <div className={styles.bookTitle}>
          <Skeleton width="90%" height="16px" /> 
        </div>
        <div className={styles.bookTitle}> 
          <Skeleton width="70%" height="16px" />
        </div>

        <div className={styles.bookAuthor}>
          <Skeleton width="60%" height="14px" />
        </div>

        <div className={styles.bookStats}>
          <div className={styles.bookStat}>
            <Skeleton width="20px" height="14px" borderRadius="50%" /> 
            <Skeleton width="40px" height="14px" /> 
          </div>
          <div className={styles.bookStat}>
            <Skeleton width="20px" height="14px" borderRadius="50%" /> 
            <Skeleton width="40px" height="14px" />
          </div>
        </div>
      </div>
    </div>
  );
}