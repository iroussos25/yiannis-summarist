"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { 
    signInAnonymously, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup, 
    createUserWithEmailAndPassword,
    sendPasswordResetEmail 
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { useAppDispatch } from "@/app/redux/hooks";
import { closeLoginModal, setAuthState } from "@/app/redux/authSlice";

import { FcGoogle } from "react-icons/fc";
import { FaUser } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

export default function Authenticator() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(true);

    const fetchPremiumStatus = async (uid: string) => {
        try {
            const userRef = doc(db, "users", uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                const data = userSnap.data();
                return !!(data.isPremium || data.subscriptionStatus === "premium");
            }
        } catch (error) {
            console.error("Error checking premium status:", error);
        }
        return false;
    };

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            let user;
            if (isLoginMode) {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                user = userCredential.user;
            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                user = userCredential.user;
            }

            const isPremium = await fetchPremiumStatus(user.uid);

            dispatch(setAuthState({ 
                user: { uid: user.uid, email: user.email }, 
                isPremium 
            }));

            dispatch(closeLoginModal());
            router.push("/for-you");
        } catch (error: any) {
            alert((isLoginMode ? "Login failed: " : "Signup failed: ") + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, provider);
            const isPremium = await fetchPremiumStatus(result.user.uid);

            dispatch(setAuthState({ 
                user: { uid: result.user.uid, email: result.user.email }, 
                isPremium 
            }));

            dispatch(closeLoginModal());
            router.push("/for-you");
        } catch (error: any) {
            console.error("Google Login Error", error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGuestLogin = async () => {
        setLoading(true);
        try {
            const result = await signInAnonymously(auth);
            
            dispatch(setAuthState({ 
                user: { uid: result.user.uid, email: "Guest User" }, 
                isPremium: false 
            }));

            dispatch(closeLoginModal());
            router.push("/for-you");
        } catch (error: any) {
            console.error("Guest login failed:", error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        if (!email) return alert("Please enter your email address.");
        try {
            await sendPasswordResetEmail(auth, email);
            alert("A password reset email has been sent to " + email);
        } catch (error: any) {
            alert("Error: " + error.message);
        }
    };

    return (
        <div className="auth__wrapper">
            <div className="auth">
                <div className="auth__content" style={{ padding: '40px 32px 24px' }}>
                    <div className="auth__title">
                        {isLoginMode ? "Log in to Summarist" : "Sign up to Summarist"}
                    </div>
                    
                    <button type="button" disabled={loading} onClick={handleGuestLogin} className="btn guest__btn--wrapper">
                        <figure className="google__icon--mask guest__icon--mask"><FaUser size={26} /></figure>
                        <div>Log in as a Guest</div>
                    </button>

                    <div className="auth__separator">or</div>

                    <button type="button" disabled={loading} onClick={handleGoogleLogin} className="btn google__btn--wrapper">
                        <figure className="google__icon--mask"><FcGoogle size={32} /></figure>
                        <div>Login with Google</div>
                    </button>

                    <div className="auth__separator">or</div>

                    <form onSubmit={handleAuth} className="auth__main--form">
                        <input className="auth__main--input" type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input className="auth__main--input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button className="btn" disabled={loading}>
                            {loading ? <div className="spinner"></div> : <span>{isLoginMode ? "Login" : "Sign Up"}</span>}
                        </button>
                    </form>
                </div>

                <div className="auth__forgot--password" onClick={handleForgotPassword}>Forgot your Password?</div>
                
                <button type="button" className="auth__switch--btn" onClick={() => setIsLoginMode(!isLoginMode)}>
                    {isLoginMode ? "Don't have an account?" : "Already have an account?"}
                </button>

                <div className="auth__close--btn" onClick={() => dispatch(closeLoginModal())}>
                    <AiOutlineClose size={32} />
                </div>
            </div>
        </div>
    );
}
