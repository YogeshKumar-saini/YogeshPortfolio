'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, EnvelopeOpenIcon, TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { ContactMessage } from '@/types';
import Button from '@/components/ui/Button';

export default function ContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/contact', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ read: true }),
      });

      if (response.ok) {
        setMessages(messages.map(msg => 
          msg._id === id ? { ...msg, read: true } : msg
        ));
      }
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        setMessages(messages.filter(msg => msg._id !== id));
        setSelectedMessage(null);
        toast.success('Message deleted successfully');
      } else {
        toast.error('Failed to delete message');
      }
    } catch (error) {
      toast.error('Failed to delete message');
    }
  };

  const handleMessageClick = (message: ContactMessage) => {
    setSelectedMessage(message);
    if (!message.read) {
      markAsRead(message._id!);
    }
  };

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
        <h2 className="text-3xl font-bold text-dark-900 mb-2">Contact Messages</h2>
        <p className="text-dark-600">View and manage messages from your portfolio</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={message._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleMessageClick(message)}
              className={`card p-4 cursor-pointer transition-all duration-300 ${
                selectedMessage?._id === message._id 
                  ? 'ring-2 ring-primary-500 bg-primary-50' 
                  : 'hover:bg-gray-50'
              } ${!message.read ? 'border-l-4 border-l-primary-500' : ''}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {message.read ? (
                    <EnvelopeOpenIcon className="w-5 h-5 text-gray-400" />
                  ) : (
                    <EnvelopeIcon className="w-5 h-5 text-primary-500" />
                  )}
                  <h3 className={`font-semibold ${!message.read ? 'text-dark-900' : 'text-dark-700'}`}>
                    {message.name}
                  </h3>
                </div>
                {!message.read && (
                  <div className="w-2 h-2 bg-primary-500 rounded-full" />
                )}
              </div>
              <p className="text-sm text-dark-600 mb-2">{message.subject}</p>
              <p className="text-xs text-dark-500">
                {new Date(message.createdAt!).toLocaleDateString()}
              </p>
            </motion.div>
          ))}

          {messages.length === 0 && (
            <div className="text-center py-12">
              <EnvelopeIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-dark-700 mb-2">No messages yet</h3>
              <p className="text-dark-500">Messages will appear here when visitors contact you</p>
            </div>
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card p-6"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-dark-900 mb-2">
                    {selectedMessage.subject}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-dark-600">
                    <span>From: {selectedMessage.name}</span>
                    <span>Email: {selectedMessage.email}</span>
                    {selectedMessage.phone && (
                      <span>Phone: {selectedMessage.phone}</span>
                    )}
                  </div>
                  <p className="text-xs text-dark-500 mt-1">
                    {new Date(selectedMessage.createdAt!).toLocaleString()}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(selectedMessage._id!)}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  <TrashIcon className="w-4 h-4" />
                </Button>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-dark-700 leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>

              <div className="flex space-x-4">
                <Button className="flex-1">
                  <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}>
                    Reply via Email
                  </a>
                </Button>
                {selectedMessage.phone && (
                  <Button variant="outline" className="flex-1">
                    <a href={`tel:${selectedMessage.phone}`}>
                      Call
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="card p-12 text-center">
              <EnvelopeIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-dark-700 mb-2">Select a message</h3>
              <p className="text-dark-500">Choose a message from the list to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}