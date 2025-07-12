'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { SparklesCore } from '@/components/ui/sparkles';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    // Handle success/error here
    console.log('Form submitted:', { activeTab, formData });
  };

  const handleGoogleSignIn = () => {
    console.log('Google Sign In clicked');
    // Implement Google OAuth here
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    alert('Password reset link sent to your email!');
    setShowForgotPassword(false);
  };

  return (
    <div className="min-h-screen max-h-screen relative overflow-hidden">
      {/* Background Animation */}
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(108, 0, 162)"
        gradientBackgroundEnd="rgb(0, 17, 82)"
        firstColor="138, 43, 226"
        secondColor="30, 144, 255"
        thirdColor="147, 112, 219"
        fourthColor="75, 0, 130"
        fifthColor="139, 69, 19"
        pointerColor="140, 100, 255"
        interactive={true}
        containerClassName="absolute inset-0 z-0 h-full"
      />

      {/* Sparkles Overlay */}
      <div className="absolute inset-0 w-full h-full z-10">
        <SparklesCore
          id="tsparticles-auth"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={50}
          className="w-full h-full"
          particleColor="#ffffff"
        />
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-50 container mx-auto px-4 sm:px-6 py-4 flex-shrink-0"
      >
        <div className="flex justify-between items-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring", stiffness: 200 }}
            className="text-white text-xl sm:text-2xl font-bold"
          >
            <Link href="/">SkillSwap</Link>
          </motion.div>
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link href="/" className="text-white border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-purple-700 transition-all text-sm lg:text-base">
              Back to Home
            </Link>
          </motion.div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="relative z-50 flex items-center justify-center h-[calc(100vh-100px)] px-4 sm:px-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8, type: "spring", stiffness: 100 }}
          className="w-full max-w-md relative z-50 max-h-full"
        >
          {/* Auth Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 max-h-[calc(100vh-140px)] overflow-hidden flex flex-col">
            <div className="p-6 sm:p-8 overflow-y-auto scrollbar-hide">
              {showForgotPassword ? (
              // Forgot Password Form
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="text-2xl sm:text-3xl font-bold text-white mb-2"
                  >
                    Reset Password
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-purple-100"
                  >
                    Enter your email to receive a reset link
                  </motion.p>
                </div>

                <form onSubmit={handleForgotPassword} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <label htmlFor="reset-email" className="block text-white font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="reset-email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm transition-all"
                      placeholder="Enter your email"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="space-y-4"
                  >
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all shadow-lg disabled:opacity-50"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending...
                        </div>
                      ) : (
                        'Send Reset Link'
                      )}
                    </motion.button>

                    <motion.button
                      type="button"
                      onClick={() => setShowForgotPassword(false)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full text-purple-200 hover:text-white transition-colors"
                    >
                      ← Back to Sign In
                    </motion.button>
                  </motion.div>
                </form>
              </motion.div>
            ) : (
              // Main Auth Forms
              <>
                {/* Tab Selector */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="flex bg-white/10 rounded-2xl p-1 mb-8"
                >
                  <button
                    onClick={() => setActiveTab('signin')}
                    className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                      activeTab === 'signin'
                        ? 'bg-white text-purple-700 shadow-lg'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setActiveTab('signup')}
                    className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                      activeTab === 'signup'
                        ? 'bg-white text-purple-700 shadow-lg'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    Sign Up
                  </button>
                </motion.div>

                {/* Form Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: activeTab === 'signin' ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: activeTab === 'signin' ? 50 : -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center mb-6">
                      <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="text-2xl sm:text-3xl font-bold text-white mb-2"
                      >
                        {activeTab === 'signin' ? 'Welcome Back!' : 'Join SkillSwap'}
                      </motion.h2>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-purple-100"
                      >
                        {activeTab === 'signin' 
                          ? 'Sign in to continue your skill exchange journey' 
                          : 'Create an account to start exchanging skills'
                        }
                      </motion.p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name field for signup */}
                      {activeTab === 'signup' && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                        >
                          <label htmlFor="name" className="block text-white font-medium mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm transition-all"
                            placeholder="Enter your full name"
                          />
                        </motion.div>
                      )}

                      {/* Email field */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: activeTab === 'signup' ? 0.4 : 0.3, duration: 0.5 }}
                      >
                        <label htmlFor="email" className="block text-white font-medium mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm transition-all"
                          placeholder="Enter your email"
                        />
                      </motion.div>

                      {/* Password field */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: activeTab === 'signup' ? 0.5 : 0.4, duration: 0.5 }}
                      >
                        <label htmlFor="password" className="block text-white font-medium mb-2">
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm transition-all"
                          placeholder="Enter your password"
                        />
                      </motion.div>

                      {/* Confirm Password for signup */}
                      {activeTab === 'signup' && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6, duration: 0.5 }}
                        >
                          <label htmlFor="confirmPassword" className="block text-white font-medium mb-2">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm transition-all"
                            placeholder="Confirm your password"
                          />
                        </motion.div>
                      )}

                      {/* Forgot Password Link for signin */}
                      {activeTab === 'signin' && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                          className="text-right"
                        >
                          <button
                            type="button"
                            onClick={() => setShowForgotPassword(true)}
                            className="text-purple-200 hover:text-white transition-colors text-sm"
                          >
                            Forgot Password?
                          </button>
                        </motion.div>
                      )}

                      {/* Submit Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: activeTab === 'signup' ? 0.7 : 0.6, duration: 0.5 }}
                      >
                        <motion.button
                          type="submit"
                          disabled={isLoading}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all shadow-lg disabled:opacity-50"
                        >
                          {isLoading ? (
                            <div className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                              {activeTab === 'signin' ? 'Signing In...' : 'Creating Account...'}
                            </div>
                          ) : (
                            activeTab === 'signin' ? 'Sign In' : 'Create Account'
                          )}
                        </motion.button>
                      </motion.div>

                      {/* Divider */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: activeTab === 'signup' ? 0.8 : 0.7, duration: 0.5 }}
                        className="relative"
                      >
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-white/20"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white/10 text-purple-200 backdrop-blur-sm rounded-lg">Or continue with</span>
                        </div>
                      </motion.div>

                      {/* Google Sign In */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: activeTab === 'signup' ? 0.9 : 0.8, duration: 0.5 }}
                      >
                        <motion.button
                          type="button"
                          onClick={handleGoogleSignIn}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-white text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all shadow-lg flex items-center justify-center"
                        >
                          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          Continue with Google
                        </motion.button>
                      </motion.div>
                    </form>
                  </motion.div>
                </AnimatePresence>
              </>
            )}
            </div>
          </div>

          {/* Additional Links */}
          {!showForgotPassword && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="text-center mt-2"
            >
              <p className="text-purple-200">
                {activeTab === 'signin' ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setActiveTab(activeTab === 'signin' ? 'signup' : 'signin')}
                  className="text-white font-semibold hover:underline"
                >
                  {activeTab === 'signin' ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
