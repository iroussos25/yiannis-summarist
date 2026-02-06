"use client";
import { useEffect, useState } from 'react';
import styles from './AppHeader.module.css';
import { AiOutlineSearch } from "react-icons/ai";
import Link from 'next/link';
import Image from 'next/image';
import { RxCross2 } from 'react-icons/rx';
import { Book, fetchRecommendedBooks } from '@/lib/api';
import { MdAccessTime } from 'react-icons/md';
// Import your search logic states/handlers if you want the search to work here too

export default function AppHeader() {

const [searchQuery, setSearchQuery] = useState("");
const [allBooks, setAllBooks] = useState<Book[]>([]);
const [isSearching, setIsSearching] = useState(false);
const [filteredSearchResults, setFilteredSearchResults] = useState<Book[]>([]);

useEffect(() => {
    fetchRecommendedBooks().then(setAllBooks).catch(console.error);

}, [])

const clearSearch = () => {
setSearchQuery('');
setFilteredSearchResults([]);
};

const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
const value = e.target.value;
setSearchQuery(value);

if (value.length > 2) {
setIsSearching(true);
const results = allBooks.filter((book) => 
book.title.toLowerCase().includes(value.toLowerCase()) ||
book.author.toLowerCase().includes(value.toLowerCase()) ||
book.subTitle.toLowerCase().includes(value.toLowerCase())
);
setFilteredSearchResults(results);
setIsSearching(false);

} else {
setFilteredSearchResults([]);
}
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
                    suppressHydrationWarning
                    value={searchQuery}
                    onChange={handleSearchChange}
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
                        <div className={styles.searchStatus}>Searching...</div>
                    ) : filteredSearchResults.length > 0 ? (
                        filteredSearchResults.map((book) => (
                            <Link href={`/book/${book.id}`} key={book.id} className={styles.searchItem} onClick={clearSearch}>
                                <Image src={book.imageLink} alt={book.title} width={40} height={40} className={styles.searchItemImage}/>
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
