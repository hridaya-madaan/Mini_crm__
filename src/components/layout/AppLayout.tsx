import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar, { FlowerLoadingScreen } from './Sidebar';
import Header from './Header';
import { useAuth } from '../../hooks/useAuth';

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const location = useLocation();
  const { user } = useAuth();

  // Responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
        setIsMobile(true);
      } else {
        setIsSidebarOpen(true);
        setIsMobile(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location, isMobile]);

  // Flower theme loader on initial mount
  useEffect(() => {
    setShowLoader(true);
    const timer = setTimeout(() => setShowLoader(false), 1200);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Page title, more friendly for "/" (home/dashboard)
  const getPageTitle = () => {
    const path = location.pathname.split('/')[1];
    if (!path) return "Dashboard";
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-[#18122B] via-[#393053] to-[#443C68]">
      {/* Loader */}
      <AnimatePresence>
        {showLoader && (
          <motion.div
            key="flower-loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[1000]"
          >
            <FlowerLoadingScreen />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <>
            {/* Mobile overlay */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black z-20"
                onClick={() => setIsSidebarOpen(false)}
              />
            )}
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className={`${isMobile ? 'fixed' : 'relative'} h-full z-30`}
            >
              <Sidebar onCloseSidebar={() => setIsSidebarOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          title={getPageTitle()}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          user={user}
        />
        <main className="flex-1 overflow-y-auto px-2 sm:px-5 py-4 md:py-7 bg-gradient-to-br from-[#232042]/60 via-[#393053]/70 to-[#443C68]/80 transition-all duration-500 ease-in min-h-0 rounded-tl-3xl shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <style jsx>{`
        .app-flower-bg {
          background: radial-gradient(circle at 70% 20%, #a084e833 0%, #ffb4e022 85%, #18122b 100%);
        }
      `}</style>
    </div>
  );
};

export default AppLayout;