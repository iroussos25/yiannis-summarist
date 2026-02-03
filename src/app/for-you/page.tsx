"use client";
import cardStyles from "@/components/BookCard.module.css"
import {  signOut } from "firebase/auth";
import styles from "./ForYou.module.css"
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { 
  AiOutlineSearch, 
  AiOutlineHome, 
  AiOutlineSetting 
} from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa6";
import { FiHelpCircle, FiLogIn, FiLogOut } from "react-icons/fi";
import { RiBallPenLine } from "react-icons/ri";
import { auth } from "@/lib/firebase";
import { useDispatch, useSelector } from "../redux/store";
import { openLoginModal } from "../redux/authSlice";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { Book, fetchRecommendedBooks, fetchSelectedBook, fetchSuggestedBooks, searchBooks } from "@/lib/api";
import SelectedBook from "@/components/selectedBook";
import BookCard from "@/components/bookCard";
import Skeleton from "@/components/skeleton";
import Sidebar from "@/components/sidebar";

export default function ForYouPage() {

    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
    const [suggestedBooks, setSuggestedBooks] = useState<Book[]>([]);

    const [searchQuery, setSearchQuery] = useState("");
    const [SearchResults, setSearchResults] = useState<Book[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [filteredSearchResults, setFilteredSearchResults] = useState<Book[]>([]);


    const clearSearch = () => {
        setSearchQuery('');
        setFilteredSearchResults([]);
    };

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length > 2) {
        setIsSearching(true);
        const results = recommendedBooks.filter((book) => 
            book.title.toLowerCase().includes(value.toLowerCase()) ||
            book.author.toLowerCase().includes(value.toLowerCase()) ||
            book.subTitle.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredSearchResults(results);
    } else {
        setFilteredSearchResults([]);
    }
    setIsSearching(false);
};
      
  useEffect(() => {
const loadData = async () => {
    const [selected, recommended, suggested] = await Promise.all([
        fetchSelectedBook(),
        fetchRecommendedBooks(),
        fetchSuggestedBooks()
    ]);
    setSelectedBook(selected);
    setRecommendedBooks(recommended);
    setSuggestedBooks(suggested);
        setLoading(false);
    
};
loadData();
  }, []);

  useEffect(() => {
    if (loading) return; 

  const timer = setTimeout(() => {
    const containers = document.querySelectorAll(`.${styles.booksWrapper}`);

    const handleWheel = (e: WheelEvent) => {
      const container = e.currentTarget as HTMLElement;
      
      
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;
        const isAtStart = container.scrollLeft <= 0;

        if ((e.deltaY > 0 && !isAtEnd) || (e.deltaY < 0 && !isAtStart)) {
          e.preventDefault();
          container.scrollLeft += e.deltaY;
        }
      }
    };

    containers.forEach(el => el.addEventListener("wheel", handleWheel as any, { passive: false }));
     return () =>  containers.forEach(el =>
        el.removeEventListener("wheel", handleWheel as any));
       
  }, 500); 

  return () => clearTimeout(timer);
}, [loading]); 

return (
    <div className={styles.wrapper}>
        
      <div className={styles.searchBackground}>
        <div className={styles.searchWrapper}>
           <div className={styles.searchContent}>
            <div className={styles.search}>
              <div className={styles.searchInputWrapper}>
                <input className={styles.searchInput} placeholder="Search for books" type="text" suppressHydrationWarning value={searchQuery} onChange={handleSearchChange}/>
                
                {searchQuery ? (
                    <div className={styles.searchIcon} onClick={clearSearch}><RxCross2 size={20} /></div>
                ):(
                    <div className={styles.searchIcon}><AiOutlineSearch size={20} /></div>
                )}
                  {searchQuery.length > 2 && (
                      <div className={styles.setSearchResultsWrapper}>
                        {isSearching ? (
                            <div className={styles.searchStatus}>Searching...</div> 
                        ) : filteredSearchResults.length > 0 ? (
                            filteredSearchResults.map((book) => (
                                <Link href={`/book/${book.id}`} key={book.id} className={styles.searchItem}>
                                <Image src={book.imageLink} alt="" width={40} height={40}/>
                                <div>{book.title}</div>
                            </Link>
                        ))
                    ) : (
                        <div className={styles.searchStatus}>No Books Found</div>
                    )}</div>
                )}
                {/* <div className={styles.searchIcon}>
                  <AiOutlineSearch size={20} /></div> */}
                  </div>
            </div>
            </div>
            
            </div>
      </div>

      {/* --- SIDEBAR --- */}
        <Sidebar />

      {/* --- MAIN CONTENT AREA --- */}
      <div className={styles.mainContent}>

      <div className={styles.row}>
        <div className={styles.container}>
            {loading ? (
                <div style={{display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px'}}>
                    <Skeleton width="200px" height="28px"/>
                    <div
                    style={{
                        display: 'flex', backgroundColor: '#f1f6f4', padding: '24px', gap: '24px', borderRadius: '4px'
                    }}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Skeleton width="80%" height="20px" /> 
          <Skeleton width="40%" height="24px" /> 
          <Skeleton width="30%" height="18px" /> 
        </div>
        <Skeleton width="140px" height="140px" />
      </div>
    </div>
     ) : (
      selectedBook && <SelectedBook book={selectedBook} /> 
      )}
        </div>
        </div>
        <div className={styles.sectionTitle}>Recommended For You</div>
        <div className={styles.sectionSubtitle}>We think you'll like these</div>
        <div className={styles.booksWrapper}>
            
            {loading ? (
                [...Array(5)].map((_, i) => (
                    <div key={i} className={cardStyles.bookCard} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Skeleton width="172px" height="172px" />
                <Skeleton width="140" height="16px" />
                <Skeleton width="100px" height="14px" />
                </div>

               ))
            ) :(

                 recommendedBooks.map((book) => 
                        <BookCard key={book.id} book={book} />
                    )
                )
            }
        </div>
      

        <div className={styles.sectionTitle}>Suggested Books</div>
        <div className={styles.sectionSubtitle}>Browse those books</div>
        <div className={styles.booksWrapper}>

        {loading ? (
                [...Array(5)].map((_, i) => (
                    <div key={i} className={cardStyles.bookCard} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Skeleton width="172px" height="172px" />
                <Skeleton width="140" height="16px" />
                <Skeleton width="100px" height="14px" />
                </div>

               ))
            ) : (
            
            suggestedBooks.map((book) => 
                <BookCard key={book.id} book={book} />)
        )}
             </div>           
        </div>
      </div>

    );
}
