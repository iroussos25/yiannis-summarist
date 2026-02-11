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
  
  const hasSynced = useRef(false);
  const { user: reduxUser, isPremium } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (reduxUser?.uid === user.uid && hasSynced.current) {
          return;
        }

        dispatch(setAuthState({ 
          user: { uid: user.uid, email: user.email }, 
          isPremium: isPremium 
        }));

        if (pathname === '/') {
          router.push('/for-you');
          dispatch(closeLoginModal());
        }

        const syncData = async () => {
          try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
            
            if (userSnap.exists()) {
              const data = userSnap.data();
              const dbPremium = !!(data.isPremium || data.subscriptionStatus === 'premium');
              
              if (dbPremium !== isPremium || !hasSynced.current) {
                dispatch(setAuthState({ 
                  user: { uid: user.uid, email: user.email }, 
                  isPremium: dbPremium 
                }));
              }
            }
            
            const [favsSnap, finishedSnap] = await Promise.all([
              getDocs(collection(db, "users", user.uid, "favorites")),
              getDocs(collection(db, "users", user.uid, "finishedBooks"))
            ]);

            const dbFavs = favsSnap.docs.map(d => ({ id: d.id, ...d.data() })) as Book[];
const dbFinished = finishedSnap.docs.map(d => ({ id: d.id, ...d.data() })) as Book[];


          if (dbFavs.length > 0) {
    dispatch(setFavorites(dbFavs));
} else {
}

if (dbFinished.length > 0) {
    dispatch(setFinishedBooks(dbFinished));
} else {
}
            
            hasSynced.current = true;

          } catch (error) {
            console.warn("DORI DEBUG: Sync stalled, preserving current state.");
          }
        };

        syncData();

      } else {
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

