'use client';

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore'; 
import { useAppDispatch } from '@/app/redux/hooks';
import { clearUser, closeLoginModal, setUser, setPremium } from '@/app/redux/authSlice';
import { setFavorites } from '@/app/redux/favoritesSlice';
import { setFinishedBooks } from '@/app/redux/bookSlice';
import { usePathname, useRouter } from 'next/navigation';
import { Book } from '@/lib/api';

export default function AuthStateListener() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // 1. SET USER IMMEDIATELY (Instant UI Feedback)
        dispatch(setUser({ uid: user.uid, email: user.email || "Guest User" }));

        // 2. DEFINE RESILIENT SYNC LOGIC (With Retry Loop)
        const syncUserData = async (retries = 3) => {
          try {
            console.log(`DORI DEBUG: Sync attempt ${4 - retries} for user: ${user.uid}`);
            
            // A. Fetch Premium Status
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
              const data = userSnap.data();
              dispatch(setPremium(data.isPremium || data.subscriptionStatus === 'premium'));
            }

            // B. Fetch Favorites
            const favsSnap = await getDocs(collection(db, "users", user.uid, "favorites"));
            const favsData = favsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Book[];
            dispatch(setFavorites(favsData));

            // C. Fetch Finished Books
            const finishedSnap = await getDocs(collection(db, "users", user.uid, "finishedBooks"));
            const finishedData = finishedSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Book[];
            dispatch(setFinishedBooks(finishedData));

            console.log("DORI DEBUG: Sync successful! Library re-hydrated.");
            
            // Finish UI updates after successful sync
            dispatch(closeLoginModal());
            if (pathname === '/') {
              router.push('/for-you');
            }

          } catch (error: any) {
            // If it's an 'offline' error, wait 1 second and retry
            if (error.message.includes("offline") && retries > 0) {
              console.warn(`DORI DEBUG: Firestore offline. Retrying in 1s... (${retries} left)`);
              setTimeout(() => syncUserData(retries - 1), 1000);
            } else {
              console.error("DORI DEBUG: Sync failed permanently!", error.message);
              // Still close modal and navigate even if sync fails so user isn't stuck
              dispatch(closeLoginModal());
              if (pathname === '/') router.push('/for-you');
            }
          }
        };
        
        // Start the sync process
        syncUserData();

      } else {
        // 3. LOGOUT CLEANUP (The snippet you asked about!)
        // This ensures Redux is scrubbed clean when no user is present
        dispatch(clearUser());
        dispatch(setPremium(false));
        dispatch(setFavorites([]));
        dispatch(setFinishedBooks([]));

        if (pathname.startsWith('/player')) { 
          router.push('/');
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch, router]); 

  return null;
}
