
import { FcGoogle } from "react-icons/fc";
import { FaUser } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { auth } from "@/lib/firebase";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { signInAnonymously, signInWithEmailAndPassword } from "firebase/auth";
import { closeLoginModal, setUser } from "@/app/redux/authSlice";

export default function Authenticator() {

const dispatch = useDispatch();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleGuestogin = async () => {
    try {
        const userCredential = await signInAnonymously(auth);
        const { uid } = userCredential.user;

        dispatch(setUser({
            uid: uid,
            email: "Guest User"
        }));
        dispatch(closeLoginModal());

    } catch (error: any) {
        console.error("Guest login failed:", error.message);
    }
};

const handleAuth = async (e: React.FormEvent) => {
e.preventDefault();
try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    dispatch(closeLoginModal());
    console.log("Success!", userCredential.user);

} catch (error: any) {
    alert("Login failed:" + error.message);
}
} ;

    return (
<div className="auth__wrapper">
    <div className="auth">
        <div className="auth__content" style={{padding: '40px 32px 24px'}}>
            <div className="auth__title">Log in to Summarist</div>
        <button className="btn guest__btn--wrapper">
            <figure className="google__icon--mask guest__icon--mask"><FaUser size={26}/></figure>
        <div>Log in as a Guest</div>
        </button>
        <div className="auth__separator">
            or
           </div>
        <button className="btn google__btn--wrapper">
            <figure className="google__icon--mask">
                <FcGoogle size={32}/>
            </figure>
            <div>Login with Google</div>
        </button>
        <div className="auth__separator">
            or
        </div>
        <form onSubmit={handleAuth}className="auth__main--form">
            <input className="auth__main--input" type="text" placeholder="Email Address" />       
            <input className="auth__main--input" type="password" placeholder="Password"/>
            <button className="btn"><span>Login</span></button>
            </form>
        </div>
    <div className="auth__forgot--password">Forgot your Password?</div>
    <button className="auth__switch--btn">Don't have an account?</button>
    <div className="auth__close--btn">
        <AiOutlineClose size={32}/>
    </div>
    </div>
</div>

    )
}