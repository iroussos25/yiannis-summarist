import styles from './skeleton.module.css'

const SearchSkeleton = () => {
  return (
    <div className={styles.searchSkeletonWrapper}>
      <div className={`${styles.skeleton} ${styles.searchImage}`} />
      
      <div className={styles.searchTextWrapper}>
        <div className={`${styles.skeleton} ${styles.searchTitle}`} />
        <div className={`${styles.skeleton} ${styles.searchAuthor}`} />
        <div className={`${styles.skeleton} ${styles.searchDuration}`} />
      </div>
    </div>
  );
};

export default SearchSkeleton;