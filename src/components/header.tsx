'use client'

import Image from 'next/image';
import logo from '../../public/logo.png';
import { dispatch } from '@/app/redux/store';
import { openLoginModal } from '@/app/redux/authSlice';
import { useAppSelector } from '@/app/redux/hooks';
import { auth } from '@/lib/firebase';

export default function Header() {

    const user = useAppSelector((state) => state.auth.user);
    return (

         <nav className="nav">
      <div className="nav__wrapper">
        <figure className="nav__img--mask">
          <Image className="nav__img" src={logo} alt="logo" />
        </figure>
          <ul className="nav__list--wrapper">
    {user ? (
      <li className="nav__list" onClick={() => auth.signOut()}>Logout</li>
    ) : (
      <li className="nav__list" onClick={() => dispatch(openLoginModal())}>Login</li>
    )}
  
          <li className="nav__list nav__list--mobile">About</li>
          <li className="nav__list nav__list--mobile">Contact</li>
          <li className="nav__list nav__list--mobile">Help</li>
        </ul>
      </div>
    </nav>
    )

}