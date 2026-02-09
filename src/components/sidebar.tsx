
'use client';

import styles from './Sidebar.module.css'
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { RxCross2, RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineHome, AiOutlineSearch, AiOutlineSetting } from 'react-icons/ai';
import { FaRegBookmark } from 'react-icons/fa';
import { RiBallPenLine } from 'react-icons/ri';
import { FiHelpCircle, FiLogIn, FiLogOut } from 'react-icons/fi';
import { clearUser, openLoginModal } from '@/app/redux/authSlice';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAppSelector, useAppDispatch } from '@/app/redux/hooks';
import { clearActiveBook } from '@/app/redux/bookSlice';
import { BsStars } from 'react-icons/bs';


export default function Sidebar() {

    const isPremium = useAppSelector((state) => state.auth.isPremium);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarClasses = [
        styles.sidebar,
        isSidebarOpen ? styles.sidebarOpen : "",
        isPremium ? styles.sidebarPremium : ""
    ].join(' ').trim(); 
    
    
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const activeBook = useAppSelector((state) => state.book.activeBook);
    const contentPadding = { paddingBottom: activeBook ? '80px' : '20px' };

   const handleAuth = async () => {
        if (user) {
          await signOut(auth);
          dispatch(clearUser());
          dispatch(clearActiveBook());
        } else {
            dispatch(openLoginModal());
        }
    };


    return (

        <>
            <div className={styles.sidebarToggleBtn}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                {isSidebarOpen ? <RxCross2 size={28} /> : <RxHamburgerMenu size={28} />}
            </div>
            <div className={`${styles.sidebarOverlay} ${isSidebarOpen ? styles.sidebarOverlayVisible : ""}`} onClick={() => setIsSidebarOpen(false)}>
            </div>
            <div className={sidebarClasses}>
                <div className={styles.sidebarContent} style={contentPadding}>

                    <Link href={user ? "/for-you" : "/"} className={styles.sidebarLogo}>
                     <Image src="/logo.png" alt="logo" width={160} height={40} />
                    </Link>
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

                      
                        <div className={styles.sidebarPremiumSection}>
                             {isPremium ? (
        <div className={styles.premiumBadge}>
            <div className={styles.sidebarIconWrapper}>
                <BsStars size={24} />
            </div>
            <div className={styles.premiumBadgeText}>Premium User</div>
        </div>
    ) : (
        <Link href="/plan" className={styles.sidebarPremiumButton}>
            <div className={styles.sidebarIconWrapper}>
                <BsStars size={24} />
            </div>
            <div className={styles.sidebarPremiumButtonText}>Go Premium!</div>
        </Link>
    )}
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
            </div>
        </>
    )
}
