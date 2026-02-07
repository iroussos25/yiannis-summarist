'use client';

import { EmailAuthProvider, GoogleAuthProvider } from "firebase/auth/web-extension";
import { useEffect } from "react";
import { auth } from '@/lib/firebase';
import Authenticator from "./authenticator";


export default function Auth() {
  useEffect(() => {

    const uiConfig = {
      signInSuccessUrl: '/', 
      signInFlow: '', 
      signInOptions: [
        EmailAuthProvider.PROVIDER_ID, 
        GoogleAuthProvider.PROVIDER_ID,
      ],
      tosUrl: '/terms',
      privacyPolicyUrl: '/privacy',
    };

    return () => {
    };

  }, []);

  return (
    <Authenticator/>
  )
}