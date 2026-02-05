'use client';

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAppDispatch } from '@/app/redux/hooks';
import { clearUser, closeLoginModal, setUser } from '@/app/redux/authSlice';
import { usePathname, useRouter } from 'next/navigation';

export default function AuthStateListener() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // This listener runs every time the user's status changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        dispatch(setUser({ uid: user.uid, email: user.email || "Guest User"}));
        dispatch(closeLoginModal());// Automatically close modal on success
        if (pathname === '/') {
        router.push('/for-you')
        }
    
    } else {
        // User is logged out
        dispatch(clearUser());
        router.push('/');
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [dispatch]);

  return null; // This component has no UI
}
