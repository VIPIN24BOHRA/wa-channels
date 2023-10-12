'use client';

import DashboardPage from '@/components/dashboard/dashboard';
import Footer from '@/components/footer/footer';
import Home from '@/components/home/home';
import MainMenu from '@/components/mainMenu/mainMenu';
import { useAuth } from '@/context/authContext';

export default function App() {
  const authContext: any = useAuth();

  if (authContext.isLoggedIn)
    return (
      <>
        <MainMenu />
        <div className="flex">
          <div className="w-[220px]"></div>
          <div className="w-[83%]">
            <DashboardPage />
          </div>
        </div>
      </>
    );
  return (
    <>
      <Home />
      <Footer />
    </>
  );
}
