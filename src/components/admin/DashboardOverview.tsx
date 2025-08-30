'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FolderIcon, 
  WrenchScrewdriverIcon,
  EnvelopeIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

interface Stats {
  totalProjects: number;
  totalSkills: number;
  unreadMessages: number;
  totalViews: number;
}

export default function DashboardOverview() {
  const [stats, setStats] = useState<Stats>({
    totalProjects: 0,
    totalSkills: 0,
    unreadMessages: 0,
    totalViews: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      icon: FolderIcon,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Skills',
      value: stats.totalSkills,
      icon: WrenchScrewdriverIcon,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Unread Messages',
      value: stats.unreadMessages,
      icon: EnvelopeIcon,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Portfolio Views',
      value: stats.totalViews,
      icon: EyeIcon,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-dark-900 mb-2">Dashboard Overview</h2>
        <p className="text-dark-600">Monitor your portfolio performance and manage content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`card p-6 ${stat.bgColor}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-600 text-sm font-medium">{stat.title}</p>
                <p className="text-3xl font-bold text-dark-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h3 className="text-xl font-bold text-dark-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all duration-300 text-center">
            <FolderIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="font-medium text-dark-700">Add New Project</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all duration-300 text-center">
            <WrenchScrewdriverIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="font-medium text-dark-700">Manage Skills</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all duration-300 text-center">
            <EnvelopeIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="font-medium text-dark-700">View Messages</p>
          </button>
        </div>
      </div>
    </div>
  );
}