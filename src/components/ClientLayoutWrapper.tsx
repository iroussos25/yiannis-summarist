'use client'

import Header from "@/components/header";
import Footer from "@/components/footer";
import LoginModal from "@/components/LoginModal";
import AuthStateListener from "@/components/AuthStateListener";
import { usePathname } from "next/navigation";
import AppHeader from "./AppHeader";
import Sidebar from "./sidebar";
import AudioPlayer from "./AudioPlayer";
import { useAppSelector } from "@/app/redux/hooks";


export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode }) 
  
  {
    const pathname = usePathname();
    const isPlanPage = pathname === '/plan';
    
    const isLandingPage = pathname === '/';
    const activeBook = useAppSelector((state) => state.book.activeBook);
    
    const isAppRoute = pathname !== '/';
    
    return (
      <>
    <AuthStateListener />
    <div style={{ display: 'flex', minHeight: '100vh', paddingBottom: activeBook ? '80px' : '0' }}> 
      
      {isAppRoute && !isPlanPage && <Sidebar />}

      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        minWidth: 0,
        minHeight: '100vh'
      }}>
        <div className={isAppRoute ? "app-content-wrapper" : ""}>

        {isLandingPage ? (<Header />) : (!isPlanPage && <AppHeader />)}

        <main style={{ flexGrow: 1 }}> 
          {children}
        </main>

       {(isLandingPage || isPlanPage) && <Footer />}
        </div>
      </div>
    </div>
    <LoginModal />
    <AudioPlayer />
        </>
);
    }