'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { 
  HomeIcon, 
  FolderIcon, 
  WrenchScrewdriverIcon,
  EnvelopeIcon,
  ArrowRightOnRectangleIcon,
  SparklesIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import ProjectsManager from './ProjectsManager';
import SkillsManager from './SkillsManager';
import ContactMessages from './ContactMessages';
import DashboardOverview from './DashboardOverview';

type TabType = 'overview' | 'projects' | 'skills' | 'messages';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const { user, logout } = useAuth();

  const tabs = [
    { id: 'overview', name: 'Overview', icon: HomeIcon, color: 'from-blue-500 to-cyan-500' },
    { id: 'projects', name: 'Projects', icon: FolderIcon, color: 'from-purple-500 to-pink-500' },
    { id: 'skills', name: 'Skills', icon: WrenchScrewdriverIcon, color: 'from-green-500 to-emerald-500' },
    { id: 'messages', name: 'Messages', icon: EnvelopeIcon, color: 'from-orange-500 to-red-500' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'projects':
        return <ProjectsManager />;
      case 'skills':
        return <SkillsManager />;
      case 'messages':
        return <ContactMessages />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />

      {/* Premium Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-2xl shadow-premium border-b border-white/20">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-glow">
                <SparklesIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-black gradient-text">Admin Dashboard</h1>
                <p className="text-gray-600 font-medium">Welcome back, {user?.email}</p>
              </div>
            </motion.div>
            
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-glow transition-all duration-300"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span>Logout</span>
            </motion.button>
          </div>
        </div>
      </header>

      <div className="flex relative z-10">
        {/* Premium Sidebar */}
        <aside className="w-80 bg-white/80 backdrop-blur-2xl shadow-premium border-r border-white/20 min-h-screen">
          <nav className="p-8">
            <div className="space-y-3">
              {tabs.map((tab, index) => (
                <motion.button
                  key={tab.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 font-semibold ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-glow`
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-purple-50 hover:text-purple-600'
                  }`}
                >
                  <tab.icon className="w-6 h-6" />
                  <span>{tab.name}</span>
                  
                  {/* Active Indicator */}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="ml-auto w-2 h-2 bg-white rounded-full"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Premium Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 p-6 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl border border-white/50"
            >
              <div className="flex items-center space-x-3 mb-4">
                <ChartBarIcon className="w-6 h-6 text-purple-600" />
                <h3 className="font-bold text-gray-900">Quick Stats</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Portfolio Views</span>
                  <span className="font-bold text-purple-600">12.5K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">This Month</span>
                  <span className="font-bold text-green-600">+23%</span>
                </div>
              </div>
            </motion.div>
          </nav>
        </aside>

        {/* Premium Main Content */}
        <main className="flex-1 p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}