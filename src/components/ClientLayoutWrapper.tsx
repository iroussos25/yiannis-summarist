'use client'

import { Providers } from "@/app/redux/provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import LoginModal from "@/components/LoginModal";
import AuthStateListener from "@/components/AuthStateListener";
import { usePathname } from "next/navigation";


export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode }) 
  
  {
    const pathname = usePathname();
    const isDashBoardRoute = pathname === '/for-you' || pathname === '/library';

     return (
    <Providers>
      <AuthStateListener/>

     {!isDashBoardRoute && <Header/>}
        <main>
          {children}
          </main>
    <LoginModal/>
    {!isDashBoardRoute && <Footer/>}
    </Providers>
  );
}