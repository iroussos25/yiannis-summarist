export default function Authenticator() {
    return (
<div className="auth__wrapper">
    <div className="auth">
        <div className="auth__content">
            <div className="auth__title">Log in to Summarist</div>
        </div>
        <button className="btn guest__btn--wrapper">
            <figure className="google__icon--mask guest__icon--mask"></figure>
        <div>Log in as a Guest</div>
        </button>
        <div className="auth__separator">
            ::before
            <span className="auth__separator--text">or</span>
            ::after
        </div>
        <button className="btn google__btn--wrapper">
            <figure className="google__icon--mask"></figure>
            <div>Login with Google</div>
        </button>
        <div className="auth__separator">
            ::before
            <span className="auth__separator--text">or</span>
            ::after
        </div>
        <form className="auth__main--form">
            <input className="auth__main--input" type="text" placeholder="Email Address" />       
            <input className="auth__main--input" type="password" placeholder="Password"/>
            <button className="btn"><span>Login</span></button>
            </form>
    <div className="auth__forgot--password">Forgot your Password?</div>
    <button className="auth__switch--btn">Don't have an account?</button>
    <div className="auth__close--btn">

    </div>
    </div>
</div>

    )
}