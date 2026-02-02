"use client";
import cardStyles from "@/components/BookCard.module.css"
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import styles from "./ForYou.module.css"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { 
  AiOutlineSearch, 
  AiOutlineHome, 
  AiOutlineSetting 
} from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa6";
import { FiHelpCircle, FiLogIn, FiLogOut } from "react-icons/fi";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { RiBallPenLine } from "react-icons/ri";
import { current } from "@reduxjs/toolkit";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "../redux/store";
import { openLoginModal } from "../redux/authSlice";
import { RxHamburgerMenu } from "react-icons/rx";
import { Book, fetchRecommendedBooks, fetchSelectedBook, fetchSuggestedBooks } from "@/lib/api";
import SelectedBook from "@/components/selectedBook";
import BookCard from "@/components/bookCard";
import Skeleton from "@/components/skeleton";

export default function ForYouPage() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [suggestedBooks, setSuggestedBooks] = useState<Book[]>([]);

    const handleAuth = async () => {
        if (user) {
            await signOut(auth);
        } else {
            dispatch(openLoginModal());
        }
    };

  useEffect(() => {
fetchSuggestedBooks().then((books) => {
    setSuggestedBooks(books);
    console.log("Suggested Books received in Page", books)
});

fetchRecommendedBooks().then((books) => {
    setRecommendedBooks(books);
    console.log("Books received in Page", books)
});

    console.log("ForYouPage mounted, fetching book..");
    fetchSelectedBook().then((book) => {
        setSelectedBook(book);
        setLoading(false);
    });
const containers = document.querySelectorAll(`.${styles.booksWrapper}`);
const handleWheel = (e: WheelEvent) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const container = e.currentTarget as HTMLDivElement;
        const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth;
        const isAtStart = container.scrollLeft <= 0;
    
        if ((e.deltaY > 0 && !isAtEnd || e.deltaY < 0 && !isAtStart)) {
            e.preventDefault();
            container.scrollLeft += e.deltaY;
        }
        }
        }; 
        containers.forEach((container) => {
            container.addEventListener("wheel", handleWheel as any, { passive: false});
        });    
        return () => { 
           containers.forEach((container) => {
               container.removeEventListener("wheel", handleWheel as any);

        });
     };
  }, [recommendedBooks, suggestedBooks]);


  return (
    <div className={styles.wrapper}>
        
      <div className={styles.searchBackground}>
        <div className={styles.searchWrapper}>
           <div className={styles.searchContent}>
            <div className={styles.search}>
              <div className={styles.searchInputWrapper}>
                <input className={styles.searchInput} placeholder="Search for books" type="text" suppressHydrationWarning/>
                <div className={styles.searchIcon}>
                  <AiOutlineSearch size={20} />
                </div>
              </div>
            </div>
            <div className={styles.sidebarToggleBtn} 
            onClick={() => setIsSidebarOpen(true)}>                 
              <RxHamburgerMenu size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* --- SIDEBAR --- */}
        <div className={`${styles.sidebarOverlay} ${isSidebarOpen ? styles.sidebarOverlayVisible : ""}`} onClick={() => setIsSidebarOpen(false)}>
            </div>
      <div className={`${styles.sidebar} ${isSidebarOpen ?  styles.sidebarOpen : ""}`}>
        <div className={styles.sidebarLogo}>
           <Image src="/logo.png" alt="logo" width={160} height={40} />
        </div>
        <div className={styles.sidebarWrapper}>
          <div className={styles.sidebarTop}>
            <Link href="/for-you" className={styles.sidebarLinkWrapper}>
              <div className={`${styles.sidebarLinkLine} ${styles.activeTab}`}></div>
              <div className={styles.sidebarIconWrapper}><AiOutlineHome size={24} /></div>
              <div className={styles.sidebarLinkText}>For you</div>
            </Link>
            
            <Link href="/library" className={styles.sidebarLinkWrapper}>
              <div className={styles.sidebarLinkLine}></div>
              <div className={styles.sidebarIconWrapper}><FaRegBookmark size={24} /></div>
              <div className={styles.sidebarLinkText}>My Library</div>
            </Link>

            <div className={`${styles.sidebarLinkWrapper} ${styles.sidebarLinkNotAllowed}`}>
              <div className={styles.sidebarLinkLine}></div>
              <div className={styles.sidebarIconWrapper}><RiBallPenLine size={24} /></div>
              <div className={styles.sidebarLinkText}>Highlights</div>
            </div>
            
            <div className={`${styles.sidebarLinkWrapper} ${styles.sidebarLinkNotAllowed}`}>
              <div className={styles.sidebarLinkLine}></div>
              <div className={styles.sidebarIconWrapper}><AiOutlineSearch size={24} /></div>
              <div className={styles.sidebarLinkText}>Search</div>
            </div>
          </div>

          <div className={styles.sidebarBottom}>
            <Link href="/settings" className={styles.sidebarLinkWrapper}>
              <div className={styles.sidebarLinkLine}></div>
              <div className={styles.sidebarIconWrapper}><AiOutlineSetting size={24} /></div>
              <div className={styles.sidebarLinkText}>Settings</div>
            </Link>
             
             <div className={styles.sidebarLinkWrapper}>
              <div className={styles.sidebarLinkLine}></div>
              <div className={styles.sidebarIconWrapper}><FiHelpCircle size={24} /></div>
              <div className={styles.sidebarLinkText}>Help & Support</div>
             </div>
            <div className={styles.sidebarLinkWrapper} onClick={handleAuth}>
              <div className={styles.sidebarLinkLine}></div>
              <div className={styles.sidebarIconWrapper}>{user ? <FiLogOut size={24} /> : <FiLogIn size={24}/>}</div>
              <div className={styles.sidebarLinkText}>{user ? "Logout" : "Login"}</div>
            </div>
          </div>
        </div>
      </div>

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
            ) :(
            
            suggestedBooks.map((book) => (
                <BookCard key={book.id} book={book} />
            ))
            
            )}
        </div>
      </div>
    </div>
  );
}
