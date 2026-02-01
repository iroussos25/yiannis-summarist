"use client";

import { onAuthStateChanged, signOut, User } from "firebase/auth";
import styles from "./ForYou.module.css"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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

export default function ForYouPage() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const handleAuth = async () => {
        if (user) {
            await signOut(auth);
        } else {
            dispatch(openLoginModal());
        }
    };


  return (
    <div className={styles.wrapper}>
        
      <div className={styles.searchBackground}>
        <div className={styles.searchWrapper}>
          {/* <figure>
            <Image src="/logo.png" alt="Summarist Logo" width={150} height={40} />
          </figure> */}
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
      <main className={styles.mainContent}>
        {/* Book summaries and dashboard data will go here */}
        <div className={styles.forYouTitle}>Selected just for you</div>
      </main>
    </div>
  );
}
