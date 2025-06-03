import { Bell, Menu, User, Flower2, Settings, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface HeaderProps {
  title: string;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  onAddCustomer?: () => void; // Optional handler for Add Customer
}

const Header = ({ title, isSidebarOpen, toggleSidebar, onAddCustomer }: HeaderProps) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [hasNotifications] = useState(true);

  // Hardcoded user info
  const displayName = "HRIDAYA";
  const displayEmail = "hridaya.madaan@yourdomain.com";

  return (
    <header className="bg-gradient-to-r from-[#18122B] via-[#443C68] to-[#A084E8] border-b border-[#635985] sticky top-0 z-10 shadow-lg">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo and Sidebar Toggle */}
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-4 p-1 rounded-md text-fuchsia-300 hover:bg-[#393053] hover:text-fuchsia-100 transition-colors focus:outline-none"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-2">
            <Flower2 className="h-7 w-7 text-fuchsia-300 animate-spin-slow" />
            <span
              className="text-2xl font-extrabold bg-clip-text text-transparent select-none"
              style={{
                backgroundImage:
                  'linear-gradient(90deg,#F0A6CA,#A084E8,#8F43EE,#A084E8,#F0A6CA)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              BloomCRM-by HRIDAYA
            </span>
          </div>
          <span className="ml-6 text-xl font-semibold text-white tracking-wide drop-shadow">{title}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Add Customer Button */}
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-fuchsia-700/80 text-white font-semibold shadow hover:bg-fuchsia-800 transition-colors"
            onClick={onAddCustomer}
          >
            <UserPlus size={18} />
            Add Customer
          </button>
          {/* Notification Bell */}
          <button
            className="relative p-1 rounded-md text-fuchsia-300 hover:bg-[#393053] hover:text-fuchsia-100 transition-colors focus:outline-none"
            aria-label="Notifications"
          >
            <Bell size={22} />
            {hasNotifications && (
              <motion.span
                className="absolute top-0 right-0 h-3 w-3 rounded-full bg-fuchsia-400 border-2 border-[#18122B] shadow"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            )}
          </button>
          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center focus:outline-none group"
              aria-label="User menu"
            >
              {/* Always show fallback avatar */}
              <div className="h-9 w-9 rounded-full bg-fuchsia-900 flex items-center justify-center text-fuchsia-200 border-2 border-fuchsia-400 shadow">
                <User size={18} />
              </div>
              <span className="ml-2 text-fuchsia-200 font-medium hidden sm:inline">{displayName}</span>
              <motion.div
                className="ml-2"
                initial={{ rotate: 0 }}
                animate={{ rotate: showUserMenu ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Flower2 size={18} className="text-fuchsia-300" />
              </motion.div>
            </button>

            {/* Dropdown */}
            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.22 }}
                  className="absolute right-0 mt-3 w-56 rounded-xl shadow-xl bg-gradient-to-br from-[#232042] via-[#393053] to-[#443C68] ring-1 ring-fuchsia-800 ring-opacity-40 origin-top-right z-50 border border-fuchsia-700/40"
                  onClick={() => setShowUserMenu(false)}
                >
                  <div className="py-2">
                    <div className="flex items-center px-4 py-3 border-b border-fuchsia-900/40">
                      {/* Always fallback avatar */}
                      <div className="h-9 w-9 rounded-full bg-fuchsia-900 flex items-center justify-center text-fuchsia-200 border-2 border-fuchsia-400 shadow">
                        <User size={18} />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-bold text-fuchsia-100 truncate">{displayName}</p>
                        <p className="text-xs text-fuchsia-400 truncate">{displayEmail}</p>
                      </div>
                    </div>
                    <a
                      href="#profile"
                      className="flex items-center px-4 py-2 text-sm text-fuchsia-200 hover:bg-fuchsia-900/60 hover:text-white transition-colors"
                    >
                      <User size={16} className="mr-2" />
                      Your Profile
                    </a>
                    <a
                      href="#settings"
                      className="flex items-center px-4 py-2 text-sm text-fuchsia-200 hover:bg-fuchsia-900/60 hover:text-white transition-colors"
                    >
                      <Settings size={16} className="mr-2" />
                      Settings
                    </a>
                    <div className="px-4 py-2 text-xs text-fuchsia-400 italic">
                      🌸 Flourish with every action!
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      {/* Custom CSS for slow spin */}
      <style jsx>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </header>
  );
};

export default Header;