'use client'

import Image from 'next/image';
import logo from '../../public/logo.png';
import { openLoginModal } from '@/app/redux/authSlice';
import { useAppSelector, useAppDispatch } from '@/app/redux/hooks';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

export default function Header() {

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    
    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout error", error);
        }
    };
    
    return (

         <nav className="nav">
      <div className="nav__wrapper">
        <figure className="nav__img--mask">
          <Image className="nav__img" src={logo} alt="logo" />
        </figure>
          <ul className="nav__list--wrapper">
    {user ? (
      <li className="nav__list" onClick={handleLogout} style={{cursor: 'pointer'}}>Logout</li>
    ) : (
      <li className="nav__list" onClick={() => dispatch(openLoginModal())} style={{cursor: 'pointer'}}>Login</li>
    )}
  
          <li className="nav__list nav__list--mobile">About</li>
          <li className="nav__list nav__list--mobile">Contact</li>
          <li className="nav__list nav__list--mobile">Help</li>
        </ul>
      </div>
    </nav>
    )

}