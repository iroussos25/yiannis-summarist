'use client';

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useAppDispatch } from '@/app/redux/hooks';
import { clearUser, closeLoginModal, setUser, setPremium } from '@/app/redux/authSlice';
import { usePathname, useRouter } from 'next/navigation';

export default function AuthStateListener() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      // 1. Immediate Login & Navigation
      dispatch(setUser({ uid: user.uid, email: user.email || "Guest User" }));
      dispatch(closeLoginModal());
      if (pathname === '/') router.push('/for-you');

      // 2. The "Smart Fetch" for Premium Status
      const checkPremium = async () => {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const data = userSnap.data();
            dispatch(setPremium(data.isPremium || data.subscriptionStatus === 'premium'));
          }
        } catch (error: any) {
          console.warn("Auth check background sync:", error.message);
        }
      };
      checkPremium();

    } else {
      dispatch(clearUser());
      dispatch(setPremium(false));
    }
   });
      

  return () => unsubscribe();
}, [dispatch, router]);

  return null;
}
