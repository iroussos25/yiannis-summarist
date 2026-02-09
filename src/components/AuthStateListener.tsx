'use client';

import { useEffect, useRef } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore'; 
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { clearUser, closeLoginModal, setAuthState } from '@/app/redux/authSlice';
import { setFavorites } from '@/app/redux/favoritesSlice';
import { clearActiveBook, setFinishedBooks } from '@/app/redux/bookSlice';
import { usePathname, useRouter } from 'next/navigation';
import { Book } from '@/lib/api';

export default function AuthStateListener() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const favorites = useAppSelector((state) => state.favorites.items);
  const finished = useAppSelector((state) => state.book.finishedBooks);
  
  // Track if we've already synced this session to prevent re-runs on nav
  const hasSynced = useRef(false);
  // Get the CURRENT state of premium to prevent 'flickering' back to basic
  const { user: reduxUser, isPremium } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // 1. FAST PATH: If already logged in and synced, do nothing
        if (reduxUser?.uid === user.uid && hasSynced.current) {
          return;
        }

        // 2. OPTIMISTIC UPDATE: Set user & preserve current UI premium state
        dispatch(setAuthState({ 
          user: { uid: user.uid, email: user.email }, 
          isPremium: isPremium 
        }));

        // 3. FAST REDIRECT: Landing -> Dashboard
        if (pathname === '/') {
          router.push('/for-you');
          dispatch(closeLoginModal());
        }

        // 4. THE SYNC: Wait 2 seconds for Firebase stabilization
        const syncData = async () => {
          try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
            
            if (userSnap.exists()) {
              const data = userSnap.data();
              const dbPremium = !!(data.isPremium || data.subscriptionStatus === 'premium');
              
              // Only update Redux if database disagrees with current UI
              if (dbPremium !== isPremium || !hasSynced.current) {
                dispatch(setAuthState({ 
                  user: { uid: user.uid, email: user.email }, 
                  isPremium: dbPremium 
                }));
              }
            }
            
            // 5. LIBRARY SYNC: Fetch data from Firestore
            const [favsSnap, finishedSnap] = await Promise.all([
              getDocs(collection(db, "users", user.uid, "favorites")),
              getDocs(collection(db, "users", user.uid, "finishedBooks"))
            ]);

            const dbFavs = favsSnap.docs.map(d => ({ id: d.id, ...d.data() })) as Book[];
const dbFinished = finishedSnap.docs.map(d => ({ id: d.id, ...d.data() })) as Book[];


            // ONLY overwrite local Redux if it's currently empty
            // This prevents the 'Instant Disappear' bug after an upgrade
          if (dbFavs.length > 0) {
    dispatch(setFavorites(dbFavs));
} else {
    console.log("DORI DEBUG: DB Favorites empty, preserving local items.");
}

// 2. GUARD FOR FINISHED: Same logic here
if (dbFinished.length > 0) {
    dispatch(setFinishedBooks(dbFinished));
} else {
    console.log("DORI DEBUG: DB Finished empty, preserving local progress.");
}
            
            hasSynced.current = true;
            console.log("DORI DEBUG: Background sync complete.");

          } catch (error) {
            console.warn("DORI DEBUG: Sync stalled, preserving current state.");
          }
        };

        syncData();

      } else {
        // 6. LOGOUT CLEANUP
        hasSynced.current = false;
        dispatch(clearUser());
        dispatch(clearActiveBook());
        dispatch(setFavorites([]));
        dispatch(setFinishedBooks([]));
      }
    });

    return () => unsubscribe();
  }, [dispatch, router, pathname, favorites.length, finished.length]);

  return null;
}

