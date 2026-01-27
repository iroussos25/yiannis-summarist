'use client';

import { EmailAuthProvider, GoogleAuthProvider } from "firebase/auth/web-extension";
import * as firebaseui from "firebaseui"
import 'firebaseui/dist/firebaseui.css';
import { useEffect } from "react";
import { auth } from '@/lib/firebase';


export default function Auth() {
  useEffect(() => {
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

    const uiConfig = {
      signInSuccessUrl: '/', 
      // Set the flow to 'popup' so it stays within your modal context
      signInFlow: '', 
      signInOptions: [
        // This option prioritizes the email/password field first
        EmailAuthProvider.PROVIDER_ID, 
        GoogleAuthProvider.PROVIDER_ID,
      ],
      // Required for 2026 security standards (keep these to avoid errors)
      tosUrl: '/terms',
      privacyPolicyUrl: '/privacy',
    };

    // Start the widget on the designated div
    ui.start('#firebaseui-auth-container', uiConfig);

    // Cleanup function
    return () => {
        ui.reset();
    };

  }, []);

  return <div id="firebaseui-auth-container" />;
}