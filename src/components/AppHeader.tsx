"use client";
import { useEffect, useState } from 'react';
import styles from './AppHeader.module.css';
import { AiOutlineSearch } from "react-icons/ai";
import Link from 'next/link';
import Image from 'next/image';
import { RxCross2 } from 'react-icons/rx';
import { Book, searchBooks } from '@/lib/api'; 
import { MdAccessTime } from 'react-icons/md';
import skeletonStyles from './skeleton.module.css';

const SearchResultSkeleton = () => (
<div className={styles.searchItem} style={{ pointerEvents: 'none' }}>
<div className={`${skeletonStyles.skeleton} ${styles.searchItemImage}`} style={{ width: '40px', height: '40px' }} />
<div className={styles.searchItemInfo} style={{ width: '100%' }}>
<div className={`${skeletonStyles.skeleton}`} style={{ height: '14px', width: '80%', marginBottom: '8px' }} />
<div className={`${skeletonStyles.skeleton}`} style={{ height: '10px', width: '40%', marginBottom: '8px' }} />
<div className={`${skeletonStyles.skeleton}`} style={{ height: '10px', width: '20%' }} />
</div>
</div>
);

export default function AppHeader() {
const [searchQuery, setSearchQuery] = useState("");
const [isSearching, setIsSearching] = useState(false);
const [filteredSearchResults, setFilteredSearchResults] = useState<Book[]>([]);

useEffect(() => {
if (searchQuery.length <= 2) {
setFilteredSearchResults([]);
setIsSearching(false);
return;
}

setIsSearching(true);

const delayDebounceFn = setTimeout(async () => {
try {
const results = await searchBooks(searchQuery);
setFilteredSearchResults(results);
} catch (error) {
console.error("Search failed:", error);
} finally {
setIsSearching(false);
}
}, 500); 

return () => clearTimeout(delayDebounceFn);
}, [searchQuery]);

const clearSearch = () => {
setSearchQuery('');
setFilteredSearchResults([]);
};

return (
<header className={styles.appHeader}>
<div className={styles.headerContent}>
<div className={styles.searchWrapper}>
<div className={styles.searchInputWrapper}>
<input
className={styles.searchInput}
placeholder="Search for books"
type="text"
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
/>
{searchQuery ? (
<div className={styles.searchIcon} onClick={clearSearch}>
<RxCross2 size={20} style={{ cursor: 'pointer' }} />
</div>
) : (
<div className={styles.searchIcon}>
<AiOutlineSearch size={20} />
</div>
)}
</div>

{searchQuery.length > 2 && (
<div className={styles.searchResultsWrapper}>
{isSearching ? (
Array(5).fill(0).map((_, i) => <SearchResultSkeleton key={i} />)
) : filteredSearchResults.length > 0 ? (
filteredSearchResults.map((book) => (
<Link 
href={`/book/${book.id}`} 
key={book.id} 
className={styles.searchItem} 
onClick={clearSearch}
>
<Image src={book.imageLink} alt={book.title} width={40} height={40} className={styles.searchItemImage} />
<div className={styles.searchItemInfo}>
    <div className={styles.searchItemTitle}>{book.title}</div>
    <div className={styles.searchItemAuthor}>{book.author}</div>
    {book.duration && (
        <div className={styles.searchItemDuration}>
            <MdAccessTime size={14} />
            <span>{book.duration}</span>
        </div>
    )}
</div>
</Link>
))
) : (
<div className={styles.searchStatus}>No Books Found</div>
)}
</div>
)}
</div>
</div>
</header>
);
}
