'use client'

import Header from "@/components/header";
import Footer from "@/components/footer";
import LoginModal from "@/components/LoginModal";
import AuthStateListener from "@/components/AuthStateListener";
import { usePathname } from "next/navigation";
import AppHeader from "./AppHeader";
import Sidebar from "./sidebar";
import { useAppSelector } from "@/app/redux/hooks";


export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode }) 
  
  {
    const pathname = usePathname();
    const isAppRoute = pathname !== '/';
    const isPlanPage = pathname === '/plan';
    const isSuccessPage = pathname === '/success;'
    const shouldShiftContent = isAppRoute && !isPlanPage && !isSuccessPage;
   
    const isLandingPage = pathname === '/';
    const activeBook = useAppSelector((state) => state.book.activeBook);
    
    const hasSidebar = isAppRoute && !isPlanPage;

    return (
      <>
    <AuthStateListener />
       <div className="wrapper" style={{ display: 'flex', minHeight: '100vh' }}> 
      
      {hasSidebar && <Sidebar />} 
      
      {isAppRoute && !isPlanPage && <Sidebar />}

        <div 
      id="main-content-area" 
      style={{ 
        flex: 1,
        marginLeft: shouldShiftContent ? '200px' : '0', 
        width: shouldShiftContent ? 'calc(100% - 200px)' : '100%',
        transition: 'margin 0.3s ease',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
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
        </>
);
    }