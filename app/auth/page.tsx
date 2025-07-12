'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { SparklesCore } from '@/components/ui/sparkles';
import { authApi, ApiErrorClass } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import { useToast } from '@/lib/toast-context';
import { useFormValidation } from '@/lib/use-form-validation';
import { PasswordStrength } from '@/components/ui/password-strength';

export default function AuthPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { showToast } = useToast();
  
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form validation for sign in
  const signInForm = useFormValidation(
    { email: '', password: '' },
    {
      email: { required: true, email: true },
      password: { required: true, minLength: 6 },
    }
  );

  // Form validation for sign up
  const signUpForm = useFormValidation(
    { email: '', password: '', confirmPassword: '', firstName: '', lastName: '' },
    {
      email: { required: true, email: true },
      password: { required: true, minLength: 6 },
      confirmPassword: { required: true, match: 'password' },
      firstName: { required: true, minLength: 2 },
      lastName: { required: true, minLength: 2 },
    }
  );

  // Form validation for forgot password
  const forgotPasswordForm = useFormValidation(
    { email: '' },
    {
      email: { required: true, email: true },
    }
  );

  const currentForm = showForgotPassword ? forgotPasswordForm : (activeTab === 'signin' ? signInForm : signUpForm);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    currentForm.handleChange(name, value);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    currentForm.handleBlur(name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentForm.validateForm()) {
      showToast('Please fix the errors in the form', 'error');
      return;
    }

    setIsLoading(true);
    
    try {
      if (activeTab === 'signin') {
        const response = await authApi.signIn({
          email: signInForm.values.email,
          password: signInForm.values.password,
        });
        
        login(response);
        showToast('Welcome back! You have been signed in successfully.', 'success');
        router.push('/home');
        
      } else if (activeTab === 'signup') {
        const response = await authApi.signUp({
          email: signUpForm.values.email,
          password: signUpForm.values.password,
          first_name: signUpForm.values.firstName,
          last_name: signUpForm.values.lastName,
        });
        
        login(response);
        showToast('Account created successfully! Welcome to SkillSwap!', 'success');
        router.push('/home');
      }
    } catch (error) {
      if (error instanceof ApiErrorClass) {
        showToast(error.message, 'error');
      } else {
        showToast('An unexpected error occurred. Please try again.', 'error');
      }
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle tab switching and reset forms
  const handleTabSwitch = (tab: 'signin' | 'signup') => {
    setActiveTab(tab);
    signInForm.reset();
    signUpForm.reset();
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!forgotPasswordForm.validateForm()) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    setIsLoading(true);
    
    try {
      await authApi.forgotPassword({
        email: forgotPasswordForm.values.email,
      });
      
      showToast('Password reset link sent to your email!', 'success');
      setShowForgotPassword(false);
      forgotPasswordForm.reset();
    } catch (error) {
      if (error instanceof ApiErrorClass) {
        showToast(error.message, 'error');
      } else {
        showToast('Failed to send reset email. Please try again.', 'error');
      }
      console.error('Forgot password error:', error);
    } finally {
      setIsLoading(false);
    }
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
                      value={forgotPasswordForm.values.email}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm transition-all"
                      placeholder="Enter your email"
                    />
                    {forgotPasswordForm.touched.email && forgotPasswordForm.errors.email && (
                      <p className="mt-1 text-sm text-red-300">{forgotPasswordForm.errors.email}</p>
                    )}
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
                    onClick={() => handleTabSwitch('signin')}
                    className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                      activeTab === 'signin'
                        ? 'bg-white text-purple-700 shadow-lg'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleTabSwitch('signup')}
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
                          <label htmlFor="firstName" className="block text-white font-medium mb-2">
                            First Name
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={signUpForm.values.firstName}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm transition-all"
                            placeholder="Enter your first name"
                          />
                          {signUpForm.touched.firstName && signUpForm.errors.firstName && (
                            <p className="mt-1 text-sm text-red-300">{signUpForm.errors.firstName}</p>
                          )}
                        </motion.div>
                      )}

                      {/* Last Name field for signup */}
                      {activeTab === 'signup' && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.35, duration: 0.5 }}
                        >
                          <label htmlFor="lastName" className="block text-white font-medium mb-2">
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={signUpForm.values.lastName}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm transition-all"
                            placeholder="Enter your last name"
                          />
                          {signUpForm.touched.lastName && signUpForm.errors.lastName && (
                            <p className="mt-1 text-sm text-red-300">{signUpForm.errors.lastName}</p>
                          )}
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
                          value={currentForm.values.email}
                          onChange={handleInputChange}
                          onBlur={handleInputBlur}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm transition-all"
                          placeholder="Enter your email"
                        />
                        {currentForm.touched.email && currentForm.errors.email && (
                          <p className="mt-1 text-sm text-red-300">{currentForm.errors.email}</p>
                        )}
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
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={activeTab === 'signin' ? signInForm.values.password : signUpForm.values.password}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            required
                            className="w-full px-4 py-3 pr-12 rounded-xl bg-white/10 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm transition-all"
                            placeholder="Enter your password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-200 hover:text-white transition-colors"
                          >
                            {showPassword ? (
                              // Eye slash icon (hidden)
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                              </svg>
                            ) : (
                              // Eye icon (visible)
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            )}
                          </button>
                        </div>
                        {((activeTab === 'signin' && signInForm.touched.password && signInForm.errors.password) ||
                          (activeTab === 'signup' && signUpForm.touched.password && signUpForm.errors.password)) && (
                          <p className="mt-1 text-sm text-red-300">
                            {activeTab === 'signin' ? signInForm.errors.password : signUpForm.errors.password}
                          </p>
                        )}
                        {activeTab === 'signup' && (
                          <PasswordStrength password={signUpForm.values.password} />
                        )}
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
                          <div className="relative">
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              id="confirmPassword"
                              name="confirmPassword"
                              value={signUpForm.values.confirmPassword}
                              onChange={handleInputChange}
                              onBlur={handleInputBlur}
                              required
                              className="w-full px-4 py-3 pr-12 rounded-xl bg-white/10 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm transition-all"
                              placeholder="Confirm your password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-200 hover:text-white transition-colors"
                            >
                              {showConfirmPassword ? (
                                // Eye slash icon (hidden)
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                </svg>
                              ) : (
                                // Eye icon (visible)
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              )}
                            </button>
                          </div>
                          {signUpForm.touched.confirmPassword && signUpForm.errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-300">{signUpForm.errors.confirmPassword}</p>
                          )}
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
