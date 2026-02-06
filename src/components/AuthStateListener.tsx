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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({ 
          uid: user.uid, 
          email: user.email || "Guest User",
          isPremium: false 
        }));
        
        dispatch(closeLoginModal());

        if (pathname === '/') {
          router.push('/for-you');
        }
      } else {
        dispatch(clearUser());
        
         if (pathname === '/player') { 
          router.push('/');
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch, pathname, router]); 

  return null;
}
