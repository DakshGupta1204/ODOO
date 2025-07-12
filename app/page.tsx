
'use client';

import Link from 'next/link';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { SparklesCore } from '@/components/ui/sparkles';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <>
      {/* Hero Section with Animated Background */}
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
        className="min-h-screen"
      >
        {/* Navigation */}
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto px-4 sm:px-6 py-4 relative z-50"
        >
          <div className="flex justify-between items-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring", stiffness: 200 }}
              className="text-white text-xl sm:text-2xl font-bold"
            >
              SkillSwap
            </motion.div>
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="hidden lg:flex space-x-6 xl:space-x-8 text-white"
            >
              <Link href="#features" className="hover:text-purple-200 transition-colors text-sm lg:text-base">
                Features
              </Link>
              <Link href="#how-it-works" className="hover:text-purple-200 transition-colors text-sm lg:text-base">
                How It Works
              </Link>
              <Link href="#about" className="hover:text-purple-200 transition-colors text-sm lg:text-base">
                About
              </Link>
            </motion.div>
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 lg:space-x-4"
            >
              <Link href="/home" className="text-white border border-white px-3 sm:px-4 py-2 rounded-lg hover:bg-white hover:text-purple-700 transition-all text-sm lg:text-base text-center">
                Browse Skills
              </Link>
              <button className="bg-white text-purple-700 px-3 sm:px-4 py-2 rounded-lg hover:bg-purple-50 transition-all font-medium text-sm lg:text-base">
                Get Started
              </button>
            </motion.div>
          </div>
        </motion.nav>

        {/* Hero Content */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 text-center relative z-40"
        >
          <div className="max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
            >
              Exchange Skills,
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="block bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent"
              >
                Build Connections
              </motion.span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="text-base sm:text-lg lg:text-xl text-purple-100 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4"
            >
              Connect with like-minded individuals to share your expertise and learn new skills. 
              Join our community where knowledge flows freely and everyone benefits.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link href="/home" className="w-full sm:w-auto bg-white text-purple-700 px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-purple-50 transition-all font-semibold text-base lg:text-lg shadow-lg text-center inline-block">
                  Start Swapping Skills
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link href="/home" className="w-full sm:w-auto border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-white hover:text-purple-700 transition-all font-semibold text-base lg:text-lg text-center inline-block">
                  Browse Skills
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </BackgroundGradientAnimation>

      {/* Features Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        id="features" 
        className="py-20 bg-white relative"
      >
        {/* Sparkles Background */}
        <div className="absolute inset-0 w-full h-full">
          <SparklesCore
            id="tsparticles-features"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={50}
            className="w-full h-full"
            particleColor="#8b5cf6"
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Everything You Need to Swap Skills
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4">
              Our platform provides all the tools you need to connect, exchange, and grow your skillset
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                title: "Smart Matching",
                description: "Our intelligent algorithm connects you with people who have the skills you want and need what you offer."
              },
              {
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Secure Exchanges",
                description: "Built-in rating system and secure messaging ensure safe and trustworthy skill exchanges."
              },
              {
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Flexible Scheduling",
                description: "Set your availability and find others who match your schedule for seamless skill exchanges."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="text-center p-6 sm:p-8 rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all border border-purple-100"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl mx-auto mb-4 sm:mb-6 flex items-center justify-center"
                >
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </motion.div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        id="how-it-works" 
        className="py-20 relative overflow-hidden"
      >
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(147, 51, 234)"
          gradientBackgroundEnd="rgb(79, 70, 229)"
          firstColor="138, 43, 226"
          secondColor="30, 144, 255"
          thirdColor="147, 112, 219"
          fourthColor="75, 0, 130"
          fifthColor="139, 69, 19"
          pointerColor="140, 100, 255"
          interactive={false}
          containerClassName="absolute inset-0"
        />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              How SkillSwap Works
            </h2>
            <p className="text-purple-100 text-base sm:text-lg max-w-2xl mx-auto px-4">
              Get started in just a few simple steps and begin your skill exchange journey today
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { number: "1", title: "Create Profile", description: "Set up your profile with skills you offer and skills you want to learn" },
              { number: "2", title: "Browse & Connect", description: "Search for skills you need and connect with people who can help" },
              { number: "3", title: "Exchange Skills", description: "Schedule sessions and start learning from each other" },
              { number: "4", title: "Rate & Review", description: "Leave feedback to help build a trusted community" }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="text-center"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 300, duration: 0.6 }}
                  className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center"
                >
                  <span className="text-lg sm:text-2xl font-bold text-purple-600">{step.number}</span>
                </motion.div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">{step.title}</h3>
                <p className="text-purple-100 text-sm sm:text-base">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-white relative"
      >
        <div className="absolute inset-0 w-full h-full">
          <SparklesCore
            id="tsparticles-stats"
            background="transparent"
            minSize={0.4}
            maxSize={1.0}
            particleDensity={30}
            className="w-full h-full"
            particleColor="#a855f7"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center">
            {[
              { value: "500+", label: "Active Users" },
              { value: "1,200+", label: "Skills Available" },
              { value: "350+", label: "Successful Swaps" },
              { value: "4.8★", label: "Average Rating" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6, type: "spring", stiffness: 150 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                className="p-4 sm:p-6 rounded-lg bg-white/80 backdrop-blur-sm border border-purple-100"
              >
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.2, duration: 0.8 }}
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600 mb-1 sm:mb-2"
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-600 text-sm sm:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="py-20 relative overflow-hidden"
      >
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(126, 34, 206)"
          gradientBackgroundEnd="rgb(67, 56, 202)"
          firstColor="138, 43, 226"
          secondColor="30, 144, 255"
          thirdColor="147, 112, 219"
          fourthColor="75, 0, 130"
          fifthColor="139, 69, 19"
          pointerColor="140, 100, 255"
          interactive={true}
          containerClassName="absolute inset-0"
        />
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6"
          >
            Ready to Start Your Skill Exchange Journey?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-base sm:text-lg lg:text-xl text-purple-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4"
          >
            Join thousands of learners and teachers in our growing community
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/home" className="inline-block bg-white text-purple-700 px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-purple-50 transition-all font-semibold text-base lg:text-lg shadow-lg">
              Join SkillSwap Today
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="bg-gray-900 text-white py-12"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="sm:col-span-2 lg:col-span-1"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-4">SkillSwap</h3>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                Connecting people through the power of skill exchange and community learning.
              </p>
            </motion.div>
            {[
              {
                title: "Platform",
                links: ["Browse Skills", "How It Works", "Safety"]
              },
              {
                title: "Support",
                links: ["Help Center", "Contact Us", "Community"]
              },
              {
                title: "Legal",
                links: ["Privacy Policy", "Terms of Service", "Cookie Policy"]
              }
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                className="sm:col-span-1"
              >
                <h4 className="font-semibold mb-4 text-sm sm:text-base">{section.title}</h4>
                <ul className="space-y-2 text-gray-400">
                  {section.links.map((link, linkIndex) => (
                    <motion.li 
                      key={linkIndex}
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    >
                      <Link href="#" className="hover:text-white transition-colors text-sm sm:text-base">
                        {link}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
          >
            <p className="text-sm sm:text-base">&copy; 2025 SkillSwap. All rights reserved.</p>
          </motion.div>
        </div>
      </motion.footer>
    </>
  );
}
