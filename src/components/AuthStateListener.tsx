'use client';

import { useEffect, useRef } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore'; 
import { useAppDispatch } from '@/app/redux/hooks';
import { clearUser, closeLoginModal, setAuthState } from '@/app/redux/authSlice';
import { setFavorites } from '@/app/redux/favoritesSlice';
import { clearActiveBook, setFinishedBooks } from '@/app/redux/bookSlice';
import { usePathname, useRouter } from 'next/navigation';
import { Book } from '@/lib/api';

export default function AuthStateListener() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  
  const hasSynced = useRef(false);
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (hasSynced.current) {
          return;
        }

        dispatch(setAuthState({ 
          user: { uid: user.uid, email: user.email }, 
          isPremium: false 
        }));

        if (pathnameRef.current === '/') {
          router.push('/for-you');
          dispatch(closeLoginModal());
        }

        try {
          const userRef = doc(db, "users", user.uid);
          const [userSnap, favsSnap, finishedSnap] = await Promise.all([
            getDoc(userRef),
            getDocs(collection(db, "users", user.uid, "favorites")),
            getDocs(collection(db, "users", user.uid, "finishedBooks"))
          ]);

          if (userSnap.exists()) {
            const data = userSnap.data();
            const dbPremium = !!(data.isPremium || data.subscriptionStatus === 'premium');
            dispatch(setAuthState({ 
              user: { uid: user.uid, email: user.email }, 
              isPremium: dbPremium 
            }));
          }

          const dbFavs = favsSnap.docs.map(d => ({ id: d.id, ...d.data() })) as Book[];
          const dbFinished = finishedSnap.docs.map(d => ({ id: d.id, ...d.data() })) as Book[];

          if (dbFavs.length > 0) {
            dispatch(setFavorites(dbFavs));
          }

          if (dbFinished.length > 0) {
            dispatch(setFinishedBooks(dbFinished));
          }
          
          hasSynced.current = true;
        } catch (error) {
          console.warn("AuthStateListener: Firestore sync failed, preserving current state.", error);
        }

      } else {
        hasSynced.current = false;
        dispatch(clearUser());
        dispatch(clearActiveBook());
        dispatch(setFavorites([]));
        dispatch(setFinishedBooks([]));
      }
    });

    return () => unsubscribe();
  }, [dispatch, router]);

  return null;
}

