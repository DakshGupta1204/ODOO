'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BellIcon,
  CheckIcon,
  XMarkIcon,
  UserIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

// Mock notifications data
const mockNotifications = [
  {
    id: '1',
    type: 'swap_request',
    from: {
      id: 'user1',
      name: 'Marc Demo',
      profilePhoto: null,
      rating: 4.5
    },
    skillOffered: 'Java Script',
    skillWanted: 'React',
    message: 'Hey! I would love to learn React from you. I can teach you advanced JavaScript concepts in return.',
    timestamp: '2 hours ago',
    status: 'pending'
  },
  {
    id: '2',
    type: 'swap_request',
    from: {
      id: 'user2',
      name: 'Nayan',
      profilePhoto: null,
      rating: 3.8
    },
    skillOffered: 'Python',
    skillWanted: 'Web Development',
    message: 'I\'m interested in learning web development. I have 3 years of Python experience.',
    timestamp: '5 hours ago',
    status: 'pending'
  },
  {
    id: '3',
    type: 'swap_request',
    from: {
      id: 'user3',
      name: 'Sarah Wilson',
      profilePhoto: null,
      rating: 4.9
    },
    skillOffered: 'UI/UX Design',
    skillWanted: 'React',
    message: 'I\'d like to exchange my design skills for React development knowledge.',
    timestamp: '1 day ago',
    status: 'accepted'
  },
  {
    id: '4',
    type: 'swap_request',
    from: {
      id: 'user4',
      name: 'Mike Johnson',
      profilePhoto: null,
      rating: 4.2
    },
    skillOffered: 'Photography',
    skillWanted: 'JavaScript',
    message: 'Professional photographer looking to learn JavaScript for web projects.',
    timestamp: '2 days ago',
    status: 'rejected'
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');
  const itemsPerPage = 3;

  const filteredNotifications = notifications.filter(notification => 
    filter === 'all' || notification.status === filter
  );

  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNotifications = filteredNotifications.slice(startIndex, startIndex + itemsPerPage);

  const handleAccept = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, status: 'accepted' as const }
          : notif
      )
    );
  };

  const handleReject = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, status: 'rejected' as const }
          : notif
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'accepted':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm border-b border-gray-200"
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/home" 
                className="text-purple-600 hover:text-purple-700 transition-colors"
              >
                ← Back to Home
              </Link>
              <div className="flex items-center gap-2">
                <BellIcon className="w-6 h-6 text-purple-600" />
                <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
              </div>
            </div>
            <Link
              href="/profile"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Profile
            </Link>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 mt-4 bg-gray-100 rounded-lg p-1">
            {(['all', 'pending', 'accepted', 'rejected'] as const).map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => {
                  setFilter(filterOption);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-md font-medium transition-colors capitalize ${
                  filter === filterOption
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {filterOption}
                <span className="ml-2 text-sm">
                  ({notifications.filter(n => filterOption === 'all' || n.status === filterOption).length})
                </span>
              </button>
            ))}
          </div>
        </div>
      </motion.header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Notifications List */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {currentNotifications.length > 0 ? (
              currentNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-purple-100 flex items-center justify-center">
                          {notification.from.profilePhoto ? (
                            <Image
                              src={notification.from.profilePhoto}
                              alt={notification.from.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <UserIcon className="w-6 h-6 text-purple-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{notification.from.name}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm text-gray-600">{notification.from.rating}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm text-gray-500">{notification.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(notification.status)}`}>
                        {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                      </div>
                    </div>

                    {/* Skill Exchange Details */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-600">Offering:</label>
                          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm font-medium">
                            {notification.skillOffered}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-600">Wants to learn:</label>
                          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-medium">
                            {notification.skillWanted}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="mb-4">
                      <p className="text-gray-700 leading-relaxed">{notification.message}</p>
                    </div>

                    {/* Action Buttons */}
                    {notification.status === 'pending' && (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleAccept(notification.id)}
                          className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
                        >
                          <CheckIcon className="w-4 h-4" />
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(notification.id)}
                          className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2"
                        >
                          <XMarkIcon className="w-4 h-4" />
                          Reject
                        </button>
                      </div>
                    )}

                    {notification.status === 'accepted' && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-green-800 text-sm font-medium">
                          ✓ Request accepted! You can now start your skill exchange.
                        </p>
                      </div>
                    )}

                    {notification.status === 'rejected' && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-red-800 text-sm font-medium">
                          ✗ Request declined.
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center"
              >
                <BellIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No notifications found</h3>
                <p className="text-gray-500">
                  {filter === 'all' 
                    ? "You don't have any notifications yet."
                    : `No ${filter} notifications found.`
                  }
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-2 mt-8"
          >
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-purple-600 hover:bg-purple-50'
              }`}
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-lg font-medium ${
                  currentPage === page
                    ? 'bg-purple-600 text-white'
                    : 'text-purple-600 hover:bg-purple-50'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-purple-600 hover:bg-purple-50'
              }`}
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
