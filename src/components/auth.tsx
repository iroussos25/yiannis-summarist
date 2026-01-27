'use client';

import { EmailAuthProvider, GoogleAuthProvider } from "firebase/auth/web-extension";
import * as firebaseui from "firebaseui"
import 'firebaseui/dist/firebaseui.css';
import { useEffect } from "react";
import { auth } from '@/lib/firebase';


export default function Auth() {
    
    useEffect(() => {

        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
        ui.start('#auth__container', {

            signInOptions: [
                GoogleAuthProvider.PROVIDER_ID,
                EmailAuthProvider.PROVIDER_ID,
            ],
            signInSuccessUrl: '/for-you',
        });
               
    }, []);

    return (
        <div id="auth__container" />
    )
}