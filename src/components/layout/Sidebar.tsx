import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  BellRing, 
  LogOut, 
  Flower2, 
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

// --- FLOWER THEME LOADING SCREEN ---
import { Fragment } from 'react';

const petals = Array.from({ length: 8 });
const petalVariants = {
  animate: i => ({
    rotate: i * 45,
    transition: { type: "spring", stiffness: 100, damping: 15, delay: i * 0.1 }
  }),
  pulse: {
    scale: [1, 1.12, 1],
    transition: { repeat: Infinity, duration: 1.1, ease: "easeInOut" }
  }
};

export function FlowerLoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#18122B] via-[#443C68] to-[#635985] z-[999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ width: 140, height: 140 }}
      >
        {petals.map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={petalVariants}
            animate={["animate", "pulse"]}
            className="absolute left-1/2 top-1/2"
            style={{
              originX: "50%",
              originY: "50%",
              x: -24,
              y: -60,
              zIndex: 1,
            }}
          >
            <Flower2 size={36} className="text-fuchsia-300 drop-shadow-lg" strokeWidth={2}/>
          </motion.div>
        ))}
        <motion.div
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            x: -28,
            y: -28,
            width: 56,
            height: 56,
            background: "radial-gradient(circle at 50% 50%, #7D5FFF 60%, #FFB4E0 100%)",
            boxShadow: "0 0 32px 8px #FFB4E088",
          }}
          animate={{
            scale: [1, 1.09, 1],
            filter: [
              "drop-shadow(0 0 8px #7D5FFF99)",
              "drop-shadow(0 0 16px #FFB4E0cc)",
              "drop-shadow(0 0 8px #7D5FFF99)"
            ]
          }}
          transition={{
            repeat: Infinity,
            duration: 1.7,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2"
          style={{
            x: -20,
            y: -20,
            zIndex: 2,
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "linear"
          }}
        >
          <Flower2 size={40} className="text-purple-100 drop-shadow" strokeWidth={1.4}/>
        </motion.div>
      </motion.div>
      <motion.p
        className="mt-8 text-fuchsia-200 text-base font-medium tracking-wide"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        Blooming your CRM experience...
      </motion.p>
    </motion.div>
  );
}
// --- END FLOWER THEME LOADING SCREEN ---

interface SidebarProps {
  onCloseSidebar: () => void;
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  hasSubmenu?: boolean;
  subItems?: { to: string; label: string }[];
}

const NavItem = ({ to, icon, label, hasSubmenu = false, subItems = [] }: NavItemProps) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(() => {
    if (hasSubmenu && subItems.some(item => location.pathname.includes(item.to))) {
      return true;
    }
    return false;
  });

  const isActive = location.pathname === to || location.pathname.startsWith(to + '/');

  return (
    <div className="mb-1">
      {hasSubmenu ? (
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full flex items-center px-4 py-3 rounded-lg mb-1 transition-all ${
              isActive
                ? 'bg-gradient-to-r from-fuchsia-600/20 to-purple-500/10 text-fuchsia-300 font-semibold'
                : 'text-purple-200 hover:bg-[#393053] hover:text-fuchsia-200'
            }`}
          >
            <span className="flex items-center">
              {icon}
              <span className="ml-3 font-medium">{label}</span>
            </span>
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="ml-auto"
            >
              <ChevronRight size={16} />
            </motion.div>
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden pl-10 mb-1"
              >
                {subItems.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.to}
                    className={({ isActive }) => `block py-2 px-4 rounded-lg mb-1 text-sm transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-fuchsia-600/10 to-purple-500/5 text-fuchsia-300 font-semibold'
                        : 'text-purple-200 hover:bg-[#443C68] hover:text-fuchsia-200'
                    }`}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <NavLink
          to={to}
          className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg mb-1 transition-all ${
            isActive
              ? 'bg-gradient-to-r from-fuchsia-600/20 to-purple-500/10 text-fuchsia-300 font-semibold'
              : 'text-purple-200 hover:bg-[#393053] hover:text-fuchsia-200'
          }`}
        >
          {icon}
          <span className="ml-3 font-medium">{label}</span>
        </NavLink>
      )}
    </div>
  );
};

const Sidebar = ({ onCloseSidebar }: SidebarProps) => {
  const { logout } = useAuth();

  return (
    <aside className="w-64 h-full flex flex-col bg-gradient-to-b from-[#18122B] via-[#393053] to-[#443C68] border-r border-[#635985] shadow-xl">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-2">
          <Flower2 className="h-8 w-8 text-fuchsia-300 animate-spin-slow" />
          <span className="text-xl font-bold bg-clip-text text-transparent animated-gradient"
            style={{
              backgroundImage: 'linear-gradient(90deg,#F0A6CA,#A084E8,#8F43EE,#A084E8,#F0A6CA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            BloomCRM
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto">
        <NavItem
          to="/dashboard"
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
        />

        <NavItem
          to="/campaigns"
          icon={<BellRing size={20} />}
          label="Campaigns"
          hasSubmenu
          subItems={[
            { to: '/campaigns', label: 'All Campaigns' },
            { to: '/campaigns/create', label: 'Create Campaign' },
          ]}
        />

        <NavItem
          to="/customers"
          icon={<Users size={20} />}
          label="Customers"
        />

        <NavItem
          to="/analytics"
          icon={<BarChart3 size={20} />}
          label="Analytics"
        />
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-[#635985]">
        <button
          onClick={logout}
          className="flex w-full items-center px-4 py-2 text-purple-200 hover:bg-[#393053] hover:text-fuchsia-100 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span className="ml-3 font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;