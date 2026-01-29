
import { FcGoogle } from "react-icons/fc";
import { FaUser } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

export default function Authenticator() {
    return (
<div className="auth__wrapper">
    <div className="auth">
        <div className="auth__content">
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
        <form className="auth__main--form">
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