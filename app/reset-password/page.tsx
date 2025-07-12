'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { SparklesCore } from '@/components/ui/sparkles';
import { authApi, ApiErrorClass } from '@/lib/api';
import { useToast } from '@/lib/toast-context';
import { useFormValidation } from '@/lib/use-form-validation';
import { PasswordStrength } from '@/components/ui/password-strength';

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  
  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useFormValidation(
    { password: '', confirmPassword: '' },
    {
      password: { required: true, minLength: 6 },
      confirmPassword: { required: true, match: 'password' },
    }
  );

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (!tokenParam) {
      showToast('Invalid reset token. Please request a new password reset.', 'error');
      router.push('/auth');
      return;
    }
    setToken(tokenParam);
  }, [searchParams, router, showToast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    form.handleChange(name, value);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    form.handleBlur(name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      showToast('Invalid reset token. Please request a new password reset.', 'error');
      return;
    }

    if (!form.validateForm()) {
      showToast('Please fix the errors in the form', 'error');
      return;
    }

    setIsLoading(true);
    
    try {
      await authApi.resetPassword({
        token,
        new_password: form.values.password,
      });
      
      showToast('Password reset successfully! Please sign in with your new password.', 'success');
      router.push('/auth');
    } catch (error) {
      if (error instanceof ApiErrorClass) {
        showToast(error.message, 'error');
      } else {
        showToast('Failed to reset password. Please try again.', 'error');
      }
      console.error('Reset password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

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
          id="tsparticles-reset"
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
            <Link href="/auth" className="text-white border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-purple-700 transition-all text-sm lg:text-base">
              Back to Sign In
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
          {/* Reset Password Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 max-h-[calc(100vh-140px)] overflow-hidden flex flex-col">
            <div className="p-6 sm:p-8 overflow-y-auto scrollbar-hide">
              <motion.div
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="text-2xl sm:text-3xl font-bold text-white mb-2"
                  >
                    Create New Password
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-purple-100"
                  >
                    Enter your new password below
                  </motion.p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* New Password field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <label htmlFor="password" className="block text-white font-medium mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={form.values.password}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        required
                        className="w-full px-4 py-3 pr-12 rounded-xl bg-white/10 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm transition-all"
                        placeholder="Enter your new password"
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
                    {form.touched.password && form.errors.password && (
                      <p className="mt-1 text-sm text-red-300">{form.errors.password}</p>
                    )}
                    <PasswordStrength password={form.values.password} />
                  </motion.div>

                  {/* Confirm Password field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <label htmlFor="confirmPassword" className="block text-white font-medium mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={form.values.confirmPassword}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        required
                        className="w-full px-4 py-3 pr-12 rounded-xl bg-white/10 border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm transition-all"
                        placeholder="Confirm your new password"
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
                    {form.touched.confirmPassword && form.errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-300">{form.errors.confirmPassword}</p>
                    )}
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
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
                          Resetting Password...
                        </div>
                      ) : (
                        'Reset Password'
                      )}
                    </motion.button>
                  </motion.div>
                </form>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
