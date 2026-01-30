'use client';

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAppDispatch } from '@/app/redux/hooks';
import { clearUser, closeLoginModal, setUser } from '@/app/redux/authSlice';

export default function AuthStateListener() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // This listener runs every time the user's status changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        dispatch(setUser({ uid: user.uid, email: user.email || "Guest User"}));
        dispatch(closeLoginModal()); // Automatically close modal on success
      } else {
        // User is logged out
        dispatch(clearUser());
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [dispatch]);

  return null; // This component has no UI
}
