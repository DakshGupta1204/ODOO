'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { SparklesCore } from '@/components/ui/sparkles';

// Mock data for demonstration
const mockUsers = [
  {
    id: 1,
    name: "Marc Demo",
    profilePhoto: null,
    skillsOffered: ["JavaScript", "Python"],
    skillsWanted: ["Cooking", "Graphic Design"],
    rating: 4.5,
    totalRatings: 12,
    availability: "Weekends",
    bio: "Full-stack developer with 5 years of experience. Passionate about teaching programming concepts and learning new creative skills.",
    feedback: [
      { author: "Sarah", rating: 5, comment: "Excellent JavaScript teacher! Very patient and explains concepts clearly.", date: "2025-01-05" },
      { author: "David", rating: 4, comment: "Great Python sessions. Marc knows his stuff and is very helpful.", date: "2025-01-02" },
      { author: "Emma", rating: 5, comment: "Amazing mentor! Helped me understand complex algorithms easily.", date: "2024-12-28" }
    ],
    skillDetails: {
      "JavaScript": "Advanced level - React, Node.js, ES6+, TypeScript. Can teach from basics to advanced concepts.",
      "Python": "Expert level - Django, Flask, Data Science, Machine Learning. 3+ years of professional experience."
    },
    wantedSkillDetails: {
      "Cooking": "Beginner level - Want to learn basic cooking techniques and healthy meal preparation.",
      "Graphic Design": "Beginner level - Interested in learning Photoshop, Illustrator, and design principles."
    }
  },
  {
    id: 2,
    name: "Sarah Johnson",
    profilePhoto: null,
    skillsOffered: ["Cooking", "Photography"],
    skillsWanted: ["Web Development", "Spanish"],
    rating: 4.8,
    totalRatings: 20,
    availability: "Evenings",
    bio: "Professional chef and photography enthusiast. Love sharing culinary skills and capturing beautiful moments.",
    feedback: [
      { author: "Marc", rating: 5, comment: "Sarah is an amazing cook! Learned so much about Italian cuisine.", date: "2025-01-08" },
      { author: "Alex", rating: 5, comment: "Great photography tips! Really improved my portrait skills.", date: "2025-01-03" },
      { author: "Lisa", rating: 4, comment: "Wonderful cooking teacher. Very organized and patient.", date: "2024-12-30" }
    ],
    skillDetails: {
      "Cooking": "Professional level - Italian, French, Asian cuisines. 10+ years experience as a chef.",
      "Photography": "Advanced level - Portrait, landscape, food photography. Professional equipment available."
    },
    wantedSkillDetails: {
      "Web Development": "Beginner level - Want to build a website for my catering business.",
      "Spanish": "Intermediate level - Looking to improve conversational skills for travel."
    }
  },
  {
    id: 3,
    name: "David Chen",
    profilePhoto: null,
    skillsOffered: ["Machine Learning", "Data Science"],
    skillsWanted: ["Guitar", "Spanish"],
    rating: 4.7,
    totalRatings: 15,
    availability: "Weekends",
    bio: "Data scientist with PhD in Machine Learning. Passionate about making complex topics accessible to everyone.",
    feedback: [
      { author: "Jennifer", rating: 5, comment: "David explained ML concepts beautifully! Very knowledgeable.", date: "2025-01-06" },
      { author: "Mike", rating: 4, comment: "Great data science mentor. Helped me with my project.", date: "2025-01-01" },
      { author: "Anna", rating: 5, comment: "Excellent teacher! Made statistics fun and easy to understand.", date: "2024-12-29" }
    ],
    skillDetails: {
      "Machine Learning": "Expert level - Deep Learning, NLP, Computer Vision. Research and industry experience.",
      "Data Science": "Expert level - Python, R, SQL, Statistical Analysis. 7+ years experience."
    },
    wantedSkillDetails: {
      "Guitar": "Beginner level - Always wanted to learn acoustic guitar and basic chords.",
      "Spanish": "Beginner level - Planning to travel to South America."
    }
  },
  {
    id: 4,
    name: "Emma Wilson",
    profilePhoto: null,
    skillsOffered: ["Graphic Design", "UI/UX Design"],
    skillsWanted: ["Photography", "Marketing"],
    rating: 4.6,
    totalRatings: 18,
    availability: "Flexible",
    bio: "Creative designer with a passion for user experience and visual storytelling. Love helping others bring their ideas to life.",
    feedback: [
      { author: "Tom", rating: 5, comment: "Emma redesigned my app interface. Incredible attention to detail!", date: "2025-01-07" },
      { author: "Rachel", rating: 4, comment: "Great design principles teacher. Very creative and inspiring.", date: "2025-01-04" },
      { author: "John", rating: 5, comment: "Helped me create a stunning portfolio. Highly recommended!", date: "2024-12-31" }
    ],
    skillDetails: {
      "Graphic Design": "Professional level - Adobe Creative Suite, Brand Identity, Print Design. 6+ years experience.",
      "UI/UX Design": "Advanced level - Figma, Sketch, User Research, Prototyping. Mobile and web design."
    },
    wantedSkillDetails: {
      "Photography": "Intermediate level - Want to improve product photography for design projects.",
      "Marketing": "Beginner level - Need to learn digital marketing for freelance business."
    }
  }
];

const availabilityOptions = ["All", "Weekends", "Evenings", "Weekdays", "Flexible"];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state
  const [showRequests, setShowRequests] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestForm, setRequestForm] = useState({
    offeredSkill: '',
    requestedSkill: '',
    message: ''
  });
  
  const itemsPerPage = 3;

  const handleSubmitRequest = async () => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowRequestModal(false);
    setRequestForm({ offeredSkill: '', requestedSkill: '', message: '' });
    // You could add success notification here
  };

  const renderStarsForRating = (rating: number) => {
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

  // Mock requests data
  const mockRequests = [
    {
      id: '1',
      requester: 'Marc Demo',
      provider: 'Sarah Johnson',
      requestedSkill: 'Cooking',
      offeredSkill: 'JavaScript',
      status: 'pending',
      createdAt: '2025-01-10T10:00:00Z'
    },
    {
      id: '2',
      requester: 'David Chen',
      provider: 'Marc Demo',
      requestedSkill: 'Python',
      offeredSkill: 'Machine Learning',
      status: 'completed',
      createdAt: '2025-01-08T14:30:00Z'
    }
  ];

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
                    onClick={() => setShowRequests(!showRequests)}
                    className={`hidden md:block transition-colors px-3 py-2 rounded-lg ${
                      showRequests 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
                    }`}
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

          {/* Requests View */}
          {showRequests && isLoggedIn && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 sm:p-8 border border-purple-100/50 mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3h2v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd"/>
                  </svg>
                  My Skill Exchange Requests
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowRequests(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              <div className="space-y-4">
                {mockRequests.map((request, index) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-200/50 hover:shadow-lg transition-all"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            request.status === 'pending' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : request.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(request.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-1">
                          {request.requester} ↔ {request.provider}
                        </h3>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium text-blue-600">{request.offeredSkill}</span>
                          {' for '}
                          <span className="font-medium text-green-600">{request.requestedSkill}</span>
                        </p>
                      </div>
                      <Link href={`/request/${request.id}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all font-medium text-sm shadow-lg"
                        >
                          View Details
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
                
                {mockRequests.length === 0 && (
                  <div className="text-center py-8">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p className="text-gray-500">No requests yet. Start by making a skill exchange request!</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* User Cards */}
          {!showRequests && (
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

                  {/* Action Buttons */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.7 + index * 0.1, duration: 0.4 }}
                    className="flex flex-col gap-2 items-end w-full sm:w-auto"
                  >
                    {/* Details Button */}
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedUser(user);
                        setShowDetailsModal(true);
                      }}
                      className="w-full sm:w-auto bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 sm:px-6 py-2 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all font-medium shadow-lg text-sm sm:text-base"
                    >
                      View Details
                    </motion.button>

                    {/* Request Button */}
                    {isLoggedIn ? (
                      <motion.button 
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedUser(user);
                          setShowRequestModal(true);
                        }}
                        className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 sm:px-6 py-2 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all font-medium shadow-lg text-sm sm:text-base"
                      >
                        Request Exchange
                      </motion.button>
                    ) : (
                      <motion.button 
                        disabled
                        className="w-full sm:w-auto bg-gray-300 text-gray-500 px-4 sm:px-6 py-2 rounded-xl cursor-not-allowed font-medium shadow-md text-sm sm:text-base"
                        title="Please login to make requests"
                      >
                        Request Exchange
                      </motion.button>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
            </motion.div>
          )}

          {/* No Results Message */}
          {!showRequests && filteredUsers.length === 0 && (
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
          {!showRequests && totalPages > 1 && (
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

      {/* Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDetailsModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedUser.name}</h2>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center">
                        {renderStarsForRating(selectedUser.rating)}
                      </div>
                      <span className="text-gray-600 text-sm">
                        {selectedUser.rating}/5 ({selectedUser.totalRatings} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">About</h3>
                <p className="text-gray-600 leading-relaxed">{selectedUser.bio}</p>
              </div>

              {/* Skills Offered Details */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Skills Offered</h3>
                <div className="space-y-3">
                  {selectedUser.skillsOffered.map((skill, index) => (
                    <div key={index} className="bg-green-50 rounded-lg p-4 border border-green-100">
                      <h4 className="font-medium text-green-800 mb-1">{skill}</h4>
                      <p className="text-green-700 text-sm">
                        {(selectedUser.skillDetails as any)?.[skill] || 'Details not available'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Wanted Details */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Skills Wanted</h3>
                <div className="space-y-3">
                  {selectedUser.skillsWanted.map((skill, index) => (
                    <div key={index} className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                      <h4 className="font-medium text-blue-800 mb-1">{skill}</h4>
                      <p className="text-blue-700 text-sm">
                        {(selectedUser.wantedSkillDetails as any)?.[skill] || 'Details not available'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feedback Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Recent Feedback ({selectedUser.feedback.length} reviews)
                </h3>
                <div className="space-y-4 max-h-60 overflow-y-auto">
                  {selectedUser.feedback.map((review, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-800">{review.author}</span>
                          <div className="flex items-center">
                            {renderStarsForRating(review.rating)}
                          </div>
                        </div>
                        <span className="text-gray-500 text-sm">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDetailsModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                >
                  Close
                </motion.button>
                {isLoggedIn && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowDetailsModal(false);
                      setShowRequestModal(true);
                    }}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg"
                  >
                    Request Exchange
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Request Modal */}
      <AnimatePresence>
        {showRequestModal && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowRequestModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-6 sm:p-8 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Request Skill Exchange</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowRequestModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Exchange with: <span className="text-purple-600">{selectedUser.name}</span>
                  </label>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Your Skill to Offer:</label>
                  <select
                    value={requestForm.offeredSkill}
                    onChange={(e) => setRequestForm(prev => ({ ...prev, offeredSkill: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                  >
                    <option value="">Select a skill you can teach...</option>
                    {/* You would normally get these from a user's profile */}
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Photography">Photography</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Skill You Want to Learn:</label>
                  <select
                    value={requestForm.requestedSkill}
                    onChange={(e) => setRequestForm(prev => ({ ...prev, requestedSkill: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                  >
                    <option value="">Select a skill you want to learn...</option>
                    {selectedUser.skillsOffered.map((skill, index) => (
                      <option key={index} value={skill}>{skill}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Message:</label>
                  <textarea
                    value={requestForm.message}
                    onChange={(e) => setRequestForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Introduce yourself and explain what you'd like to learn..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowRequestModal(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmitRequest}
                    disabled={!requestForm.offeredSkill || !requestForm.requestedSkill || !requestForm.message}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send Request
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
