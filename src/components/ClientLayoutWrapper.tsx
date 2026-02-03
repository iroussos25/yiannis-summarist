'use client'

import { Providers } from "@/app/redux/provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import LoginModal from "@/components/LoginModal";
import AuthStateListener from "@/components/AuthStateListener";
import { usePathname } from "next/navigation";
import AppHeader from "./AppHeader";
import Sidebar from "./sidebar";


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
    <AuthStateListener />
    <div style={{ display: 'flex', minHeight: '100vh' }}> 
      
      {isAppRoute && <Sidebar />}

      <div style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          minWidth: 0,
          marginLeft: isAppRoute ? '280px' : '0' 
      }}>
        {isLandingPage ? <Header /> : <AppHeader />}

        <main style={{ flexGrow: 1 }}> 
          {children}
        </main>

        <Footer />
      </div>
    </div>
    <LoginModal />
  </Providers>
);
    }