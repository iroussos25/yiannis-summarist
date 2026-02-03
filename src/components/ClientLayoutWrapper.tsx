'use client'

import { Providers } from "@/app/redux/provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import LoginModal from "@/components/LoginModal";
import AuthStateListener from "@/components/AuthStateListener";
import { usePathname } from "next/navigation";
import AppHeader from "./AppHeader";


export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode }) 
  
  {
    const pathname = usePathname();
    
    const isLandingPage = pathname === '/';

    const isAppRoute = pathname !== '/';
  
     return (
    <Providers>
      <AuthStateListener/>

        {isLandingPage ? <Header /> : <AppHeader />}

        <main>
          {children}
          </main>

    <LoginModal/>

    <Footer/>
    </Providers>
  );
}