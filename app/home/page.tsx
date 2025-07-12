'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SparklesCore } from '@/components/ui/sparkles';

// Mock data for demonstration
const mockUsers = [
  {
    id: 1,
    name: "Marc Demo",
    profilePhoto: null,
    skillsOffered: ["Java Script", "Python"],
    skillsWanted: ["Cooking", "Graphic Design"],
    rating: 3.0,
    totalRatings: 5,
    availability: "Weekends"
  },
  {
    id: 2,
    name: "Michell",
    profilePhoto: null,
    skillsOffered: ["Java Script", "Python"],
    skillsWanted: ["Cooking", "Graphic Design"],
    rating: 2.5,
    totalRatings: 5,
    availability: "Evenings"
  },
  {
    id: 3,
    name: "Joe Wills",
    profilePhoto: null,
    skillsOffered: ["Java Script", "Python"],
    skillsWanted: ["Cooking", "Graphic Design"],
    rating: 4.0,
    totalRatings: 5,
    availability: "Weekdays"
  },
  {
    id: 4,
    name: "Sarah Johnson",
    profilePhoto: null,
    skillsOffered: ["React", "Design"],
    skillsWanted: ["Photography", "Writing"],
    rating: 4.5,
    totalRatings: 12,
    availability: "Weekends"
  },
  {
    id: 5,
    name: "David Chen",
    profilePhoto: null,
    skillsOffered: ["Machine Learning", "Data Science"],
    skillsWanted: ["Guitar", "Spanish"],
    rating: 4.8,
    totalRatings: 20,
    availability: "Evenings"
  },
  {
    id: 6,
    name: "Emma Wilson",
    profilePhoto: null,
    skillsOffered: ["Photography", "Photoshop"],
    skillsWanted: ["Web Development", "Marketing"],
    rating: 4.2,
    totalRatings: 8,
    availability: "Flexible"
  }
];

const availabilityOptions = ["All", "Weekends", "Evenings", "Weekdays", "Flexible"];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state
  
  const itemsPerPage = 3;

  // Filter users based on search and availability
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = searchTerm === '' || 
      user.skillsOffered.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      user.skillsWanted.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAvailability = selectedAvailability === 'All' || user.availability === selectedAvailability;
    
    return matchesSearch && matchesAvailability;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor"/>
              <stop offset="50%" stopColor="transparent"/>
            </linearGradient>
          </defs>
          <path fill="url(#half)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      );
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" viewBox="0 0 20 20">
          <path fill="currentColor" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      );
    }
    
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-50">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/80 backdrop-blur-md shadow-lg border-b border-purple-100/50 sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Link href="/" className="text-purple-700 text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                SkillSwap
              </Link>
            </motion.div>
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center space-x-2 sm:space-x-4"
            >
              {isLoggedIn ? (
                <>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="hidden sm:block text-gray-600 hover:text-purple-700 transition-colors px-3 py-2 rounded-lg hover:bg-purple-50"
                  >
                    Profile
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="hidden md:block text-gray-600 hover:text-purple-700 transition-colors px-3 py-2 rounded-lg hover:bg-purple-50"
                  >
                    My Requests
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsLoggedIn(false)}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg text-sm sm:text-base"
                  >
                    Logout
                  </motion.button>
                </>
              ) : (
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsLoggedIn(true)}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all font-medium shadow-lg text-sm sm:text-base"
                >
                  Login
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="relative">
        {/* Sparkles Background */}
        <div className="absolute inset-0 w-full h-full">
          <SparklesCore
            id="tsparticles-home"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={40}
            className="w-full h-full"
            particleColor="#8b5cf6"
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10">
          {/* Search and Filter Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-6 sm:mb-8"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-xl border border-purple-100/50"
            >
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                {/* Availability Filter */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full lg:w-auto"
                >
                  <label htmlFor="availability" className="text-gray-700 font-medium text-sm sm:text-base">
                    Availability:
                  </label>
                  <select
                    id="availability"
                    value={selectedAvailability}
                    onChange={(e) => setSelectedAvailability(e.target.value)}
                    className="w-full sm:w-auto border border-purple-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-white/70 backdrop-blur-sm text-black text-sm sm:text-base"
                  >
                    {availabilityOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </motion.div>

                {/* Search Bar */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 flex-1 w-full lg:max-w-md"
                >
                  <input
                    type="text"
                    placeholder="Search skills or users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 w-full border border-purple-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-white/70 backdrop-blur-sm text-black text-sm sm:text-base"
                  />
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 sm:px-6 py-2 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg text-sm sm:text-base"
                  >
                    Search
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Note for non-logged in users */}
          {!isLoggedIn && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200/50 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 backdrop-blur-sm shadow-lg"
            >
              <p className="text-yellow-800 text-sm sm:text-base">
                <span className="font-semibold">Note:</span> Only public profiles are visible. 
                Please log in to see all profiles and make requests.
              </p>
            </motion.div>
          )}

          {/* User Cards */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="space-y-4 sm:space-y-6"
          >
            {paginatedUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6 border border-purple-100/50 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="flex items-start space-x-3 sm:space-x-4 flex-1 w-full">
                    {/* Profile Photo */}
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full flex items-center justify-center overflow-hidden shadow-lg flex-shrink-0"
                    >
                      {user.profilePhoto ? (
                        <img src={user.profilePhoto} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      )}
                    </motion.div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <motion.h3 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
                        className="text-lg sm:text-xl font-semibold text-gray-800 mb-2"
                      >
                        {user.name}
                      </motion.h3>
                      
                      {/* Skills Offered */}
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.3 + index * 0.1, duration: 0.4 }}
                        className="mb-3"
                      >
                        <span className="text-xs sm:text-sm font-medium text-green-700 mr-2 block sm:inline">Skills Offered:</span>
                        <div className="flex flex-wrap gap-1 sm:gap-2 mt-1 sm:mt-0 sm:inline-flex">
                          {user.skillsOffered.map((skill, skillIndex) => (
                            <motion.span 
                              key={skillIndex}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 1.4 + index * 0.1 + skillIndex * 0.1, duration: 0.3 }}
                              whileHover={{ scale: 1.1 }}
                              className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-xs px-2 sm:px-3 py-1 rounded-full shadow-sm border border-green-200"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>

                      {/* Skills Wanted */}
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.4 + index * 0.1, duration: 0.4 }}
                        className="mb-3"
                      >
                        <span className="text-xs sm:text-sm font-medium text-blue-700 mr-2 block sm:inline">Skills Wanted:</span>
                        <div className="flex flex-wrap gap-1 sm:gap-2 mt-1 sm:mt-0 sm:inline-flex">
                          {user.skillsWanted.map((skill, skillIndex) => (
                            <motion.span 
                              key={skillIndex}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 1.5 + index * 0.1 + skillIndex * 0.1, duration: 0.3 }}
                              whileHover={{ scale: 1.1 }}
                              className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-xs px-2 sm:px-3 py-1 rounded-full shadow-sm border border-blue-200"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>

                      {/* Rating */}
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.6 + index * 0.1, duration: 0.4 }}
                        className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600"
                      >
                        <span className="font-medium">Rating:</span>
                        <div className="flex items-center space-x-1">
                          {renderStars(user.rating)}
                        </div>
                        <span className="bg-gradient-to-r from-purple-100 to-indigo-100 px-2 py-1 rounded-full text-purple-700 font-medium text-xs sm:text-sm">
                          {user.rating}/5 ({user.totalRatings})
                        </span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Request Button */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.7 + index * 0.1, duration: 0.4 }}
                    className="flex flex-col items-end w-full sm:w-auto"
                  >
                    {isLoggedIn ? (
                      <motion.button 
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 sm:px-6 py-2 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all font-medium shadow-lg text-sm sm:text-base"
                      >
                        Request
                      </motion.button>
                    ) : (
                      <motion.button 
                        disabled
                        className="w-full sm:w-auto bg-gray-300 text-gray-500 px-4 sm:px-6 py-2 rounded-xl cursor-not-allowed font-medium shadow-md text-sm sm:text-base"
                        title="Please login to make requests"
                      >
                        Request
                      </motion.button>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* No Results Message */}
          {filteredUsers.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="text-center py-8 sm:py-12"
            >
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl border border-purple-100/50">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
                  className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full mx-auto mb-4 flex items-center justify-center"
                >
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </motion.div>
                <div className="text-gray-500 text-base sm:text-lg font-medium">No users found matching your criteria.</div>
                <p className="text-gray-400 mt-2 text-sm sm:text-base">Try adjusting your search or filter options.</p>
              </div>
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="flex justify-center items-center space-x-1 sm:space-x-2 mt-6 sm:mt-8 px-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 sm:px-4 py-2 rounded-xl border border-purple-200 text-gray-700 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed bg-white/80 backdrop-blur-sm shadow-md transition-all text-sm sm:text-base"
              >
                ‹
              </motion.button>
              
              <div className="flex space-x-1 sm:space-x-2 overflow-x-auto max-w-xs sm:max-w-none">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <motion.button
                    key={page}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.6 + page * 0.1, duration: 0.3 }}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 sm:px-4 py-2 rounded-xl border transition-all shadow-md text-sm sm:text-base whitespace-nowrap ${
                      currentPage === page
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-600 shadow-lg'
                        : 'border-purple-200 text-gray-700 hover:bg-purple-50 bg-white/80 backdrop-blur-sm'
                    }`}
                  >
                    {page}
                  </motion.button>
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 sm:px-4 py-2 rounded-xl border border-purple-200 text-gray-700 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed bg-white/80 backdrop-blur-sm shadow-md transition-all text-sm sm:text-base"
              >
                ›
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
