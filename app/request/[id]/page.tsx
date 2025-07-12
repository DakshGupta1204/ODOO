'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { SparklesCore } from '@/components/ui/sparkles';

// Types
interface User {
  id: string;
  name: string;
  profilePhoto: string | null;
  rating: number;
  totalRatings: number;
  skillsOffered: string[];
  skillsWanted: string[];
}

interface SwapRequest {
  id: string;
  requester: User;
  provider: User;
  requestedSkill: string;
  offeredSkill: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  message: string;
  createdAt: string;
  scheduledDate: string | null;
  completedAt: string | null;
  feedback: string | null;
  rating: number | null;
}

// Mock data for swap requests
const mockSwapRequests: Record<string, SwapRequest> = {
  '1': {
    id: '1',
    requester: {
      id: 'user1',
      name: 'Marc Demo',
      profilePhoto: null,
      rating: 4.5,
      totalRatings: 12,
      skillsOffered: ['JavaScript', 'Python'],
      skillsWanted: ['Cooking', 'Graphic Design']
    },
    provider: {
      id: 'user2',
      name: 'Sarah Johnson',
      profilePhoto: null,
      rating: 4.8,
      totalRatings: 20,
      skillsOffered: ['Cooking', 'Photography'],
      skillsWanted: ['Web Development']
    },
    requestedSkill: 'Cooking',
    offeredSkill: 'JavaScript',
    status: 'pending', // pending, accepted, rejected, completed
    message: 'Hi Sarah! I would love to learn cooking from you. I can teach you JavaScript fundamentals and advanced concepts in return.',
    createdAt: '2025-01-10T10:00:00Z',
    scheduledDate: null,
    completedAt: null,
    feedback: null,
    rating: null
  },
  '2': {
    id: '2',
    requester: {
      id: 'user3',
      name: 'David Chen',
      profilePhoto: null,
      rating: 4.7,
      totalRatings: 15,
      skillsOffered: ['Machine Learning', 'Data Science'],
      skillsWanted: ['Guitar', 'Spanish']
    },
    provider: {
      id: 'user1',
      name: 'Marc Demo',
      profilePhoto: null,
      rating: 4.5,
      totalRatings: 12,
      skillsOffered: ['JavaScript', 'Python'],
      skillsWanted: ['Cooking', 'Graphic Design']
    },
    requestedSkill: 'Python',
    offeredSkill: 'Machine Learning',
    status: 'completed',
    message: 'I can teach you Machine Learning concepts and would love to learn Python from you!',
    createdAt: '2025-01-08T14:30:00Z',
    scheduledDate: '2025-01-12T16:00:00Z',
    completedAt: '2025-01-12T18:00:00Z',
    feedback: 'Excellent session! Marc explained Python concepts very clearly and the examples were practical.',
    rating: 5
  }
};

export default function RequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [request, setRequest] = useState<SwapRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [currentUser] = useState('user1'); // Mock current user

  useEffect(() => {
    // Simulate API call
    const fetchRequest = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const requestData = mockSwapRequests[params.id as string];
      if (requestData) {
        setRequest(requestData);
      }
      setIsLoading(false);
    };

    fetchRequest();
  }, [params.id]);

  const handleAcceptRequest = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setRequest(prev => prev ? { ...prev, status: 'accepted' } : null);
    setIsLoading(false);
  };

  const handleRejectRequest = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setRequest(prev => prev ? { ...prev, status: 'rejected' } : null);
    setIsLoading(false);
  };

  const handleCompleteSession = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setRequest(prev => prev ? { 
      ...prev, 
      status: 'completed',
      completedAt: new Date().toISOString()
    } : null);
    setShowFeedbackModal(true);
    setIsLoading(false);
  };

  const handleSubmitFeedback = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setRequest(prev => prev ? { 
      ...prev, 
      feedback,
      rating
    } : null);
    setShowFeedbackModal(false);
    setIsLoading(false);
  };

  const renderStars = (currentRating: number, interactive = false) => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      const isFilled = starValue <= (interactive ? (hoveredRating || rating) : currentRating);
      
      return (
        <motion.button
          key={index}
          type="button"
          disabled={!interactive}
          onMouseEnter={() => interactive && setHoveredRating(starValue)}
          onMouseLeave={() => interactive && setHoveredRating(0)}
          onClick={() => interactive && setRating(starValue)}
          whileHover={interactive ? { scale: 1.2 } : {}}
          whileTap={interactive ? { scale: 0.9 } : {}}
          className={`${interactive ? 'cursor-pointer' : 'cursor-default'} transition-colors`}
        >
          <svg 
            className={`w-6 h-6 ${isFilled ? 'text-yellow-400' : 'text-gray-300'}`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
          </svg>
        </motion.button>
      );
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'accepted': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading && !request) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-indigo-50"></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 relative z-10"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-center font-medium">Loading request details...</p>
        </motion.div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-indigo-50"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center relative z-10"
        >
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 max-w-md mx-auto">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Request Not Found</h1>
            <p className="text-gray-600 mb-6">The request you're looking for doesn't exist or has been removed.</p>
            <Link href="/home" className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium">
              ← Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const isRequester = currentUser === request.requester.id;
  const isProvider = currentUser === request.provider.id;
  const canTakeAction = (isProvider && request.status === 'pending') || 
                       ((isRequester || isProvider) && request.status === 'accepted');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-indigo-50"></div>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(138,43,226,0.02)_25%,rgba(138,43,226,0.02)_50%,transparent_50%,transparent_75%,rgba(138,43,226,0.02)_75%)] bg-[size:20px_20px]"></div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm"
      >
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring", stiffness: 200 }}
              className="text-gray-800 text-xl sm:text-2xl font-bold"
            >
              <Link href="/" className="hover:text-purple-600 transition-colors">SkillSwap</Link>
            </motion.div>
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex items-center space-x-4"
            >
              <Link href="/home" className="text-gray-600 hover:text-purple-600 border border-gray-300 px-4 py-2 rounded-lg hover:border-purple-300 transition-all text-sm lg:text-base">
                ← Back to Home
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="relative z-40 container mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Request Header */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 sm:p-8 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                  Skill Exchange Request
                </h1>
                <p className="text-gray-600">Request ID: #{request.id}</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className={`px-4 py-2 rounded-full border font-medium text-sm mt-4 sm:mt-0 ${getStatusColor(request.status)}`}
              >
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </motion.div>
            </div>

            {/* Participants */}
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Requester */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="bg-blue-50 rounded-2xl p-4 border border-blue-100"
              >
                <h3 className="text-gray-800 font-semibold mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
                  </svg>
                  Requester
                </h3>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium">{request.requester.name}</p>
                    <div className="flex items-center">
                      {renderStars(request.requester.rating)}
                      <span className="text-gray-600 text-sm ml-2">({request.requester.totalRatings})</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Provider */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="bg-green-50 rounded-2xl p-4 border border-green-100"
              >
                <h3 className="text-gray-800 font-semibold mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Provider
                </h3>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-200 to-green-300 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium">{request.provider.name}</p>
                    <div className="flex items-center">
                      {renderStars(request.provider.rating)}
                      <span className="text-gray-600 text-sm ml-2">({request.provider.totalRatings})</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Exchange Details */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Request Details */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3h2v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd"/>
                </svg>
                Exchange Details
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-gray-600 font-medium">Requested Skill:</span>
                  <span className="text-gray-800 font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm">
                    {request.requestedSkill}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-gray-600 font-medium">Offered Skill:</span>
                  <span className="text-gray-800 font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full text-sm">
                    {request.offeredSkill}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-gray-600 font-medium">Created:</span>
                  <span className="text-gray-800 text-sm font-medium">{formatDate(request.createdAt)}</span>
                </div>
                
                {request.scheduledDate && (
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-gray-600 font-medium">Scheduled:</span>
                    <span className="text-gray-800 text-sm font-medium">{formatDate(request.scheduledDate)}</span>
                  </div>
                )}
                
                {request.completedAt && (
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-gray-600 font-medium">Completed:</span>
                    <span className="text-gray-800 text-sm font-medium">{formatDate(request.completedAt)}</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Message & Actions */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="space-y-6"
            >
              {/* Message */}
              <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                  </svg>
                  Message
                </h2>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-gray-700 leading-relaxed">{request.message}</p>
                </div>
              </div>

              {/* Action Buttons */}
              {canTakeAction && (
                <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Actions</h2>
                  
                  {request.status === 'pending' && isProvider && (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAcceptRequest}
                        disabled={isLoading}
                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg disabled:opacity-50"
                      >
                        {isLoading ? 'Processing...' : 'Accept Request'}
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleRejectRequest}
                        disabled={isLoading}
                        className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-red-700 hover:to-rose-700 transition-all shadow-lg disabled:opacity-50"
                      >
                        {isLoading ? 'Processing...' : 'Decline Request'}
                      </motion.button>
                    </div>
                  )}
                  
                  {request.status === 'accepted' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCompleteSession}
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg disabled:opacity-50"
                    >
                      {isLoading ? 'Processing...' : 'Mark as Completed'}
                    </motion.button>
                  )}
                </div>
              )}
            </motion.div>
          </div>

          {/* Feedback Section */}
          {request.status === 'completed' && request.feedback && request.rating && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 sm:p-8"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                Session Feedback
              </h2>
              
              <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-100">
                <div className="flex items-center mb-4">
                  <span className="text-gray-700 font-medium mr-3">Rating:</span>
                  <div className="flex items-center">
                    {renderStars(request.rating)}
                    <span className="text-gray-800 font-semibold ml-3">{request.rating}/5</span>
                  </div>
                </div>
                
                <div>
                  <span className="text-gray-700 font-medium block mb-2">Feedback:</span>
                  <p className="text-gray-700 leading-relaxed">{request.feedback}</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Feedback Modal */}
      <AnimatePresence>
        {showFeedbackModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-6 sm:p-8 max-w-md w-full"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Session Feedback</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-3">Rate this session:</label>
                  <div className="flex justify-center space-x-2">
                    {renderStars(rating, true)}
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Your feedback:</label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Share your experience with this skill exchange..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none"
                  />
                </div>
                
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowFeedbackModal(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                  >
                    Skip
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmitFeedback}
                    disabled={!rating || isLoading}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg disabled:opacity-50"
                  >
                    {isLoading ? 'Submitting...' : 'Submit Feedback'}
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
