import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Scan, 
  Layers, 
  Key, 
  BarChart3, 
  Settings as SettingsIcon, 
  Info,
  Bell,
  HelpCircle,
  Search,
  ChevronRight,
  LogOut,
  User,
  Menu,
  X,
  Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { View, NavItem } from '@/src/types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  onViewChange: (view: View) => void;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'about', label: 'About', icon: 'Info' },
  { id: 'ocr', label: 'OCR Extraction', icon: 'Scan' },
  { id: 'batch', label: 'Batch Processing', icon: 'Layers' },
  { id: 'classification', label: 'Image Classification', icon: 'ImageIcon' },
  { id: 'api', label: 'API Management', icon: 'Key' },
  { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
  { id: 'settings', label: 'Settings', icon: 'SettingsIcon' },
];

const iconMap: Record<string, any> = {
  LayoutDashboard,
  Scan,
  Layers,
  ImageIcon,
  Key,
  BarChart3,
  SettingsIcon,
  Info,
};

export default function Layout({ children, currentView, onViewChange }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar when view changes on mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [currentView]);

  const SidebarContent = () => (
    <>
      <div className="p-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="bg-primary rounded-lg p-1.5 flex items-center justify-center shadow-lg shadow-primary/20">
            <Scan className="text-white size-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none tracking-tight">VisionAI</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Enterprise OCR</p>
          </div>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <X className="size-5" />
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
              )}
            >
              <Icon className={cn("size-5", isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300")} />
              <span className={cn("text-sm font-medium", isActive ? "font-bold" : "")}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-200 dark:border-slate-800">
        <div className="bg-primary/5 border border-primary/10 p-4 rounded-xl mb-4">
          <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Current Usage</p>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mb-2">
            <div className="bg-primary h-1.5 rounded-full w-2/3"></div>
          </div>
          <p className="text-[10px] text-slate-500">680 / 1,000 docs</p>
        </div>
        
        <div className="flex items-center gap-3 p-2">
          <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden border border-primary/10">
            <img 
              src="https://picsum.photos/seed/avatar/100/100" 
              alt="User" 
              className="size-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate">Alex Rivera</p>
            <p className="text-[10px] text-slate-500 font-medium uppercase">Pro Account</p>
          </div>
          <button className="text-slate-400 hover:text-rose-500 transition-colors">
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-background-dark border-r border-slate-200 dark:border-slate-800 z-50 flex flex-col lg:hidden"
          >
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark flex-col fixed h-full z-20">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 lg:px-8 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Menu className="size-6" />
            </button>
            <div className="relative w-full hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
              <input 
                type="text" 
                placeholder="Search documents, keys, or logs..."
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <button className="sm:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <Search className="size-5" />
            </button>
            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors relative">
              <Bell className="size-5" />
              <span className="absolute top-2 right-2 size-2 bg-rose-500 rounded-full border-2 border-white dark:border-background-dark"></span>
            </button>
            <button className="hidden sm:flex p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <HelpCircle className="size-5" />
            </button>
          </div>
        </header>

        {/* View Content */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
