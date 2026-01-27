'use client'

import Image from 'next/image';
import logo from '../../public/logo.png';
import { dispatch } from '@/app/redux/store';
import { openLoginModal } from '@/app/redux/authSlice';

export default function Header() {
    return (

        
        <nav className="nav">
      <div className="nav__wrapper">
        <figure className="nav__img--mask">
          <Image className="nav__img" src={logo} alt="logo" />
        </figure>
        <ul className="nav__list--wrapper">
          <li onClick={() => dispatch(openLoginModal())} className="nav__list nav__list--login">Login</li>
          <li className="nav__list nav__list--mobile">About</li>
          <li className="nav__list nav__list--mobile">Contact</li>
          <li className="nav__list nav__list--mobile">Help</li>
        </ul>
      </div>
    </nav>
    )

}