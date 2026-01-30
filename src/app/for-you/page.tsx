"use client";

import styles from "./ForYou.module.css"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { 
  AiOutlineSearch, 
  AiOutlineHome, 
  AiOutlineBook, 
  AiOutlineHighlight,
  AiOutlineSetting 
} from "react-icons/ai";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

export default function ForYouPage() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.search__background}>
        <div className={styles.search__wrapper}>
          <figure>
            <Image src="/logo.png" alt="Summarist Logo" width={150} height={40} />
          </figure>
          <div className={styles.search__content}>
            <div className={styles.search}>
              <div className={styles.searchInputWrapper}>
                <input className={styles.search__input} placeholder="Search for books" type="text" />
                <div className={styles.search__icon}>
                  <AiOutlineSearch size={20} />
                </div>
              </div>
            </div>
            <div className={styles.sidebarToggleBtn} 
            onClick={() => setIsSidebarOpen(true)}>                 
              <HiOutlineMenuAlt2 size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* --- SIDEBAR --- */}
      <div className={`${styles.sidebar} ${isSidebarOpen ? "" : styles.sidebar__closed}`}>
        <div className={styles.sidebar__logo}>
           <Image src="/logo.png" alt="logo" width={160} height={40} />
        </div>
        <div className={styles.sidebar__wrapper}>
          <div className={styles.sidebar__top}>
            <Link href="/for-you" className={styles.sidebarLinkWrapper}>
              <div className={`${styles.sidebarLinkLine} ${styles.activeTab}`}></div>
              <div className={styles.sidebarIconWrapper}><AiOutlineHome size={22} /></div>
              <div className={styles.sidebarLinkText}>For you</div>
            </Link>
            
            <Link href="/library" className={styles.sidebarLinkWrapper}>
              <div className={styles.sidebarLinkLine}></div>
              <div className={styles.sidebarIconWrapper}><AiOutlineBook size={22} /></div>
              <div className={styles.sidebarLinkText}>My Library</div>
            </Link>

            <div className={`${styles.sidebarLinkWrapper} ${styles.sidebarLinkNotAllowed}`}>
              <div className={styles.sidebarLinkLine}></div>
              <div className={styles.sidebarIconWrapper}><AiOutlineHighlight size={22} /></div>
              <div className={styles.sidebarLinkText}>Highlights</div>
            </div>
            
            <div className={`${styles.sidebarLinkWrapper} ${styles.sidebarLinkNotAllowed}`}>
              <div className={styles.sidebarLinkLine}></div>
              <div className={styles.sidebarIconWrapper}><AiOutlineSearch size={22} /></div>
              <div className={styles.sidebarLinkText}>Search</div>
            </div>
          </div>

          <div className={styles.sidebar__bottom}>
            <Link href="/settings" className={styles.sidebarLinkWrapper}>
              <div className={styles.sidebarLinkLine}></div>
              <div className={styles.sidebarIconWrapper}><AiOutlineSetting size={22} /></div>
              <div className={styles.sidebarLinkText}>Settings</div>
            </Link>
          </div>
        </div>
        <div className={`${styles.sidebar__overlay} ${isSidebarOpen ? "" : styles.sidebar__overlay__hidden}`} onClick={() => setIsSidebarOpen(false)}>
            </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <main className={styles.main__content}>
        {/* Book summaries and dashboard data will go here */}
        <h1>Selected for you</h1>
      </main>
    </div>
  );
}
