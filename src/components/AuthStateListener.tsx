'use client';

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore'; 
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { clearUser, closeLoginModal, setUser, setPremium } from '@/app/redux/authSlice';
import { setFavorites } from '@/app/redux/favoritesSlice';
import { clearActiveBook, setFinishedBooks } from '@/app/redux/bookSlice';
import { usePathname, useRouter } from 'next/navigation';
import { Book } from '@/lib/api';

export default function AuthStateListener() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const isPremium = useAppSelector((state) => state.auth.isPremium);
  const userState = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // 1. Instant Auth State
        dispatch(setUser({ uid: user.uid, email: user.email || "Guest User" }));
        dispatch(closeLoginModal());
        if (pathname === '/') router.push('/for-you');

        // 2. Background Sync (Silent Observer Strategy)
        const syncData = async (canRetry: boolean) => {
          try {
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
              const data = userSnap.data();
              const isDatabasePremium = !!(data.isPremium || data.subscriptionStatus === 'premium');
              
              // Only update if the database has a definitive status
              // This prevents the 'flicker' from the Authenticator's state
              if (isDatabasePremium) {
                dispatch(setPremium(true));
              } else {
                dispatch(setPremium(false));
              }
            }

            // Sync Library
            const favsSnap = await getDocs(collection(db, "users", user.uid, "favorites"));
            dispatch(setFavorites(favsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Book[]));
            
          } catch (error: any) {
            // If offline, retry once but DON'T clear the premium state 
            // We trust the state set by the Authenticator during the wait
            if (canRetry && error.message.includes("offline")) {
              console.log("DORI DEBUG: Offline race detected. Retrying sync...");
              setTimeout(() => syncData(false), 1000);
            } else {
              console.warn("DORI DEBUG: Background sync failed/offline. Preserving current state.");
            }
          }
        };

        syncData(true);

      } else {
        // 3. Logout Cleanup
        dispatch(clearUser());
        dispatch(setPremium(false));
        dispatch(setFavorites([]));
        dispatch(setFinishedBooks([]));
        dispatch(clearActiveBook());
      }
    });

    return () => unsubscribe();
  }, [dispatch, router, pathname]); // Added pathname to dependencies to ensure correct redirects


  // 4. THE SAFETY GUARD
  useEffect(() => {
    if (!userState && isPremium) {
      dispatch(setPremium(false));
    }
  }, [userState, isPremium, dispatch]);

  return null;
}
